import api from 'api/api';

import {
  ADD_PRODUCT_ENDPOINTS,
  REMOVE_IMG,
  REMOVE_DOCUMENT,
} from '../constants/update-product.endpoints';

const addProduct = (data) => {
  return api.post(ADD_PRODUCT_ENDPOINTS.POST_ADD_PRODUCT, data);
};

const getProductTypes = () => {
  return api.get(ADD_PRODUCT_ENDPOINTS.GET_PRODUCT_TYPES);
};

const getInfo = (product_token) => {
  return api.post('/products/getinfo', product_token);
};
const removeImage = (data) => {
  return api.post(REMOVE_IMG.REMOVE, data);
};
const removeDocument = (data) => {
  return api.post(REMOVE_DOCUMENT.REMOVE, data);
};
export const addProductApi = {
  addProduct,
  getInfo,
  getProductTypes,
  removeImage,
  removeDocument,
};
