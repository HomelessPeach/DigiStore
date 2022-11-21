import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";

export const UserList = () => {

    return (
        <UserListContainer>
            <UserListToolbar>
                <CreateButton>
                    Создать пользователя
                </CreateButton>
            </UserListToolbar>
            <DataGrid getData={userAPI.useUserListQuery} idName={'user_id'}>
                <TextField source={'user_id'} name={'id'}/>
                <TextField source={'user_email'} name={'e-mail'}/>
                <TextField source={'user_name'} name={'Имя'}/>
                <TextField source={'user_phone_number'} name={'Номер телефона'}/>
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

const CreateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 45px;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 10px;
  color: white;
  box-shadow: 0 0 10px 0 #5e5e5e;
  &:active {
    box-shadow: none;
  }
`

const UserListContainer = styled.div`
    padding: 10px;
`