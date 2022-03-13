import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './LoginPage.css';
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const LoginPage = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    })
    const HandleInputChange = evt => {
        setValue({
            ...value,
            [evt.target.name]: evt.target.value
        })
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

    }
    const ValidatePasword = password => {
        if (!password) return 'Required';
        if (password.length < 8) return 'Password at least 8 chars';
        return '';
    }

    const error = {
        email: ValidateEmail(value.email),
        password: ValidatePasword(value.password)
    }
    const [token, setToken] = useState({
        tokenArray: '',
        id: '',
    })
    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://60dff0ba6b689e001788c858.mockapi.io/tokens`,
        }).then(response => {
            setToken({
                tokenArray: response.data.token,
                id: response.data.userId
            })
        })
    }, []);
    const [touch, setTouch] = useState({
        email: false,
        password: false
    })
    const InputBlur = evt => {
        setTouch({
            ...touch,
            [evt.target.name]: true
        })
    }
    const [showResults, setShowResults] = React.useState()
    const [rememberUser, setRememberUser] = useState(false)
    const HandleOnSubmit = evt => {
        setShowResults("Login Sucess")

        if (rememberUser) {
            localStorage.setItem('tokenArray', token.tokenArray)
            localStorage.setItem('id', token.id)
        }
        else 
        {
            window.sessionStorage.setItem("tokenArray", token.tokenArray);
            window.sessionStorage.setItem("id", token.id);
        }
        window.location.reload()
    }
    const isFormInvalid = Boolean(error.email || error.password);
     return (
        <div className="form-login-container">
            <form className="form-login">
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
                <FormGroup style={{ margin: '20px', display: 'block' }}>
                    <FormControlLabel type="checkbox"
                        checked={rememberUser}
                        onChange={() => {
                            setRememberUser(!rememberUser)
                        }} control={<Checkbox defaultChecked />} label="Remember" />
                </FormGroup>
                <Button onClick={HandleOnSubmit}  variant="contained" disabled={isFormInvalid} style={{ margin: '20px', display: 'block' }}>Submit</Button>
                {showResults}
            </form>
        </div>
    )
};
export default LoginPage;