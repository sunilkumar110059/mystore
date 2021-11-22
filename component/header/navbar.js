
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import React from 'react';

function NavBar() {
    const router = useRouter()
    const cookies = parseCookies()
    const userCookie = cookies.usertoken ? JSON.parse(cookies.usertoken) : ""
    if (typeof window === 'undefined') {
        return null;
    }

    function isActive(route) {
        if (route === router.pathname) {
            return "active"
        }
    }

    const logOut = () => {
        cookie.remove('token');
        cookie.remove('usertoken');
        router.push('/auth/login/loginwrap')
    }

    return (

        <div className="container-fluid bg5">
            <div className="row">
                <div className="col align-self-center"><Link href="/"><a className="d-inline-block font-size20 font-bold color1">MyStore</a></Link></div>
                <div className="col-auto">
                    <div className="row no-gutters">

                        <div className="col">
                            <div className={isActive(`/cart/cartwrap`)}>
                                <Link href="/cart/cartwrap">
                                    <a className="d-block color1 p-3">Cart</a>
                                </Link>
                            </div>
                        </div>

                        {
                            userCookie.role === "admin" || userCookie.role === "root" ? (
                                <div className="col">
                                    <div className={isActive(`/auth/create/createwrap`)}>
                                        <Link href="/auth/create/createwrap">
                                            <a className="d-block color1 p-3">Create</a>
                                        </Link>
                                    </div>
                                </div>

                            ) : ""
                        }



                        {userCookie ?
                            <>
                                <div className="col">
                                    <div className={isActive(`/auth/account/accountwrap`)}>
                                        <Link href="/auth/account/accountwrap">
                                            <a className="d-block color1 p-3">Account</a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="d-block color1 p-3" onClick={() => logOut()}>Logout</div>
                                </div>
                            </> :

                            <>
                                <div className="col">
                                    <div className={isActive(`/auth/login/loginwrap`)}>
                                        <Link href="/auth/login/loginwrap">
                                            <a className="d-block color1 p-3">Login</a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={isActive(`/auth/registration/registrationwrap`)}>
                                        <Link href="/auth/registration/registrationwrap">
                                            <a className="d-block color1 p-3">Registration</a>
                                        </Link>
                                    </div>
                                </div>

                            </>
                        }

                        <div className="col">
                            <div className={isActive(`/reusable/showmodal1`)}>
                                <Link href="/reusable/showmodal1">
                                    <a className="d-block color1 p-3">Check</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar
