export default (reducers = (
  state = {
    loggedIn: false
  },
  action
) => {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, user: action.user, loggedIn: action.loggedIn };
    }
    case "LOGOUT": {
      return { ...state, loggedIn: action.loggedIn };
    }
  }
  return state;
});
