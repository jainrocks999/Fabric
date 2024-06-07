initialstate = {
  Login1: '',
 
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case 'User_Login_Request':
      return { ...state, isFetching: true };
    case 'User_Login_Success':
      return { ...state, isFetching: false, Login1: action.payload };
    case 'User_Login_Error':
      return { ...state, isFetching: false };

    default:
      return state;
  }
};
