import React from 'react'


function ToastWrap1({ TostPosition, TostColor, TostText }) {
    return (
        <div className={`tostwraper ${TostPosition}`}>
            <div className={`tostgcolum ${TostColor}`}>
                {TostText}
            </div>
        </div>
    )
}

ToastWrap1.defaultProps = {
    TostPosition: "",
    TostColor: "",
    TostText: ""
}

export default ToastWrap1
