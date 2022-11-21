import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const UserList = () => {

    return (
        <UserListContainer>
            <DataGrid getData={userAPI.useUserListQuery} idName={'user_id'}>
                <TextField source={'user_id'} name={'id'}/>
                <TextField source={'user_email'} name={'e-mail'}/>
                <TextField source={'user_name'} name={'Имя'}/>
                <TextField source={'user_phone_number'} name={'Номер телефона'}/>
            </DataGrid>
        </UserListContainer>
    )
}

const UserListContainer = styled.div`

`