import React, { Component } from "react";
import { PersianNum } from "../table/common/persiandigit";

export class Product extends Component {
  handleBack = () => {
    this.props.onRoute("/Products");
    this.props.history.push("/Products");
  };
  render() {
    const { detailedModal, listName } = this.props.state;
    const head = [
      "آی دی",
      "تصویر",
      "گالری",
      "دسته بندی",
      "کد محصول",
      "کد تنوع",
      "عنوان",
      "برند",
      "قیمت خرید",
      "قیمت مرجع",
      "قیمت سر به سر",
      "قیمت عمده فروشی",
      "قیمت خرده فروشی",
      "قیمت مارکت پلیس",
      "موجودی انبار خرده فروشی",
      "موجودی انبار عمده فروشی",
      "موجودی انبار مجازی دیجیکالا",
      "تعداد در جعبه"
    ];
    return (
      <React.Fragment>
        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
          <h5 className="text-center m-3 be-bold">جزئیات محصول</h5>
          <div className="row m-2">
            <button className="btn btn-primary m-2" onClick={this.handleBack}>
              بازگشت
            </button>
            <button
              className="btn btn-dark m-2"
              onClick={() =>
                this.props.onEditTableItem(detailedModal.item, listName)
              }
            >
              ویرایش
            </button>
            <button
              className="btn btn-danger m-2"
              onClick={() => {
                this.props.onDeleteTableItem(detailedModal.item, listName);
                this.props.history.push("/Products");
              }}
            >
              حذف
            </button>
          </div>
          <div className="row">
            <div className="m-2 col-5">
              <img
                style={{ maxHeight: "500px", maxWidth: "500px" }}
                src={require(`../../${detailedModal.item.img}`)}
              />
              {detailedModal.item.imgs.map(img => (
                <img
                  style={{ maxHeight: "100px", maxWidth: "100px" }}
                  src={require(`../../${img}`)}
                />
              ))}
            </div>
            <div className="list-group m-2 mt-5 col-5">
              <div className="row">
                {Object.keys(detailedModal.item).map((keyName, i) => {
                  if (
                    keyName != "id" &&
                    keyName != "img" &&
                    keyName != "imgs"
                  ) {
                    if (
                      keyName.includes("Price") ||
                      keyName.includes("Stock") ||
                      keyName.includes("Quantity")
                    ) {
                      return (
                        <span className="list-group-item col-6">
                          {head[i] + " : "}
                          <span style={{ fontWeight: "600" }}>
                            {PersianNum(
                              detailedModal.item[keyName].toLocaleString()
                            )}
                          </span>
                        </span>
                      );
                    } else {
                      return (
                        <span className="list-group-item col-12">
                          {head[i] + " : "}
                          <span style={{ fontWeight: "600" }}>
                            {PersianNum(detailedModal.item[keyName])}
                          </span>
                        </span>
                      );
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;
