import React, { useState } from 'react';
import { useRouter } from 'next/router';
import baseUrl from '../../admin/baseUrl';
import DeleteAddItems from './DeleteAddItems';

import ModalWrap1 from '../../component/reusablecom/ModalWrap1';
import LoadingWrap1 from '../../component/reusablecom/LoadingWrap1';


export async function getStaticPaths() {
    return {
        paths: [
            { params: { id: "618cd2971cbac920fde8c14b" } }
        ],
        fallback: true
    };
}



export async function getStaticProps({ params: { id } }) {
    const res = await fetch(`${baseUrl}/api/productApi/${id}`);
    const data = await res.json()
    return {
        props: { productDataById: data }
    }
}


// export async function getServerSideProps({ params: { id } }) {
//     const res = await fetch(`${baseUrl}/api/productApi/${id}`);
//     const data = await res.json()
//     return {
//         props: { productDataById: data }
//     }
// }





function Product({ productDataById }) {
    const router = useRouter();
    const [ModalShowHide, setModalShowHideFun] = useState(false)

    if (router.isFallback) {
        return (
            <LoadingWrap1
                LoadingText={`Loading..`}
                LoadingAddClass={`font-size25 color1 font-bold`}
            />
        )
    }


    const deleteProduct = async () => {
        const res = await fetch(`${baseUrl}/api/productApi/${productDataById._id}`, {
            method: "DELETE"
        });
        await res.json()
        router.push(`/`)
    }

    const ModalHandler = (modals) => {
        if (modals === "CancelModal") {
            setModalShowHideFun(false)
        }
        else if (modals === "DeleteItems") {
            deleteProduct()
            setModalShowHideFun(false)
        }

        else if (modals === "ShowModals") {
            setModalShowHideFun(true)
        }
    }

    return (
        <div className="conatiner-fluid py-5">

            {ModalShowHide ? (
                <ModalWrap1
                    CancelText={'Cancel'}
                    DeleteText={'Delete'}
                    CancelButtonAddClass={'btn1'}
                    DeleteButtonAddClass={'btn2'}
                    HeadingText={'Heading'}
                    DescriptionText={'Description'}
                    ModalHandler={ModalHandler}
                />
            ) : ""}

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5"> <img className="shadow1 bordercolor2-2 border1 shadow1" src={`${productDataById.mediaurl}`} alt={productDataById.name} /></div>
                    <div className="col-12 col-md-7">
                        <div className="fullheight">
                            <div className="toppart"> <div className="ovr font-size25 mb-2">{productDataById.name}</div>
                                <div className="ovr mb-2">{productDataById.description}</div>
                                <div className="ovr font-size20 mb-2 font-bold">INR {productDataById.price}</div></div>

                            <div className="bottompart">
                                <DeleteAddItems
                                    ModalHandler={ModalHandler}
                                    productDataById={ productDataById}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Product;









