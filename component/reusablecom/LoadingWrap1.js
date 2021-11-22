

function LoadingWrap1({ LoadingText, LoadingAddClass }) {
    return (
        <div className="loadingwrap">
            <div className="loadingrow">
                <div className={`loadingcolum ${LoadingAddClass}`}>{LoadingText}</div>
            </div>
        </div>
    )
}

LoadingWrap1.defaultProps = {
    LoadingAddClass: "",
    LoadingAddClass: "",
}

export default LoadingWrap1;