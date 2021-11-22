import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

import baseUrl from '../../../admin/baseUrl';
import { InputWrap1 } from '../../../component/reusablecom/InputWrap1';

function LoginWrap() {
    const router = useRouter()
    const [Validation, setValidationFun] = useState('')

    const [Login, setLoginFun] = useState({
        email: "",
        password: ""
    })
    const { email, password } = Login;


    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setLoginFun({
            ...Login,
            [name]: value
        })
    }

    const postLogin = async () => {
        const result = await fetch(`${baseUrl}/api/loginApi`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Login)
        })
        const newResponse = await result.json()
        if (newResponse.servEmail || newResponse.servPassword) {
            setValidationFun(newResponse)
        }
        else {

            setValidationFun('')
            cookie.set("token", newResponse.servToken)
            cookie.set("usertoken", JSON.stringify(newResponse.servUserToken))
            router.push(`/auth/account/accountwrap`)
        }

    }

    const submitHandler = (event) => {
        event.preventDefault()
        postLogin()
    }

    return (
        <div className="conatiner-fluid py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="cover font-size25 font-bold mb-3"> Login</div>
                        <div className="cover">
                            <form onSubmit={(e) => submitHandler(e)}>
                                <div className="row">

                                    <div className="col-12 mb-3">
                                        <div className="ovr mb-1">Email</div>
                                        <InputWrap1
                                            InputAddClass="border1 bordercolor2-2"
                                            InputAutoComplete="off"
                                            InputType="text"
                                            InputName={'email'}
                                            Inputvalue={email}
                                            onChangeHandler={onChangeHandler}
                                        />
                                        <div className="ovr color3 font-size10"> {Validation.servEmail}</div>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <div className="ovr mb-1">Password</div>
                                        <InputWrap1
                                            InputAddClass="border1 bordercolor2-2"
                                            InputAutoComplete="off"
                                            InputType="password"
                                            InputName={'password'}
                                            Inputvalue={password}
                                            onChangeHandler={onChangeHandler}
                                        />
                                        <div className="ovr color3 font-size10"> {Validation.servPassword}</div>
                                    </div>

                                    <div className="col-auto mb-3"><button className="btn1 py-2 px-3"> Login</button></div>
                                    <div className="col mb-3">
                                        <div className="fullheight justify-content-center text-right color5">Do not have a account ?</div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginWrap;