import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

import baseUrl from '../../admin/baseUrl';

function DeleteAddItems({ ModalHandler, productDataById }) {
    const router = useRouter();

    const cookies = parseCookies()
    const userCookie = cookies.usertoken ? JSON.parse(cookies.usertoken) : ""

    const [ItemsCount, setItemsCountFun] = useState(1)

    const addHandler = async () => {
        const res = await fetch(`${baseUrl}/api/cartApi`, {
            method: 'PUT',
            headers: {
                "Authorization": cookies.token,
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                quantity: ItemsCount,
                prodId: productDataById._id
            })
        })
        await res.json()
        router.push('/')

    }


    const itemsHandler = (param) => {
        if (param === "minus") {
            if (ItemsCount > 1) {
                setItemsCountFun(ItemsCount - 1)
            }
        }
        else if (param === "plus") {
            setItemsCountFun(ItemsCount + 1)
        }
    }

    const redirectLogin = () => {
        router.push(`/auth/login/loginwrap`);
    }

    return (
        <div className="row no-gutters">
            <div className="col-auto" onClick={(e) => itemsHandler("minus")}>
                <div className="fullheight btn1 py-2 px-3 justify-content-center cursor-p"><i className="fa fa-minus"></i></div>
            </div>

            <div className="col bordercolor2-2 border1">
                <div className="fullheight py-2 px-3 justify-content-center">{ItemsCount}</div>
            </div>

            <div className="col-auto" onClick={(e) => itemsHandler("plus")}>
                <div className="fullheight btn1 py-2  px-3 justify-content-center cursor-p"><i className="fa fa-plus"></i></div>

            </div>

            {userCookie ?
                <div className="col-auto cursor-p ml-2">
                    <div className="fullheight btn1 px-3 justify-content-center cursor-p" onClick={() => addHandler()}> Add</div>
                </div>
                :

                <div className="col-auto cursor-p ml-2">
                    <div className="fullheight btn1 px-3 justify-content-center cursor-p" onClick={() => redirectLogin()}> Login To Add</div>
                </div>
            }

            {
                userCookie.role === "admin" || userCookie.role === "root" ?
                    <div className="col-auto cursor-p ml-2">
                        <div onClick={() => ModalHandler("ShowModals")} className="fullheight btn2 px-3 justify-content-center cursor-p"> Delete</div>
                    </div> :
                    ""
            }

        </div>
    )
}

export default DeleteAddItems;
