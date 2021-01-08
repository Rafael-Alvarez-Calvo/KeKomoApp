import {useState} from 'react';
import autoBind from "auto-bind"

//class BannerExample extends React.Component {
export const useOptionListSettings = () => {

    const [settingsBrandList, setSettingsBrandList] = useState({
        autoPlay: false,
        timer: 1000,
        animation: "slide",
        indicators: true,
        timeout: 500,
        navButtonsAlwaysVisible: true,
        navButtonsAlwaysInvisible: false
    })

    autoBind(settingsBrandList);

    const toggleAutoPlay = () => {
        setSettingsBrandList({
            autoPlay: !settingsBrandList.autoPlay
        })
    }

    const toggleIndicators = () => {
        setSettingsBrandList({
            indicators: !settingsBrandList.indicators
        })
    }

    const toggleNavButtonsAlwaysVisible = () => {
        setSettingsBrandList({
            navButtonsAlwaysVisible: !settingsBrandList.navButtonsAlwaysVisible
        })
    }

    const toggleNavButtonsAlwaysInvisible = () => {
        setSettingsBrandList({
            navButtonsAlwaysInvisible: !settingsBrandList.navButtonsAlwaysInvisible
        })
    }

    const changeAnimation = (event) => {
        setSettingsBrandList({
            animation: event.target.value
        })
    }

    const changeTimeout = (event, value) => {
        setSettingsBrandList({
            timeout: value
        })
    }

        return {
            settingsBrandList,
            toggleAutoPlay, 
            toggleIndicators, 
            toggleNavButtonsAlwaysVisible,
            toggleNavButtonsAlwaysInvisible,
            changeAnimation,
            changeTimeout
        }
 
}

    