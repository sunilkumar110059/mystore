

function ModalWrap1({ CancelText, DeleteText, CancelButtonAddClass, DeleteButtonAddClass, HeadingText, DescriptionText, ModalHandler }) {

    return (
        <div className="modalwrapper">
            <div className="modalrow">
                <div className="modalcolum">
                    <div className="cover">
                        <div className="ovr font-size25 mb-2">{HeadingText}</div>
                        <div className="ovr">{DescriptionText}</div>
                    </div>
                    <div className="cover mt-4">
                        <div className="row no-gutters-5 justify-content-end">
                            <div className="col-auto" onClick={() => ModalHandler("CancelModal")} >
                                <div className={`p-2 cursor-p ${CancelButtonAddClass}`}>{CancelText}</div>
                            </div>
                            <div className="col-auto" onClick={() => ModalHandler("DeleteItems")} >
                                <div className={`p-2 cursor-p ${DeleteButtonAddClass}`}>{DeleteText}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


ModalWrap1.defaultProps = {
    CancelText: "",
    DeleteText: "",
    CancelButtonAddClass: "",
    DeleteButtonAddClass: "",
    HeadingText: "",
    DescriptionText: "",
}

export default ModalWrap1;