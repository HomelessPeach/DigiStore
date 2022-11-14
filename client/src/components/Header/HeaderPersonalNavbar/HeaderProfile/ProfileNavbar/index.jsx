import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {RouteNames} from "../../../../../Router";
import {Theme} from "../../../../../styles";

export const ProfileNavbar = (props) => {

    const {
        isOpen = false,
        setIsOpen
    } = props
    const Auth = true

    const [profileNavbarHeight, setProfileNavbarHeight] = useState(document.getElementById('profile-navbar')?.offsetHeight || 500)

    useEffect(() => {
        setProfileNavbarHeight(document.getElementById('profile-navbar')?.offsetHeight)
    }, [])

    return (
        <ProfileNavbarBlock id='profile-navbar' isOpen={isOpen} headerHeight={Theme.size.header.height} profileNavbarHeight={profileNavbarHeight}>
            <ProfileNavbarContainer>
                {(Auth)?
                    <>
                        <NavLinkBlock to={RouteNames.PROFILE} title="Профиль" onClick={() => setIsOpen(false)}>Профиль</NavLinkBlock>
                        {(true)?
                            <NavLinkBlock to={RouteNames.ADMIN} title="Панель администратора" onClick={() => setIsOpen(false)}>Панель администратора</NavLinkBlock>
                            : null
                        }
                        <ProfileNavbarButton onClick={() => setIsOpen(false)}>Выйти</ProfileNavbarButton>
                    </>
                    : <>
                        <ProfileNavbarButton onClick={() => setIsOpen(false)}>Войти</ProfileNavbarButton>
                    </>
                }
            </ProfileNavbarContainer>
        </ProfileNavbarBlock>
    )
}

const ProfileNavbarBlock = styled.div`
  position: fixed;
  top: ${({isOpen, headerHeight, profileNavbarHeight}) => (isOpen)? headerHeight : - profileNavbarHeight}px;
  right: 10px;
  width: 300px;
  border: 1px solid black;
  border-top: none;
  border-radius: 0 0 10px 10px;
  background-color: ${({theme}) => theme.colors.tertiary};
  transition: 0.5s;
  z-index: -1;
`

const ProfileNavbarContainer = styled.div`
  padding: 20px 30px 15px;
  display: flex;
  flex-direction: column;
`

const ProfileNavbarButton = styled.div`
  width: 100%;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 10px;
  padding: 5px 0;
  color: ${({theme}) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`

const NavLinkBlock = styled(NavLink)`
  padding: 5px 0;
  margin: 0 0 17px;
  text-decoration: none;
  color: ${({theme}) => theme.colors.primary};
  border-bottom: 1px solid ${({theme}) => theme.colors.primary};
`