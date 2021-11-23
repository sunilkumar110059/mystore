import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import baseUrl from '../../admin/baseUrl';
import StripeCheckout from 'react-stripe-checkout';

function CartItems({ product }) {
    const router = useRouter();
    const [cartItems, setCartItems] = useState(product)
    const { token } = parseCookies()

    const removeItems = async (Pid) => {
        const res = await fetch(`${baseUrl}/api/cartApi`, {
            method: "DELETE",
            headers: {
                "Authorization": token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prodid: Pid
            })
        })
        const repsonse = await res.json()
        setCartItems(repsonse)
    }


    const checkOutHandler = async (paymentInfo) => {
        const res = await fetch(`${baseUrl}/api/paymentApi`, {
            method: "POST",
            headers: {
                "Authorization": token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ paymentInfo })
        })
        const checkoutRes = await res.json()
        if (checkoutRes.message) {
            router.push(`/`)
        }
    }


    let totalPrice = 0


    return (
        <div className="wrapper">
            <div className="cover mb-4">
                {cartItems.map((items, index) => {
                    totalPrice += (items.quantity * items.productid.price)
                    return (
                        <div className="row mb-4" key={index} >
                            <div className="col-12 col-md-2"> <img className="imgs" src={`${items.productid.mediaurl}`} alt={items.productid.name} />   </div>
                            <div className="col-12 col-md-10">
                                <div className="fullheight">
                                    <div className="toppart">
                                        <div className="ovr font-size18 font-bold">{items.productid.name}</div>
                                        <div className="cover">
                                            <div className="row no-gutters">
                                                <div className="col-auto"><span>{items.quantity} </span></div>
                                                <div className="col-auto"> <span className="px-2">X</span></div>
                                                <div className="col-auto"> <span>₹ </span> {items.productid.price}</div>
                                                <div className="col-auto"> <span className="px-2">=</span></div>
                                                <div className="col-auto"><span>₹ </span>  {items.quantity * items.productid.price}</div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="bottompart">
                                        <div className="ovr">
                                            <div className="d-inline-block btn2 py-1 px-3 cursor-p" onClick={() => removeItems(items.productid._id)}> Delete</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
                }
            </div>

            <div className="cover">
                <div className="row no-gutters">
                    <div className="col">
                        <div className="fullheight justify-content-end">
                            <div className="ovr font-size18"> Total Price</div>
                            <div className="ovr font-size25 font-bold"> <span>₹ </span> {totalPrice}</div>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="fullheight justify-content-end">
                            <StripeCheckout
                                name="MyStore"
                                amount={totalPrice * 100}
                                image={`https://play-lh.googleusercontent.com/Iw8j8dgTBxNx4DnuSo5J-lU3a0hJUIGaMuvsxCdcxy7RoVTCLquwrLZj0TMUWYKoRBw=s180-rw`}
                                currency="INR"
                                shippingAddress={true}
                                billingAddress={true}
                                zipCode={true}
                                stripeKey="pk_test_51JwgM4SD83znHPTyCxb81Vytx4RqQl69nARKZRcwc6E5xZUbnpcVaSaupwnk9Foy9LHsSjPMIDVilqtFihGKbqFW00NJTs0p2l"
                                token={(paymentInfo) => checkOutHandler(paymentInfo)}
                            >
                                {cartItems.length == 0 ? " " : <div className="ovr btn1 py-2 px-3 cursor-p font-size20">  CHECKOUT</div>}
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>

        </div>


    )
}

export default CartItems


