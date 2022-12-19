export enum RedirectModes {
  CANCEL = 'cancel',
  RELOAD = 'reload',
  UPDATE = 'update',
  ADD = 'add',
  DETALIS = 'details',
  IMPORT = 'import',
}

export const PROCUCT_MANAGEMENT = {
  API_URL: 'http://localhost:8080/api/prices',
  SEARCH_BY_SKU: 'sku?productSKU=',
  MESSAGES: {
    ACTIVATE_SUCCESS: 'The product status was updated successfully!',
    UPDATE_SUCCESS: 'This product details was updated successfully!',
  },
  USER_DETAILS: {
    USER_NAME: 'Admin',
    USER_ID: 'ADM',
  },
};
