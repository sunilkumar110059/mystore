import React, { useState } from 'react';
import { parseCookies } from 'nookies';
function AccountTtems({ product }) {
    const cookie = parseCookies()
    const users = cookie.usertoken ? JSON.parse(cookie.usertoken) : ""

    const [slide, setSlide] = useState('')
    console.log(slide)

    const slideHandler = (event, id) => {
        setSlide(id)
    }

    return (


        <>

            {product.map((curElem, index) => {

                return (<div className="cover border1 bordercolor2-3 mb-3" key={index}>
                    <div className="cover border-bottom1 bordercolor2-3 p-2 bg2-3" onClick={(e) => slideHandler(e, curElem._id)}>
                        <div className="row">
                            <div className="col"> <i className="fa fa-folder color5"></i>  {curElem.createdAt}</div>
                            <div className="col-auto">  {users.email}</div>
                        </div>
                    </div>

                    <div className={`cover ${curElem._id !== slide ? "hides" : ""}`}>

                        {curElem.product.map((parmSecond, index) => {
                            return (
                                <div className="cover border-bottom1 bordercolor2-2 p-2" key={index + index}>
                                    <div className="row no-gutters ">
                                        <div className="col-12 mb-1 font-size14 font-bold">Product Name : {parmSecond.productid.name}</div>
                                        <div className="col-auto"><span>{parmSecond.quantity} </span></div>
                                        <div className="col-auto"> <span className="px-2">X</span></div>
                                        <div className="col-auto"> <span>₹ </span> {parmSecond.productid.price}</div>
                                        <div className="col-auto"> <span className="px-2">=</span></div>
                                        <div className="col-auto"><span>₹ </span>  {parmSecond.quantity * parmSecond.productid.price}</div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="ovr font-bold font-size18 p-2"> Total {curElem.totalprice}</div>
                    </div>
                </div>)

            })
            }

        </>

    )
}

export default AccountTtems