
import React, { useState } from 'react';
import baseUrl from '../../../admin/baseUrl';
import { useRouter } from 'next/router';
import { InputWrap1 } from '../../../component/reusablecom/InputWrap1';

function RegistrationWrap() {
    const router = useRouter()

    const [RegSucess, setRegSucessFun] = useState('')

    const [RegValidation, setRegValidationFun] = useState('')
    const { servName, servEmail, servPassword, servSuccess } = RegValidation;

    const [Registration, setRegistrationFun] = useState({
        name: "",
        email: "",
        password: ""
    })
    const { name, email, password } = Registration;

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setRegistrationFun({
            ...Registration,
            [name]: value
        })
    }

    const postRegistration = async () => {
        const result = await fetch(`${baseUrl}/api/registrationApi`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Registration)
        })
        const newResponse = await result.json()

        if (newResponse.servName || newResponse.servEmail || newResponse.servPassword) {
            setRegValidationFun(newResponse)
        }
        else {
            setRegValidationFun('')
            setRegSucessFun(newResponse.servSuccess)
            router.push(`/auth/login/loginwrap`)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault()
        postRegistration()
    }



    return (
        <div className="conatiner-fluid py-5">

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="cover font-size25 font-bold mb-3"> Registration</div>
                        <div className="ovr color4 font-size25"> {RegSucess}</div>

                        <div className="cover">
                            <form onSubmit={(e) => submitHandler(e)}>
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="ovr mb-1">User Name</div>
                                        <InputWrap1
                                            InputAddClass="border1 bordercolor2-2"
                                            InputAutoComplete="off"
                                            InputType="text"
                                            InputName={'name'}
                                            Inputvalue={name}
                                            onChangeHandler={onChangeHandler}
                                        />
                                        <div className="ovr color3 font-size10"> {servName}</div>
                                    </div>

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
                                        <div className="ovr color3 font-size10"> {servEmail}</div>

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
                                        <div className="ovr color3 font-size10"> {servPassword}</div>
                                    </div>

                                    <div className="col-auto mb-3"><button className="btn1 py-2 px-3"> Registration</button></div>
                                    <div className="col mb-3">
                                        <div className="fullheight justify-content-center text-right color5"> Already have a account ?</div>
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

export default RegistrationWrap;