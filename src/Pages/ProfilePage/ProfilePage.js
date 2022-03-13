import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginPage from "../LoginPage/LoginPage";
import './ProilePage.css'
const ProfilePage = () => {
    const [information, setInformation] = useState({
        id: '',
        name: '',
        createdAt: '',
    });

    useEffect(() => {
        if (window.sessionStorage.getItem("id") !== null) {
            axios({
                method: 'GET',
                url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${window.sessionStorage.getItem("id")}`,
            }).then(response => {
                setInformation({
                    id: response.data.id,
                    name: response.data.name,
                    createdAt: response.data.createdAt
                })
                console.log(response)
            })
        } else {
            axios({
                method: 'GET',
                url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${localStorage.getItem("id")}`,
            }).then(response => {
                setInformation({
                    id: response.data.id,
                    name: response.data.name,
                    createdAt: response.data.createdAt
                })
                console.log(response)
            })
        }
    }, []);
if (window.sessionStorage.getItem("id") === null && localStorage.getItem("id") === null) {
    return <div>
        <h5 className="text">You need to login to continue</h5>
        <LoginPage />
    </div>
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