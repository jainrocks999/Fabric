initialstate = {
  Login1: '',
  isFetching: false,
  partyList: [],
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case 'User_Login_Request':
      return {...state, isFetching: true};
    case 'User_Login_Success':
      return {...state, isFetching: false, Login1: action.payload};
    case 'User_Login_Error':
      return {...state, isFetching: false};
    case 'Party_Name_Request': {
      return {...state, isFetching: true};
    }
    case 'Party_Name_Success': {
      return {...state, partyList: action.payload, isFetching: false};
    }
    case 'Party_Name_Error': {
      return {...state, isFetching: false};
    }
    default:
      return state;
  }
};
