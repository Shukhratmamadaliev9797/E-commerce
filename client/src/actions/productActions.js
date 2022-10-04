import axios from "axios";
import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_PUBLISH_FAIL,
  PRODUCT_PUBLISH_REQUEST,
  PRODUCT_PUBLISH_SUCCESS,
} from "../constants/productConstants";

export const createProduct = (product) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST, payload: product });
    const {
      userSignIn: { userInfo },
    } = getState();
    try {
      const { data } = await axios.post(
        `/api/products/createProduct`,
        product,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      setTimeout(() => {
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.message });
      }, 3000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_CREATE_FAIL, payload: message });
    }
  };
};

export const editProduct = (product) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_EDIT_REQUEST, payload: product });
    try {
      const { data } = await axios.put(`/api/products/editProduct`, product);
      dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data.message });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_EDIT_FAIL, payload: message });
    }
  };
};

export const listProducts = ({ category = "", pageNumber = "" }) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
      const { data } = await axios.get(
        `/api/products?pageNumber=${pageNumber}&category=${category}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_LIST_FAIL, payload: message });
    }
  };
};

export const publishProduct = (productId) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_PUBLISH_REQUEST });
    try {
      const { data } = await axios.put(`/api/products/publishUpdate`, {
        productId,
      });

      setTimeout(() => {
        dispatch({ type: PRODUCT_PUBLISH_SUCCESS, payload: data.message });
      }, 2000);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_PUBLISH_FAIL, payload: message });
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    try {
      const { data } = await axios.delete(`/api/products/${productId}`);
      console.log(data);
      dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data.message });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
  };
};
