import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {
  createProductReducer,
  deleteProductReducer,
  editProductReducer,
  listProductReducer,
  publishProductReducer,
} from "./reducers/productReducers";
import { userSignInReducers } from "./reducers/userReducers";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducers = combineReducers({
  userSignIn: userSignInReducers,
  productCreate: createProductReducer,
  productList: listProductReducer,
  productPublish: publishProductReducer,
  productEdit: editProductReducer,
  productDelete: deleteProductReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
