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
          import('containers/MapPage/reducer'),
          import('containers/MapPage/sagas'),
          import('containers/MapPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mapPage', reducer.default);
          injectSagas('mapPage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/issues/:issueID',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/MapPage/reducer'),
          import('containers/MapPage/sagas'),
          import('containers/MapPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mapPage', reducer.default);
          injectSagas('mapPage', sagas.default);
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
          injectSagas('registrationPage', sagas.default);
          injectReducer('loginPage', reducer2.default);
          injectSagas('loginPage', sagas2.default);
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
          injectSagas('loginPage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/rewards/new',
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
          injectSagas('createReward', sagas.default);
          injectReducer('loginPage', reducer2.default);
          injectSagas('loginPage', sagas2.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/rewards',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RewardsPage/reducer'),
          import('containers/RewardsPage/sagas'),
          import('containers/RewardsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rewardsPage', reducer.default);
          injectSagas('rewardsPage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/rewards/validate',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/ValidateRewardsPage/reducer'),
          import('containers/ValidateRewardsPage/sagas'),
          import('containers/ValidateRewardsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('validateRewardsPage', reducer.default);
          injectSagas('validateRewardsPage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/rewards/:rewardID',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RewardsPage/reducer'),
          import('containers/RewardsPage/sagas'),
          import('containers/RewardDetailsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rewardsPage', reducer.default);
          injectSagas('rewardsPage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/achievements/new',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CreateAchievement/reducer'),
          import('containers/CreateAchievement/sagas'),
          import('containers/CreateAchievement'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('createAchievement', reducer.default);
          injectSagas('createAchievement', sagas.default);
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
