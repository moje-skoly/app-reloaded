import { Observable } from 'rxjs';

const ADD = 'moje-skoly/comparison/ADD';
const REMOVE = 'moje-skoly/comparison/REMOVE';
const LOAD_COMPARISON = 'moje-skoly/comparison/LOAD';
const LOAD_SUCCESS = 'moje-skoly/comparison/LOAD_SUCCESS';
const LOAD_FAILED = 'moje-skoly/comparison/LOAD_FAIL';

const initialState = {
  error: false,
  loaded: false,
  schools: []
};

export default function comparison(state = initialState, action = {}) {
  switch (action.type) {
    case ADD:
      if (
        state.schools.find(school => school._id === action.school._id) !==
        undefined
      ) {
        return state; // do not push the same school twice
      }

      return {
        error: false,
        loaded: true,
        schools: [...state.schools, action.school]
      };

    case REMOVE:
      const remaining = state.schools.filter(
        school => school._id !== action.school._id
      );
      return {
        error: false,
        loaded: remaining.length > 0,
        schools: remaining
      };

    case LOAD_COMPARISON:
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
        schools: action.payload.schools
      };

    case LOAD_FAILED:
      return {
        error: true,
        loaded: false,
        schools: state.schools
      };

    default:
      return state;
  }
}

const comparisonEpic = (action$, store, { apiClient }) =>
  action$
    .ofType(LOAD_COMPARISON)
    .mergeMap(action =>
      apiClient
        .getSchools(action.payload.ids)
        .map(response => loadCompleted(response.response))
        .catch(error => Observable.of(loadFailed(error)))
    );

const loadComparison = ids => {
  return {
    type: LOAD_COMPARISON,
    payload: {
      ids
    }
  };
};

const loadCompleted = payload => {
  return {
    type: LOAD_SUCCESS,
    payload
  };
};

const loadFailed = err => {
  return {
    type: LOAD_FAILED,
    payload: err,
    error: true
  };
};

const add = school => {
  return {
    type: ADD,
    school
  };
};

const remove = school => {
  return {
    type: REMOVE,
    school
  };
};

export { comparisonEpic, loadComparison, add, remove };
