import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/v1/";

const getAccountDetails = (id) => {
  return axios.get(API_URL + "accounts/"+id, { headers: authHeader() });
};

const depositAmount = (amount) => {
  const data = {
    "senderAccNo": 1000,
    "transactionAmount": 355
}
  return axios.post(API_URL + "transaction/deposit", data, { headers: authHeader() });
};

const getTransactionHistory = (id) => {

  return axios.get(API_URL + "transactions/"+ id, { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getAccountDetails,
  depositAmount,
  getTransactionHistory,
  getAdminBoard,
};