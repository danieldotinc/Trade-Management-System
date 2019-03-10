import React, { Component } from "react";

let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
let englishDigits = "0123456789";
let persianMap = persianDigits.split("");

export function PersianNum(num) {
  let word = "";
  if (typeof num == "undefined") {
    num = "";
  }
  let input = num.toString();
  for (let i = 0; i < input.length; i++) {
    if (englishDigits.includes(input[i])) {
      word += persianMap[parseInt(input[i])];
    } else {
      word += input[i];
    }
  }
  return word;
}

export const PersianDigit = props => {
  return PersianNum(props.children);
};

export default PersianDigit;
