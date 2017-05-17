// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas, checkAuth } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/register',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RegistrationPage/reducer'),
          import('containers/RegistrationPage/sagas'),
          import('containers/RegistrationPage'),
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component, reducer2, sagas2]) => {
          injectReducer('registrationPage', reducer.default);
          injectSagas(sagas.default);
          injectReducer('loginPage', reducer2.default);
          injectSagas(sagas2.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/login',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage/sagas'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('loginPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/rewards/create',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CreateReward/reducer'),
          import('containers/CreateReward/sagas'),
          import('containers/CreateReward'),
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component, reducer2, sagas2]) => {
          injectReducer('createReward', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
          injectReducer('loginPage', reducer2.default);
          injectSagas(sagas2.default);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/rewards',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RewardsPage/reducer'),
          import('containers/RewardsPage/sagas'),
          import('containers/RewardsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rewardsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
