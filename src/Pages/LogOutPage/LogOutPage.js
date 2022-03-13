import React from "react";
import LoginPage from "../LoginPage/LoginPage";
const LogOutPage = () =>{
    localStorage.clear();
    window.sessionStorage.clear();
    return<div>{window.location.reload()}
    </div>
}

export default LogOutPage;