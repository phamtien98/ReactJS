import React from "react";
import LoginPage from "../LoginPage/LoginPage";
import './ProilePage.css'
import SendAPIRequest from "../../CustomHook/SendAPIRequest"

const responseData = response => ({
    id: response.data.id,
    name: response.data.name,
    createdAt: response.data.createdAt
})
const initialState = {
    id: null,
    name: null,
    createdAt: null,
}

const ProfilePage = () => {
    let id = null
    if (window.sessionStorage.getItem("id")) {

        id = window.sessionStorage.getItem("id")
    }
    else {

        id = localStorage.getItem("id")
    }
const { data: information, isLoading, error } = SendAPIRequest(initialState, `https://60dff0ba6b689e001788c858.mockapi.io/users/${id}`, responseData)
if (window.sessionStorage.getItem("id") === null && localStorage.getItem("id") === null) {
    return (<div>
        <h5 className="text">You need to login to continue</h5>
        <LoginPage />
    </div>)
}
return (
    <div>
        <p>ProfilePage</p>
        <p>ID: {information.id}</p>
        <p>Name: {information.name}</p>
        <p>Create At: {information.createdAt}</p>
    </div>
);
}
export default ProfilePage;