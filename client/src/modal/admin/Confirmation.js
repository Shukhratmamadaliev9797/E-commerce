import React from "react";

export default function Confirmation({ open, close, item, action }) {
  return (
    <div
      className={`confirmation ${
        open ? "confirmation__active" : "confirmation__inactive"
      }`}
    >
      <div
        className={`confirmation__modal ${
          open ? "confirmation__modal-active" : "confirmation__modal-inactive"
        }`}
      >
        <div className="confirmation__modal-header">Delete {item?.name} </div>
        <div className="confirmation__modal-body">
          Are you sure you want to delete it ?
        </div>
        <div className="confirmation__modal-action">
          <button onClick={close}>Cancel</button>
          <button onClick={action}>Delete</button>
        </div>
      </div>
    </div>
  );
}
