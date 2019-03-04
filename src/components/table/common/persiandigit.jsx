import React, { Component } from "react";

const PersianDigit = props => {
  let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
  let persianMap = persianDigits.split("");

  function convertToPersianNumber(input) {
    if (typeof input == "undefined") {
      input = "";
    }
    return input.replace(/\d/g, function(m) {
      return persianMap[parseInt(m)];
    });
  }
  return convertToPersianNumber(props.children);
};

export default PersianDigit;
