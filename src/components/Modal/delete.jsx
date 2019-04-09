import React, { Component } from "react";
const Delete = ({ onDelete, item, classes = "" }) => {
  return (
    <React.Fragment>
      <button
        type="button"
        className={`btn btn-danger shadow rounded ${classes}`}
        data-toggle="modal"
        data-target={"#a" + item._id}
      >
        <i className="fa fa-trash-alt" />
      </button>

      <div
        className="modal fade"
        id={"a" + item._id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title" id="exampleModalLongTitle">
                تایید برای حذف دائمی
              </span>
            </div>
            <div className="modal-body h6">
              آیا از حذف {`"${item.name}"`} اطمینان دارید؟
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger m-2"
                onClick={() => onDelete(item)}
                data-dismiss="modal"
              >
                <i className="fa fa-check" />
              </button>
              <button
                type="button"
                className="btn btn-secondary m-2"
                data-dismiss="modal"
              >
                <i className="fa fa-times" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Delete;
