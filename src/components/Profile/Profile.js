import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";
import userService from "../../services/user.service";
import Accounts from "../Accounts/Accounts";
import AccountTransfer from "../AccountTransfer/AccountTransfer";
import TransactionHistory from "../Transactions/TransactionHistory";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const [account, setAccount] = useState();
  const [isLoading, setLoading] = useState(true);

  // const pull_data = (data) => {
  //   // console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)

   
  // }

  useEffect(() => {
    userService.getAccountDetails(currentUser.id).then(
      (response) => {
        setAccount(response.data);
        setLoading(false);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setAccount(_content);
      }
    );
  }, [])


  if(isLoading) {
    return <div>Loading...</div>;
  }
  return (

    <div>
        <div>
            <h1>Hello {currentUser.username}</h1>
            <p>Welcome to your admin dashboard</p>
            {/* <p>{accountDetails}</p> */}
        </div>

        <Accounts {...account} />
       <TransactionHistory/>
    </div>

  );
};

export default Profile;