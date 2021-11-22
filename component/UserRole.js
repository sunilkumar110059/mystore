import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import baseUrl from '../admin/baseUrl'

function UserRole() {
    // const cookie = parseCookies()
   //  const users = cookie.usertoken ? JSON.parse(cookie.usertoken) : ""
    
    const [RoleUser, setRoleUser] = useState([])

    const { token } = parseCookies();
    const fetchUser = async () => {
        const res = await fetch(`${baseUrl}/api/roleUserApi`, {
            method: "GET",
            headers: {
                "Authorization": token,
                'Content-Type': 'application/json'
            }
        })
        const resrole = await res.json()
        setRoleUser(resrole)
    }


    const roleHandler = async (id, role) => {

        const result = await fetch(`${baseUrl}/api/roleUserApi`, {
            method: "PUT",
            headers: {
                "Authorization": token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userRoleId: id,
                userRole: role,
            })

        })

        const resResult = await result.json()

        const updateUser = RoleUser.map((user) => {
            if ((user.role !== resResult.role) && (user.email === resResult.email)) {
                return resResult
            }
            return user
        })

        console.log("updateUser", updateUser)

        setRoleUser(updateUser)

    }


    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className="cover">
            <div className="d-table d-table-collapse d-table-fixed">
                <div className="d-table-row bg2-3">
                    <div className="d-table-cell p-2 border1 bordercolor2-3">Name</div>
                    <div className="d-table-cell p-2 border1 bordercolor2-3">Email</div>
                    <div className="d-table-cell p-2 border1 bordercolor2-3" style={{ width: "100px" }}>Role</div>
                </div>

                {
                    RoleUser.map((items, index) => (
                        <div className="d-table-row" key={index}>
                            <div className="d-table-cell p-2 border1 bordercolor2-3">{items.name}</div>
                            <div className="d-table-cell p-2 border1 bordercolor2-3">{items.email}</div>
                            <div className="d-table-cell p-2 border1 bordercolor2-3" onClick={() => roleHandler(items._id, items.role)}>{items.role}</div>
                        </div>
                    ))
                }



            </div>



        </div>
    )
}

export default UserRole;