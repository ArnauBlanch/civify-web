import conformsTo from 'lodash/conformsTo';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import invariant from 'invariant';
import warning from 'warning';
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
    // Check if the path isn't rewards. That way we can apply specific logic to
    // display/render the path we want to
    if (loggedIn) {
      if (nextState.location.pathname === '/login' ||
          nextState.location.pathname === '/register') {
        replace('/');
        console.log('Logged in + login/register');
      } else {
        console.log('Logged in + / or requires auth');
        // replace(nextState.location.pathname);
      }
    } else if (nextState.location.pathname !== '/' &&
          nextState.location.pathname !== '/login' &&
          nextState.location.pathname !== '/register') {
      console.log('Not logged in + requires auth');
      replace('/login');
    } else { console.log('Not logged in + doesn\'t require auth'); }
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
  return function injectSagas(sagas) {
    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(sagas),
      '(app/utils...) injectAsyncSagas: Expected `sagas` to be an array of generator functions'
    );

    warning(
      !isEmpty(sagas),
      '(app/utils...) injectAsyncSagas: Received an empty `sagas` array'
    );

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
