import * as React from "react";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import "./ProfileNavbar.css"
import {RouteNames} from "../../../../Router";

export const ProfileNavbar = (props) => {

    const {
        isOpen = false,
        setIsOpen
    } = props
    const Auth = true

    const [headerHeight, setHeaderHeight] = useState(document.getElementById('header')?.offsetHeight || 90)
    const [profileNavbarHeight, setProfileNavbarHeight] = useState(document.getElementById('profile-navbar')?.offsetHeight || 500)

    useEffect(() => {
        setHeaderHeight(document.getElementById('header')?.offsetHeight)
        setProfileNavbarHeight(document.getElementById('profile-navbar')?.offsetHeight)
    }, [])

    return (
        <div id='profile-navbar' style={(isOpen)? {top: headerHeight} : {top: headerHeight - profileNavbarHeight}}>
            <div className={'profile-navbar-container'}>
                {(Auth)?
                    <>
                        <NavLink to={RouteNames.PROFILE} title="Профиль" className={'profile-navbar-item'} onClick={() => setIsOpen(false)}>Профиль</NavLink>
                        {(true)?
                            <NavLink to={RouteNames.ADMIN} title="Панель администратора" className={'profile-navbar-item'} onClick={() => setIsOpen(false)}>Панель администратора</NavLink>
                            : null
                        }
                        <div className={"profile-navbar-button"} onClick={() => setIsOpen(false)}>Выйти</div>
                    </>
                    : <>
                        <div className={"profile-navbar-button"} onClick={() => setIsOpen(false)}>Войти</div>
                    </>
                }
            </div>
        </div>
    )
}
