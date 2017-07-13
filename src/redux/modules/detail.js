import { Observable } from 'rxjs';

const SET = 'moje-skoly/detail/SET';
const LOAD = 'moje-skoly/detail/LOAD';
const LOAD_SUCCESS = 'moje-skoly/detail/LOAD_SUCCESS';
const LOAD_FAILED = 'moje-skoly/detail/LOAD_FAIL';

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
        school: action.payload.school
      };

    case LOAD_FAILED:
      return {
        error: true,
        loaded: false,
        school: null
      };

    default:
      return state;
  }
}

const detailEpic = (action$, store, { apiClient }) =>
  action$
    .ofType(LOAD)
    .mergeMap(action =>
      apiClient
        .getSchool(action.payload.id)
        .map(response => loadCompleted(response))
        .catch(error => Observable.of(loadFailed(error)))
    );

const loadSchool = id => {
  return {
    type: LOAD,
    payload: {
      id
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

export { loadSchool, detailEpic };
