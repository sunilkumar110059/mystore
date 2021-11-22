import React, { useState } from 'react';
import { InputFileWrap1, InputWrap1 } from '../../component/reusablecom/InputWrap1';



function FormsWrap() {
    const [ImageUpload, setImageUpload] = useState('')

    const [forms, setForms] = useState({
        fullname: "",
        mediaurl: ""
    })
    const { fullname, mediaurl } = forms

    const onChangeHandler = (event) => {
        const imageupload = event.target.files[0];
        setImageUpload(imageupload)
        
        const { name, value } = event.target;
        setForms({
            ...forms,
            [name]: value
        })
    }

    return (
        <div className="container-fluid py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 mb-3">
                        <div className="ovr mb-1">Full Name</div>
                        <InputWrap1
                            InputAddClass="border1 bordercolor2-2"
                            InputFaAddClass="fa_right bg1 color2-1"
                            InputAddClassFaIcon="fa-map-marker"
                            InputreadOnly="readOnly"
                            InputAutoComplete="off"
                            InputType="text"
                            InputPlaceholder="Full Name"
                            InputName={'fullname'}
                            Inputvalue={fullname}
                            onChangeHandler={onChangeHandler}
                        />
                    </div>


                    <div className="col-12 col-md-4 mb-3">
                        <div className="ovr mb-1">Upload Image</div>
                        <InputFileWrap1
                            InputAddClass="border1 bordercolor2-2"
                            InputFaAddClass="fa_right bg1 color2-1"
                            InputAddClassFaIcon="fa-upload"
                            InputAddClass="border1 bordercolor2-2"
                            HtmlForLabelAddClass={"fileupload1"}
                            FileValueText={mediaurl}
                            InputAutoComplete="off"
                            InputType="file"
                            InputName={'mediaurl'}
                            Inputvalue={mediaurl}
                            onChangeHandler={onChangeHandler}
                        />

                        <div className="ovr">
                            {ImageUpload ? (<img style={{ width: "100px" }} src={URL.createObjectURL(ImageUpload)} />) : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormsWrap