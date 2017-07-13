import { Observable } from 'rxjs';

const SEARCH = 'moje-skoly/filter/SEARCH';
const SEARCH_SUCCESS = 'moje-skoly/filter/SEARCH_SUCCESS';
const SEARCH_FAILED = 'moje-skoly/filter/SEARCH_FAILED';

const initialState = {
  loaded: false,
  schools: []
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        loading: true
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        radius: action.payload.radius,
        center: action.payload.location,
        schools: action.payload.schools,
        addresses: action.payload.addresses
      };

    case SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true
      };

    default:
      return state;
  }
};

const filterEpic = (action$, store, { apiClient }) =>
  action$
    .ofType(SEARCH)
    .mergeMap(action =>
      apiClient
        .search(action.payload.address, action.payload.schoolType)
        .map(response => searchCompleted(response))
        .catch(error => Observable.of(searchFailed(error)))
    );

const search = (address, schoolType) => {
  return {
    type: SEARCH,
    payload: {
      address,
      schoolType
    }
  };
};

const searchCompleted = payload => {
  return {
    type: SEARCH_SUCCESS,
    payload
  };
};

const searchFailed = err => {
  return {
    type: SEARCH_FAILED,
    payload: err,
    error: true
  };
};

export { filterEpic, search, searchCompleted, searchFailed };
