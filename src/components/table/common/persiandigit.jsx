import React, { Component } from "react";

let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
let persianMap = persianDigits.split("");

export function PersianNum(input) {
  if (typeof input == "undefined") {
    input = "";
  }
  return input.replace(/\d/g, function(m) {
    return persianMap[parseInt(m)];
  });
}

export const PersianDigit = props => {
  return PersianNum(props.children);
};

export default PersianDigit;
