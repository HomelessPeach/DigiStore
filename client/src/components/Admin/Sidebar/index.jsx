import * as React from "react";
import {useState, useEffect} from "react";
import "./Sidebar.css"

export const Sidebar = () => {

    const [height, setHeight] = useState(0)


    useEffect(()=>{
        window.addEventListener("scroll", () => {
            setHeight((document.body.clientHeight - window.innerHeight - window.scrollY > 200)? 0 : 289 - document.body.clientHeight + window.innerHeight + window.scrollY)
        });
    }, [])

    return (
        <div className={'sidebar-container'} style={{
           height: window.innerHeight - height
        }}>
            <div>Пользователи</div>
            <div>Продукция</div>
        </div>
    )
}