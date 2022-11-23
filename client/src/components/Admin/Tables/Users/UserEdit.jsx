import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {TextInput} from "../../components/TextInput";
import {NavLink, useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";

export const UserEdit = () => {

    const {pathname} = useLocation()
    const userId = pathname.replace(`${AdminRouteNames.ADMIN_USERS}/edit/`, '')
    const {data, isLoading} = userAPI.useUserShowQuery(userId)

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <>
            <UserEditToolbar>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}`}
                >
                    Список пользователей
                </LinkButton>
                <DeleteButton>
                    Удалить пользователя
                </DeleteButton>
            </UserEditToolbar>
            <EditBlock>
                <TextInput value={data.user_id} label={'id'}/>
                <TextInput value={data.user_email} label={'e-mail'}/>
                <TextInput value={data.user_password} label={'Пароль'}/>
                <TextInput value={data.user_name} label={'Имя'}/>
                <TextInput value={data.user_phone_number} label={'Номер телефона'}/>
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

const UserEditToolbar = styled.div`
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

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 45px;
  background-color: #ff4646;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  &:active {
    box-shadow: none;
  }
`