import React from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from 'react-toastify';

const Logout = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const logout = () => {
        axiosPrivate.get('/auth/logout').then(response => {
            console.log(response.data);
            navigate('/login');
        }).catch(error => {
            toast("Error occurred while Logging out");
        });
    };

    return(
        <button type="button" className="btn btn-outline-primary" onClick={() => logout()}>Logout</button>
    );
};

export default Logout;