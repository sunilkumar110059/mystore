import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { InputWrap1 } from '../../../component/reusablecom/InputWrap1';
import baseUrl from '../../../admin/baseUrl';
import { parseCookies } from 'nookies';

export async function getServerSideProps(ctx) {
    const userTokenCookie = parseCookies(ctx)
    const newCookie = userTokenCookie.usertoken ? JSON.parse(userTokenCookie.usertoken) : ""
    if (newCookie.role === 'user' || newCookie.role === '') {
        return {
            redirect: {
                permanent: false,
                destination: "/ "
            }
        }
    }
    return { props: {} }
}


function CreateWrap() {
    const router = useRouter();
    const [Items, setItemsFun] = useState({
        name: "",
        price: "",
        mediaurl: "",
        description: "",
    })
    const { name, price, mediaurl, description } = Items
    const [ItemsValidation, setItemsValidation] = useState('')

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setItemsFun({
            ...Items,
            [name]: value
        })
    }

    const postProduct = async () => {
        const res = await fetch(`${baseUrl}/api/productApi/productApi`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Items)
        });
        await res.json()
      //  router.push(`/`)
    }

    const submitHandler = (event) => {
        event.preventDefault()
        setItemsValidation(Items)
        if (name !== "" && price !== "" && mediaurl !== "" && description !== "") {
            postProduct()
        }
    }

    return (
        <div className="conatiner-fluid py-5">
            <div className="container">

                <form onSubmit={(e) => submitHandler(e)}>
                    <div className="row">

                        <div className="col-12 col-md-4 mb-3">
                            <div className="ovr mb-1">Product Name</div>
                            <InputWrap1
                                InputAddClass="border1 bordercolor2-2"
                                InputAutoComplete="off"
                                InputType="text"
                                InputName={'name'}
                                Inputvalue={name}
                                onChangeHandler={onChangeHandler}
                            />
                            {ItemsValidation.name === "" ? (<div className="color3 font-size10"> Please Fill Product Name </div>) : ""}
                        </div>

                        <div className="col-12 col-md-4 mb-3">
                            <div className="ovr mb-1">price</div>
                            <InputWrap1
                                InputAddClass="border1 bordercolor2-2"
                                InputAutoComplete="off"
                                InputType="text"
                                InputName={'price'}
                                Inputvalue={price}
                                onChangeHandler={onChangeHandler}
                            />
                            {ItemsValidation.price === "" ? (<div className="color3 font-size10"> Please Fill Price </div>) : ""}
                        </div>

                        <div className="col-12 col-md-4 mb-3">
                        <div className="ovr mb-1">Upload Image</div>
                            <InputWrap1
                                InputAddClass="border1 bordercolor2-2"
                                InputAutoComplete="off"
                                InputType="text"
                                InputName={'mediaurl'}
                                Inputvalue={mediaurl}
                                onChangeHandler={onChangeHandler}
                            />
                            {ItemsValidation.mediaurl === "" ? (<div className="color3 font-size10"> Please Upload Image </div>) : ""} 

                        </div>



                        <div className="col-12 col-md-12 mb-3">
                            <div className="ovr mb-1">Description</div>
                            <InputWrap1
                                InputAddClass="border1 bordercolor2-2"
                                InputAutoComplete="off"
                                InputType="text"
                                InputName={'description'}
                                Inputvalue={description}
                                onChangeHandler={onChangeHandler}
                            />
                            {ItemsValidation.description === "" ? (<div className="color3 font-size10"> Please Fill Description </div>) : ""}


                        </div>


                        <div className="col-12 col-md-auto mb-3">
                            <div className="fullheight justify-content-end">
                                <button className="btn1 py-2 px-3"> Add Product</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateWrap;