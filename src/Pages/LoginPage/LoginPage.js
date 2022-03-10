import React, { useState } from "react";
const LoginPage = () => {
    const [value, setValue] = useState({
        email: '',
        password: ''
    });

    const HandleInputChange = evt => {
        setValue({
            ...value,
            [evt.target.name]: evt.target.value
        })
    };

    const HandleOnSubmit = evt => {
        evt.preventDefault();
    }

    const ValidateEmail = email => {
        if(!email) return 'Required';
        const IsValidateEmail = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        if(!IsValidateEmail) return 'InvalidEmail';
        return '';

    };
    const ValidatePasword = password =>{
        if(!password) return 'Required';
        if(password.length<8) return 'At least 8 chars';
        return '';
    }
    

    const error ={
        email: ValidateEmail(value.email),
        password:ValidatePasword(value.password)
    };

    const [touch,setTouch] = useState({
        email: false,
        password: false
    });
    const InputBlur = evt =>{
        setTouch({
            ...touch,
            [evt.target.name]:true
        })
    };
    const isFormInvalid = error.email || error.password;
    console.log(error);
    return (
        <div>
            <form onSubmit={HandleOnSubmit}>
                <input style={{ margin: '20px', display: 'block' }}
                    type="text"
                    placeholder="email"
                    name="email"
                    value={value.email}
                    onChange={HandleInputChange}
                    onBlur={InputBlur} />
                {touch.email && <p style={{ margin: '20px', display: 'block' ,color:'red'}}>{error.email}</p>}
                <input style={{ margin: '20px', display: 'block' }}
                    type="password"
                    placeholder="pasword"
                    name="password"
                    value={value.password}
                    onChange={HandleInputChange}
                    onBlur={InputBlur} />
                {touch.password &&<p style={{margin: '20px', display: 'block' ,color:'red'}}>{error.password}</p>}
                <button disabled={isFormInvalid} style={{ margin: '20px', display: 'block' }}>Submit</button>
            </form> 
        </div>
    )
};
export default LoginPage;