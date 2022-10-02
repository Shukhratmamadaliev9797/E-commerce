import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import CreateProducts from "../../modal/admin/CreateProducts";

export default function Products() {
  const [create, setCreate] = useState(false);
  return (
    <div className="adminProducts">
      <CreateProducts open={create} close={() => setCreate(false)} />

      <div className="adminProducts__title">Products</div>
      <div className="adminProducts__filter">
        <input type="text" placeholder="Search by product name" />
        <select>
          <option selected hidden disabled>
            Category
          </option>
          <option>Watch</option>
          <option>Phone</option>
        </select>
        <select>
          <option selected hidden disabled>
            Price
          </option>
          <option>Low to high</option>
          <option>High to low</option>
        </select>
        <button onClick={() => setCreate(true)}>+ Add Product</button>
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
        <tr>
          <td>810381</td>
          <td>
            <img src="" alt="product" />
            <span>Green Leaf Lettuce</span>
          </td>
          <td>Fruits Vegetable</td>
          <td>$14</td>
          <td>66</td>
          <td>
            {" "}
            <span>Selling</span>
          </td>
          <td></td>
          <td>
            <i class="fa-solid fa-magnifying-glass-plus"></i>
          </td>
          <td>
            <Switch defaultChecked />
          </td>
          <td>
            <span>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span>
              <i className="fa-regular fa-trash-can"></i>
            </span>
          </td>
        </tr>
        <tr>
          <td>810381</td>
          <td>
            <img src="" alt="product" />
            <span>Green Leaf Lettuce</span>
          </td>
          <td>Fruits Vegetable</td>
          <td>$14</td>
          <td>66</td>
          <td>
            <span>Selling</span>
          </td>
          <td></td>
          <td>
            <i class="fa-solid fa-magnifying-glass-plus"></i>
          </td>
          <td>
            <Switch defaultChecked />
          </td>
          <td>
            <span>
              <i className="fa-solid fa-pen-to-square"></i>
            </span>
            <span>
              <i className="fa-regular fa-trash-can"></i>
            </span>
          </td>
        </tr>
      </table>
    </div>
  );
}
