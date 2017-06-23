const LOAD = 'nase-skoly/filter/LOAD';
const LOAD_SUCCESS = 'nase-skoly/filter/LOAD_SUCCESS';
const LOAD_FAIL = 'nase-skoly/filter/LOAD_FAIL';

const initialState = {
  loaded: false,
  schools: []
};

export default function filter(state = initialState, action = {}) {
  switch (action.type) {
  case LOAD:
    return {
      ...state,
      loading: true
    };
  case LOAD_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      radius: action.result.radius,
      center: action.result.location,
      schools: action.result.schools,
      addresses: action.result.addresses
    };
  case LOAD_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      error: true
    };
  default:
    return state;
  }
}

export function isLoaded(globalState) {
  return globalState.filter && globalState.filter.loaded;
}

export function load(address, schoolType) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/v1/search/${encodeURIComponent(address)}/${encodeURIComponent(schoolType)}`)
  };
}
