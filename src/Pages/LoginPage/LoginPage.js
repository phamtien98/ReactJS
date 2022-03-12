import React, { useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './LoginPage.css';
const LoginPage = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    });
    const database = [
        {
            email: "user1@abc.com",
            password: "123456789"
        },
        {
            email: "user2@abc.com",
            password: "123456789"
        }
    ];
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const HandleInputChange = evt => {
        setValue({
            ...value,
            [evt.target.name]: evt.target.value
        })
    };

    const HandleOnSubmit = evt => {
        evt.preventDefault()
        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);
      
        // Compare user info
        if (userData) {
          if (userData.password !== pass.value) {
            // Invalid password
            setErrorMessages({ name: "pass" });
          } else {
            setIsSubmitted(true);
          }
        } else {
          // Username not found
          setErrorMessages({ name: "uname" });
        }

    }

    const ValidateEmail = email => {
        if (!email) return 'Required';
        const IsValidateEmail = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if (!IsValidateEmail) return 'InvalidEmail';
        return '';

    };
    const ValidatePasword = password => {
        if (!password) return 'Required';
        if (password.length < 8) return 'At least 8 chars';
        return '';
    }


    const error = {
        email: ValidateEmail(value.email),
        password: ValidatePasword(value.password)
    };

    const [touch, setTouch] = useState({
        email: false,
        password: false
    });
    const InputBlur = evt => {
        setTouch({
            ...touch,
            [evt.target.name]: true
        })
    };
    const isFormInvalid = Boolean(error.email || error.password);
    console.log(error);
    return (
        <div className="form-login-container">
            <form className="form-login" onSubmit={HandleOnSubmit}>
                <TextField style={{ margin: '20px', display: 'block' }}
                    type="text"
                    label="Email"
                    variant="filled"
                    placeholder="Email"
                    name="email"
                    fullWidth
                    value={value.email}
                    onChange={HandleInputChange}
                    onBlur={InputBlur} />
                {touch.email && <p style={{ margin: '20px', display: 'block', color: 'red' }}>{error.email}</p>}
                <TextField style={{ margin: '20px', display: 'block' }}
                    type="password"
                    fullWidth
                    label="Password"
                    variant="filled"
                    placeholder="Pasword"
                    name="password"
                    value={value.password}
                    onChange={HandleInputChange}
                    onBlur={InputBlur} />
                {touch.password && <p style={{ margin: '20px', display: 'block', color: 'red' }}>{error.password}</p>}
                <Button variant="contained" disabled={isFormInvalid} style={{ margin: '20px', display: 'block' }}>Submit</Button>
            </form>
        </div>
    )
};
export default LoginPage;