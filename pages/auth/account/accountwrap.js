import { parseCookies } from 'nookies';
import baseUrl from '../../../admin/baseUrl';
import AccountTtems from './accountitems';
import UserRole from '../../../component/UserRole';

function AccountWrap({ product }) {
   
    const cookie = parseCookies()
    const users = cookie.usertoken ? JSON.parse(cookie.usertoken) : ""

    return (
        <div className="conatiner-fluid">
            <div className="wrapper bg2-3 bordercolor2-3 border-bottom1 mb-4">
                <div className="container py-2">
                    <div className="row">
                        <div className="col"> Order History</div>
                        <div className="col-auto">Total Items {product.length} </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="wrapper">
                    {product.length < 1 ? (<h1> Your Have No Order History</h1>) : (<AccountTtems product={product} />)}
                </div>

                <div className="wrapper">
                    {users.role === "root" && (
                        <UserRole />
                    )}

                </div>
            </div>
        </div>
    )
}



// getServerSideProps start
export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)

    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: "/auth/account/accountwrap"
            }
        }
    }

    const result = await fetch(`${baseUrl}/api/orderApi`, {
        method: "GET",
        headers: {
            "Authorization": token,
            'Content-Type': 'application/json'
        },
    })

    const resultResponse = await result.json()


    return {
        props: {
            product: resultResponse
        }
    }
}
// getServerSideProps end

export default AccountWrap




