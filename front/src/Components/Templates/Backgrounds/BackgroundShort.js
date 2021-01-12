import React from 'react';
import BackgroundShortCss from './BackgroundShort.module.css';;

export const BackgroundShort = () => {
    return (
        <div className={BackgroundShortCss.archContainer}>
            <img src="../../../arco.svg" className={BackgroundShortCss.arch} alt="arco superior" />
        </div>
    )
}
