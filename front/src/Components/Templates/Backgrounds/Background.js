import React from 'react';
import backgroundCss from './background.module.css';

export const Background = () => {
    return (
        <div className={backgroundCss.archContainer}>
            <img src="../../../arco.svg" className={backgroundCss.arch} alt="arco superior" />
        </div>
    )
}
