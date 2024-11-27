import React from 'react';

const UserCard = ({ userData }) => {
  return (
    <div className="w-full mx-auto bg-black bg-opacity-70 border-2 rounded-lg shadow-md text-white">
      <div className="p-4">
        <h3>Name - {userData.name}</h3>
        <p>Email - {userData.email}</p>
        <p>Payment Status - {userData.payment_status ? "paid" : "not paid"}</p>
      </div>
    </div>
  );
};

export default UserCard;
