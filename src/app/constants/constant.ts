export enum SearchModes {
  SEARCH = 'search',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export const PRODUCT_MANAGEMENT = {
  API_URL: 'http://localhost:8080/api/prices',
  SEARCH_BY_SKU: 'sku?productSKU=',
  ADD_ROUTE: '/add',
  EDIT_ROUTE: 'edit/',
  DETAILS_ROUTE: '/product/',
  IMPORT_ROUTE: '/import',
  LIST_ROUTE: 'products',
  KEY_ID: 'id',
  KEY_NEW: 'new',
  KEY_EDIT: 'edit',
  ADD_PRODUCT_TITLE: 'Add new product',
  EDIT_PRODUCT_TITLE: 'Edit product',
  MESSAGES: {
    ACTIVATE_SUCCESS: 'The product status was updated successfully!',
    UPDATE_SUCCESS: 'This product details was updated successfully!',
  },
  USER_DETAILS: {
    USER_NAME: 'Admin',
    USER_ID: 'ADM',
  },
};
