import axios from "axios";

export async function getProducts() {
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzhjYjU1NDVlZmVjMzBlODAzOTJkMjgiLCJpYXQiOjE1NTI3MjUzMzN9.ttARlXlI4PJHlDy35heMhu_XmmAFTX4TFfFkpn274eQ";
  await axios
    .get("http://localhost:3900/api/products", {
      headers: {
        "x-auth-token": authToken //the token is a variable which holds the token
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
}
