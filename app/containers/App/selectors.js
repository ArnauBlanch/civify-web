// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};
const makeSelectIsAuthenticated = () => (state) => state.get('auth').get('isAuthenticated');
const makeSelectLanguage = () => (state) => state.get('language').get('locale');

export {
  makeSelectLocationState,
  makeSelectIsAuthenticated,
  makeSelectLanguage,
};
