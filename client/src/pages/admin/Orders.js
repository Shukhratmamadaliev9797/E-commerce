import React from "react";

export default function Orders() {
  return (
    <div className="adminOrders">
      {" "}
      <div className="adminProducts__title">Orders</div>
      <form className="adminProducts__filter">
        <input type="text" placeholder="Search by name" />
        <select>
          <option selected hidden disabled>
            Status
          </option>
          <option>Delivered</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Cancel</option>
        </select>
        <select>
          <option selected hidden disabled>
            Order limits
          </option>
          <option>Last 5 days orders</option>
          <option>Last 7 days orders</option>
          <option>Last 14 days orders</option>
        </select>
        <button>
          Download all Orders <i class="fa-solid fa-cloud-arrow-down"></i>
        </button>
      </form>
      <table className="adminOrders__table">
        <tr>
          <th>ID</th>
          <th>Time</th>
          <th>Shipping Address</th>
          <th>Phone</th>
          <th>Method</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Action</th>
          <th>Invoice</th>
        </tr>
        <tr>
          <td>6E0F</td>
          <td>Sep 15, 2022</td>
          <td>Dhaka, Bangladesh</td>
          <td>+12342423233</td>
          <td>Credit card</td>
          <td>$120</td>
          <td>
            <span>Delivered</span>
          </td>
          <td>
            <select>
              <option>Delivered</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Cancel</option>
            </select>
          </td>
          <td>
            <i class="fa-solid fa-magnifying-glass-plus"></i>
          </td>
        </tr>
      </table>
    </div>
  );
}
