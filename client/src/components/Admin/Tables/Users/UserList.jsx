import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";
import {NavLink} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";

export const UserList = () => {

    return (
        <UserListContainer>
            <UserListToolbar>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}/new`}
                >
                    Создать пользователя
                </LinkButton>
            </UserListToolbar>
            <DataGrid getData={userAPI.useUserListQuery} idName={'user_id'}>
                <TextField source={'user_id'} name={'id'} sortable={true}/>
                <TextField source={'user_email'} name={'e-mail'} sortable={true}/>
                <TextField source={'user_name'} name={'Имя'} sortable={true}/>
                <TextField source={'user_phone_number'} name={'Номер телефона'} sortable={true}/>
            </DataGrid>
        </UserListContainer>
    )
}

const UserListToolbar = styled.div`
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

const UserListContainer = styled.div`
    padding: 10px;
`