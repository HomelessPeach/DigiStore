import * as React from "react";
import {useEffect, useState} from "react";
import "./Header.css"
import {useLocation} from "react-router-dom";

export const Header = () => {

    const [height, setHeight] = useState((200 - window.scrollY > 75)? 200 - window.scrollY : 75)
    const {pathname} = useLocation()

    useEffect(()=>{
        window.addEventListener("scroll", () => {
            setHeight((200 - window.scrollY > 75)? 200 - window.scrollY : 75)
        });
    }, [])



    return (
        <header id={'header'}>
            {(pathname === '/')?
                <div className={'header-container'} style={{height: height}}>

                </div>
                : <div className={'header-container'}>

                </div>
            }
        </header>
    )
}