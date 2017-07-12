import { push } from 'react-router-redux';

const prefix = (address, schoolType) =>
  `/filter/${encodeURIComponent(address)}/${encodeURIComponent(schoolType)}`;
export const select = dispatch => (school, address, schoolType) =>
  dispatch(push(`${prefix(address, schoolType)}/preview/${school._id}`));
export const unselect = dispatch => (school, address, schoolType) =>
  dispatch(push(`${prefix(address, schoolType)}`));
