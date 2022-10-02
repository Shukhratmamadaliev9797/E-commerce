import React from "react";

export default function Costumers() {
  return (
    <div className="adminCostumers">
      <div className="adminProducts__title">Products</div>
      <form className="adminCostumers__filter">
        <input placeholder="Search by name/email/phone" type="text" />
      </form>
      <table className="adminCostumers__table">
        <tr>
          <th>ID</th>
          <th>Joining date</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>6E0F</td>
          <td>Sep 15, 2022</td>
          <td>Ayyub Nematov</td>
          <td>kumarsujon03@gmail.com</td>
          <td>+12342423233</td>
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
