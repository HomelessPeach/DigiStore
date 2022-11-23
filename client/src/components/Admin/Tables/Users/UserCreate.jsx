import * as React from "react";
import styled from "styled-components"
import {TextInput} from "../../components/TextInput";
import {AdminRouteNames} from "../../../../Router";
import {NavLink} from "react-router-dom";

export const UserCreate = () => {

    return (
        <>
            <UserCreateToolbar>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}`}
                >
                    Список пользователей
                </LinkButton>
            </UserCreateToolbar>
            <EditBlock>
                <TextInput label={'id'}/>
                <TextInput label={'e-mail'}/>
                <TextInput label={'Пароль'}/>
                <TextInput label={'Имя'}/>
                <TextInput label={'Номер телефона'}/>
            </EditBlock>
        </>
    )

}

const EditBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const UserCreateToolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 10px 0;
  user-select: none;
`

const LinkButton = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 45px;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  margin: 0 10px;
  &:active {
    box-shadow: none;
  }
`