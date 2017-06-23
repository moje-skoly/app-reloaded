const ADD = 'nase-skoly/comparison/ADD';
const REMOVE = 'nase-skoly/comparison/REMOVE';
const LOAD = 'nase-skoly/comparison/LOAD';
const LOAD_SUCCESS = 'nase-skoly/comparison/LOAD_SUCCESS';
const LOAD_FAIL = 'nase-skoly/comparison/LOAD_FAIL';

const initialState = {
  error: false,
  loaded: false,
  schools: []
};

export default function comparison(state = initialState, action = {}) {
  switch (action.type) {
  case ADD:
    if (state.schools.find(school => school._id === action.school._id) !== undefined) {
      return state; // do not push the same school twice
    }

    return {
      error: false,
      loaded: true,
      schools: [...state.schools, action.school]
    };
  case REMOVE:
    const remaining = state.schools.filter(school => school._id !== action.school._id);
    return {
      error: false,
      loaded: remaining.length > 0,
      schools: remaining
    };
  case LOAD:
    return {
      error: false,
      loading: true,
      loaded: false,
      schools: state.schools
    };
  case LOAD_SUCCESS:
    return {
      error: false,
      loaded: true,
      schools: action.result.schools
    };
  case LOAD_FAIL:
    return {
      error: true,
      loaded: false,
      schools: state.schools
    };
  default:
    return state;
  }
}

export function load(ids = []) {
  return {
    types: [ LOAD, LOAD_SUCCESS, LOAD_FAIL ],
    promise: (client) => client.post('/v1/school', { data: { ids } })
  };
}

export function add(school) {
  return {
    type: ADD,
    school
  };
}

export function remove(school) {
  return {
    type: REMOVE,
    school
  };
}
