import React from "react";

export default function Sellers() {
  return (
    <div>
      {" "}
      <div className="adminProducts__title">Sellers</div>
      <form className="adminSellers__filter">
        <input type="text" placeholder="Search by name" />
        <button>+ Add Seller</button>
      </form>
      <table className="adminSellers__table">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Contact</th>
          <th>Joining date</th>
          <th>Action</th>
        </tr>
        <tr>
          <td>6E0F</td>
          <td>Ayyub Nematov</td>
          <td>kumarsujon03@gmail.com</td>
          <td>+12342423233</td>
          <td>Sep 15, 2022</td>
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
