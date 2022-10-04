import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import CreateProducts from "../../modal/admin/CreateProducts";
import { useDispatch, useSelector } from "react-redux";
import SnackBar from "../../components/general/SnackBar";
import AdminLoading from "../../components/admin/AdminLoading";
import {
  deleteProduct,
  listProducts,
  publishProduct,
} from "../../actions/productActions";
import Confirmation from "../../modal/admin/Confirmation";
import ProductDetails from "../../modal/admin/ProductDetails";
import EditProduct from "../../modal/admin/EditProduct";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#000",
    },
  },
}));

export default function Products() {
  //----------------useState----------------//
  const [createModal, setCreateModal] = useState(false);
  const [product, setProduct] = useState();
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const [productEditModal, setProductEditModal] = useState(false);
  const [productDeleteModal, setProductDeleteModal] = useState(false);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    message: messageCreate,
  } = productCreate;

  const productEdit = useSelector((state) => state.productEdit);
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
    message: messageEdit,
  } = productEdit;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
    message: messageDelete,
  } = productDelete;

  const productPublish = useSelector((state) => state.productPublish);
  const {
    loading: loadingPublish,
    error: errorPublish,
    success: successPublish,
    message: messagePublish,
  } = productPublish;

  const productList = useSelector((state) => state.productList);
  const { loading: loadingList, error: errorList, products } = productList;

  useEffect(() => {
    if (successCreate) {
      setCreateModal(false);
    }
    if (successEdit) {
      setProductEditModal(false);
    }
    if (successDelete) {
      setProductDeleteModal(false);
    }
    dispatch(listProducts({ category: category ? category : "" }));
  }, [
    successCreate,
    dispatch,
    successPublish,
    successEdit,
    successDelete,
    category,
  ]);

  const publishHandler = (productId) => {
    dispatch(publishProduct(productId));
  };

  const deleteHandler = () => {
    dispatch(deleteProduct(product._id));
  };
  const classes = useStyles();
  return (
    <div className="adminProducts">
      {/* modal and notification */}
      <SnackBar
        message={
          messageEdit || messagePublish || messageCreate || messageDelete
        }
        vertical="top"
        horizontal="center"
        width="50rem"
        autoHideDuration="6000"
        className="dashLogin__alert"
        severity="success"
      />
      <SnackBar
        message={errorEdit || errorCreate || errorPublish || errorDelete}
        vertical="top"
        horizontal="center"
        width="50rem"
        autoHideDuration="6000"
        className="dashLogin__alert"
        severity="error"
      />
      <Confirmation
        open={productDeleteModal}
        close={() => setProductDeleteModal(false)}
        action={deleteHandler}
        item={product}
      />
      <CreateProducts open={createModal} close={() => setCreateModal(false)} />
      <ProductDetails
        open={productDetailsModal}
        close={() => setProductDetailsModal(false)}
        product={product}
      />
      <EditProduct
        open={productEditModal}
        close={() => setProductEditModal(false)}
        product={product}
      />
      {/* Loading */}
      <div>{loadingCreate && <AdminLoading />}</div>
      <div>{loadingPublish && <AdminLoading />}</div>
      <div>{loadingEdit && <AdminLoading />}</div>
      <div>{loadingDelete && <AdminLoading />}</div>
      <div className="adminProducts__title">Products</div>
      <div className="adminProducts__filter">
        <input type="text" placeholder="Search by product name" />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option selected hidden disabled>
            Category
          </option>
          <option value="">All</option>
          <option value="watch">Watch</option>
          <option value="phone">Phone</option>
        </select>
        <select>
          <option selected hidden disabled>
            Price
          </option>
          <option>Low to high</option>
          <option>High to low</option>
        </select>
        <button onClick={() => setCreateModal(true)}>+ Add Product</button>
      </div>
      <table className="adminProducts__table">
        <tr className="adminProducts__table-row">
          <th>ID</th>
          <th>Product Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Status</th>
          <th>Discount</th>
          <th>Details</th>
          <th>Published</th>
          <th>Actions</th>
        </tr>
        {loadingList ? (
          <AdminLoading />
        ) : errorList ? (
          errorList
        ) : (
          products?.map((product) => {
            return (
              <tr>
                <td>#{product._id.slice(product._id.length - 4)}</td>
                <td>
                  <span>{product.name}</span>
                </td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  {product.status === "Selling" ? (
                    <span className="selling">{product.status}</span>
                  ) : product.status === "Out of Stock" ? (
                    <span className="outofstock">Out of Stock</span>
                  ) : product.status === "Hot Selling" ? (
                    <span className="hotselling">Hot Selling</span>
                  ) : (
                    ""
                  )}
                </td>
                <td>{product.sale}</td>
                <td>
                  <i
                    onClick={() => {
                      setProductDetailsModal(true);
                      setProduct(product);
                    }}
                    class="fa-solid fa-magnifying-glass-plus"
                  ></i>
                </td>
                <td>
                  <Switch
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={() => {
                      publishHandler(product._id);
                    }}
                    checked={product.publish}
                  />
                </td>
                <td>
                  <span>
                    <i
                      onClick={() => {
                        setProduct(product);
                        setProductEditModal(true);
                      }}
                      className="fa-solid fa-pen-to-square"
                    ></i>
                  </span>
                  <span>
                    <i
                      onClick={() => {
                        setProduct(product);
                        setProductDeleteModal(true);
                      }}
                      className="fa-regular fa-trash-can"
                    ></i>
                  </span>
                </td>
              </tr>
            );
          })
        )}
      </table>
      <Stack spacing={2} className="adminProducts__pagination">
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          color="primary"
          classes={{ ul: classes.ul }}
        />
      </Stack>
    </div>
  );
}
