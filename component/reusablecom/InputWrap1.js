import React from 'react';

function InputWrap1(props) {
    const { InputType, InputName, InputValue, InputPlaceholder, onChangeHandler, InputAddClass, AutoComplete, InputReadOnly, InputFaAddClass, InputAddClassFaIcon } = props

    return (
        <div className={`forms ovr ${InputAddClass}`}>
            {InputFaAddClass !== "" ? (<span className={`${InputFaAddClass}`}> <i className={`fa ${InputAddClassFaIcon}`}></i></span>) : ""}
            <input
                autoComplete={AutoComplete}
                type={InputType}
                name={InputName}
                value={InputValue}
                readOnly={InputReadOnly}
                placeholder={InputPlaceholder}
                onChange={onChangeHandler}
                className="inputs"
            />
        </div>
    )
}


InputWrap1.defaultProps = {
    type: "text",
    name: "",
    value: "",
    readOnly: "",
    placeholder: "",
    className: "",
    autoComplete: "",
    InputFaAddClass: ""
}







function InputFileWrap1(props) {
    const { InputType, InputName, InputValue, InputPlaceholder, onChangeHandler, InputAddClass, AutoComplete, InputReadOnly,
        InputFaAddClass, InputAddClassFaIcon, HtmlForLabelAddClass, FileValueText } = props

    return (
        <div className={`forms ovr ${InputAddClass}`}>
            {InputFaAddClass !== "" ? (<span className={`${InputFaAddClass}`}> <i className={`fa ${InputAddClassFaIcon}`}></i></span>) : ""}
            <div className="fileUpload_col">
                <label className="fileupload_value ovr" htmlFor={HtmlForLabelAddClass}>{FileValueText}</label>
                <input
                    autoComplete={AutoComplete}
                    type={InputType}
                    name={InputName}
                    value={InputValue}
                    readOnly={InputReadOnly}
                    placeholder={InputPlaceholder}
                    onChange={(e) => onChangeHandler(e)}
                    className="fileinputs"
                    accept="image/*"
                    id={HtmlForLabelAddClass}
                />
            </div>

        </div>
    )
}


InputFileWrap1.defaultProps = {
    type: "text",
    name: "",
    value: "",
    readOnly: "",
    placeholder: "",
    className: "",
    id: "",
    autoComplete: "",
    InputFaAddClass: "",
    HtmlForLabelAddClass: "",
    FileValueText: ""
}



export { InputWrap1, InputFileWrap1 }
