import React from 'react';
import backgroundLargeCss from './backgroundLarge.module.css';

export const BackgroundLarge = () => {
    return (
        <div className={backgroundLargeCss.archContainer}>
            <img src="../../../arco.svg" className={backgroundLargeCss.arch} alt="arco superior" />
        </div>
    )
}
