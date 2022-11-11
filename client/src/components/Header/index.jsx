import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {HeaderLogo} from "./HeaderLogo";
import {HeaderPersonalNavbar} from "./HeaderPersonalNavbar";
import {HeaderGeneralNavbar} from "./HeaderGeneralNavbar";
import {attributeFilesUrl} from "../../services";
import "./Header.css"

export const Header = () => {

    const {
        pathname
    } = useLocation()

    const links = [
        {name: 'Продукция', pathname: '/product'}
    ]

    const maxHeaderHeight = 500

    const [height, setHeight] = useState((maxHeaderHeight - window.scrollY > 90)? maxHeaderHeight - window.scrollY : 90)


    useEffect(()=>{
        window.addEventListener("scroll", () => {
            setHeight((maxHeaderHeight - window.scrollY > 90)? maxHeaderHeight - window.scrollY : 90)
        });
    }, [])

    return (
        <header id={'header'}>
            {(height !== 90 && pathname === '/')?
                <div className={'header-container header-main-page-block'} style={{height: height}}>

                    <div style={{width: 800, height: maxHeaderHeight, color: "white", fontSize: 55, position: "fixed", top: height - maxHeaderHeight}}>
                        Здесь должна находиться информация о сайте, но по каким-то причинам она отсутствует. Разработчик в этом не виноват
                    </div>

                    {/*<img src={`${attributeFilesUrl}/logo.svg`}/>*/}
                </div>
                : <div className={'header-container main-header-block'}>
                    <HeaderLogo/>
                    <HeaderGeneralNavbar items={links}/>
                    <HeaderPersonalNavbar/>
                </div>
            }
        </header>
    )
}