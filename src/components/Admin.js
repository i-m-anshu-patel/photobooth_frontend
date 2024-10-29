import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const userData = useSelector((store) => store.user.user);
    const navigate = useNavigate();
   
    useEffect(() => {
        if(!userData) {
            return navigate('/');
        }
    })

    return userData && (
        <div>
            <p className='text-center text-3xl text-white pt-2 pb-5'>User Settings</p>
            <div className="w-1/2 bg-white ms-auto me-auto p-3 grid grid-cols-2">
                <div className='border-r-2'>Name</div>
                <div className='px-2'>{userData.name}</div>
                <div className='border-r-2'>Email</div>
                <div className='px-2'>{userData.email}</div>
                <div className='border-r-2'>Payment Status</div>
                <div className='px-2'>{userData.payment_status ? 'paid' : 'not paid' }</div>
                <div className='col-span-2 flex justify-center py-3 mx-2'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'>Change Payment Status</button>
                    <button className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Change PDF Text</button>
                </div>
            </div>
        </div>

    );
};

export default Admin;
