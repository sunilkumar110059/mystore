import { useRouter } from 'next/router';
import baseUrl from '../../admin/baseUrl';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
import CartItems from './cartitems';

function CartWrap({ error, product }) {
    const router = useRouter();
    const { token } = parseCookies();

    if (error) {
        cookie.remove("usertoken")
        cookie.remove("token")
        router.push('/auth/login/loginwrap')
    }
    return (
        <div className="conatiner-fluid">
            <div className="wrapper bg2-3 bordercolor2-3 border-bottom1 mb-4">
                <div className="container py-2">
                    <div className="row">
                        <div className="col"> Add to Cart</div>
                        <div className="col-auto">Total Items <span className="font-bold">{product.length}</span></div>
                    </div>
                </div>
            </div>

            <div className="container">
                {token ? (
                    <CartItems product={product} />
                ) :
                    (<h1> Please Login To View Your Card </h1>)
                }

            </div>
        </div>
    )
}
export default CartWrap;



// getServerSideProps start
export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)

    if (!token) {
        return {
            props: { product: [] }
        }
    }

    const res = await fetch(`${baseUrl}/api/cartApi`, {
        method: "GET",
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json'
        },
    })

    const product = await res.json()

    if (product.error) {
        return {
            props: { error: product.error }
        }
    }
    else {
        return {
            props: { product }
        }
    }
}





