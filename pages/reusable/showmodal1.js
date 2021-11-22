import React, { useState } from 'react';
import ModalWrap1 from '../../component/reusablecom/ModalWrap1'

function ShowkModal1() {

    const [ModalShowHide, setModalShowHideFun] = useState(false)
    const ModalHandler = (modals) => {
        if (modals === "CancelModal") {
            setModalShowHideFun(false)
        }
        else if (modals === "DeleteItems") {
            setModalShowHideFun(false)
        }

        else if (modals === "ShowModals") {
            setModalShowHideFun(true)
        }
    }

    return (
        <div className="wrapper p-5">
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
            <div onClick={() => ModalHandler("ShowModals")} className="d-inline-block btn2 px-3 justify-content-center cursor-p"> Modal Show</div>
        </div>
    )
}

export default ShowkModal1