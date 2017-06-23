const SET = 'nase-skoly/detail/SET';
const LOAD = 'nase-skoly/detail/LOAD';
const LOAD_SUCCESS = 'nase-skoly/detail/LOAD_SUCCESS';
const LOAD_FAIL = 'nase-skoly/detail/LOAD_FAIL';

const initialState = {
  error: false,
  loaded: false,
  school: null
};

export default function detail(state = initialState, action = {}) {
  switch (action.type) {
  case SET:
    return {
      error: false,
      loaded: true,
      school: action.school
    };

  case LOAD:
    return {
      loaded: false,
      loading: true,
      school: null
    };

  case LOAD_SUCCESS:
    return {
      error: false,
      loaded: true,
      school: action.result.school
    };

  case LOAD_FAIL:
    return {
      error: true,
      loaded: false,
      school: null
    };

  default:
    return state;
  }
}

export function set(school) {
  return {
    type: SET,
    school
  };
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/v1/school/${id}`)
  };
}
