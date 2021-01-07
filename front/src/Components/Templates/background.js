import React from 'react';
import backgroundCss from './background.module.css';;

export const background = () => {
    return (
        <div>
            <img src="../../../arco.svg" className={backgroundCss.arch} alt="arco superior" />
        </div>
    )
}
