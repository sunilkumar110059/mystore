import React from 'react';
import ToastWrap1 from '../../component/reusablecom/ToastWrap1';

function Toast1() {
    return (
        <ToastWrap1
            TostPosition={'position-fixed pos-top pos-left text-center mt-5'}
            TostColor={'font-size20 bg3 color1 px-4 py-2'}
            TostText={'Sucess'}
        />
    )
}

export default Toast1
