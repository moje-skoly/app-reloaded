import { createStore } from 'redux';
import filter from './modules/filter';

const initialState = {};

export default createStore(filter, initialState);
