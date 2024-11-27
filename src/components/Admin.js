import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { updatePaymentStatus } from "../utils/redux/userSlice";
import UserCard from "./UserCard";

const Admin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const userData = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchAllUsers = () => {
    const myHeaders = new Headers();

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const url = BACKEND_URL + "/getAllUsers";
    fetch(url, requestOptions)
      .then((response) => {
        return Promise.all([response.status, response.json()]);
      })
      .then(([status, result]) => {
        if (status === 200) {
          console.log(result.users);
          setAllUsers(result.users);
        } else {
          alert(result.message);
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  useEffect(() => {
    if (!userData) {
      return navigate("/");
    }
  }, [userData, navigate]);

  const handleChangePayment = (user_id, payment_status) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      payment_status: !payment_status,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const url = BACKEND_URL + "/updatePaymentStatus/" + user_id;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        dispatch(updatePaymentStatus(!payment_status));
        if (!payment_status) {
          return navigate("/camera");
        }
      })
      .catch((error) => console.error(error));
  };

  return allUsers ? (
    <div className="min-h-screen">
      <p className="text-center py-2 text-white text-2xl">Users</p>
      <div className="grid sm:grid_cols-1 md:grid-cols-4 md:gap-3">
        {allUsers.map((user) => (
          <UserCard userData={user} key={user.id}/>
        ))}
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center">
      Loading...
    </div>
  );
};

export default Admin;
