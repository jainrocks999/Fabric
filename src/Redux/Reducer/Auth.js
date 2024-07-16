initialstate = {
  Login1: '',
  isFetching: false,
  partyList: [],
  bagdata: {},
  Rndata: [],
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
    case 'bag_check_request': {
      return {...state, isFetching: true};
    }
    case 'bag_check_success': {
      return {...state, isFetching: false, bagdata: action.payload};
    }
    case 'bag_check_error':
      return {...state, isFetching: false};
    case 'fetch_copanies_rquest':
      return {...state, isFetching: true};
    case 'fetch_copanies_success':
      return {...state, isFetching: false, Rndata: action.payload};
    case 'fetch_copanies_error':
      return {...state, isFetching: false};
    case 'setFetching':
      return {...state, isFetching: action.payload};
    default:
      return state;
  }
};
