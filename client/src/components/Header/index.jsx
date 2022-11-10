import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {HeaderLogo} from "./HeaderLogo";
import "./Header.css"
import {HeaderBasket} from "./HeaderBasket";
import {HeaderProfile} from "./HeaderProfile";
import {attributeFilesUrl} from "../../services";

export const Header = () => {

    const [height, setHeight] = useState((800 - window.scrollY > 90)? 800 - window.scrollY : 90)
    const {pathname} = useLocation()

    useEffect(()=>{
        window.addEventListener("scroll", () => {
            setHeight((800 - window.scrollY > 90)? 800 - window.scrollY : 90)
        });
    }, [])



    return (
        <header id={'header'}>
            {(height !== 90 && pathname === '/')?
                <div className={'header-container header-main-page-block'} style={{height: height}}>
                    <img src={`${attributeFilesUrl}/logo.svg`}/>
                </div>
                : <div className={'header-container main-header-block'}>
                    <HeaderLogo/>
                    <div className={'header-block-right'}>
                        <HeaderBasket/>
                        <HeaderProfile/>
                    </div>
                </div>
            }
        </header>
    )
}