import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/";

const getAccountDetails = (id) => {
  return axios.get(API_URL + "accounts/"+id, { headers: authHeader() });
};

const depositAmount = (accNo,amount) => {
  const data = {
    "senderAccNo": accNo,
    "transactionAmount": amount
}
  return axios.post(API_URL + "transaction/deposit", data, { headers: authHeader() });
};

const getTransactionHistory = (id) => {

  return axios.get(API_URL + "transactions/"+ id, { headers: authHeader() });
};

const withdrawAmount = (accNo, amount) => {
  const data = {
    "senderAccNo": accNo,
    "transactionAmount": amount
}
  return axios.get(API_URL + "transaction/withdraw", data, { headers: authHeader() });
};

export default {
  getAccountDetails,
  depositAmount,
  getTransactionHistory,
  withdrawAmount,
};