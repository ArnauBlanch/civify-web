import conformsTo from 'lodash/conformsTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import invariant from 'invariant';
import createReducer from 'reducers';

/**
 * Validate the shape of redux store
 */
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    replaceReducer: isFunction,
    runSaga: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
}

export function checkAuth(store) {
  return (nextState, replace) => {
    const loggedIn = store.getState().get('auth').get('isAuthenticated');
    const isAdmin = store.getState().get('auth').get('isAdmin');
    const { pathname } = nextState.location;
    // Check if the path isn't rewards. That way we can apply specific logic to
    // display/render the path we want to
    if (loggedIn) {
      if (pathname === '/login' || pathname === '/register' ||
          (pathname.startsWith('/rewards') && isAdmin) ||
          (pathname === '/admin' && !isAdmin) ||
          (!pathname.startsWith('/rewards') && pathname.endsWith('/edit') && !isAdmin) ||
          (pathname.startsWith('/achievements') && !isAdmin) ||
          (pathname.startsWith('/events') && !isAdmin)) {
        replace('/');
      }
    } else if (pathname !== '/' && pathname !== '/login' &&
          pathname !== '/register' && !pathname.startsWith('/issues/')) {
      replace('/login');
    }
  };
}

/**
 * Inject an asynchronously loaded reducer
 */
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

/**
 * Inject an asynchronously loaded saga
 */
export function injectAsyncSagas(store, isValid) {
  const asyncSagas = {};

  return function injectSagas(name, sagas) {
    if (!isValid) checkStore(store);

    invariant(
        Array.isArray(sagas),
        '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
     );

    if (sagas.length <= 0) return;

    if (!asyncSagas[name]) {
      asyncSagas[name] = [];
    }

    sagas.filter((saga) => {
      if (asyncSagas[name].includes(saga.name)) {
        return false;
      }

      asyncSagas[name].push(saga.name);

      return true;
    }).map(store.runSaga);
  };
}

/**
 * Helper for creating injectors
 */
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectSagas: injectAsyncSagas(store, true),
    checkAuth: checkAuth(store),
  };
}
