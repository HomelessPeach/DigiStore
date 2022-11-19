import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {DataGrid} from "../../DataGrid";

export const UserList = () => {

    const {data, isLoading} = userAPI.useUserListQuery()

    if (isLoading)
        return <h1>LOADING...</h1>

    console.log(data)

    const headerFields = [
        { field: 'user_id', name: 'id'},
        { field: 'user_email', name: 'e-mail'},
        { field: 'user_password', name: 'Пароль'},
        { field: 'user_name', name: 'Имя'},
        { field: 'user_phone_number', name: 'Номер телефона'},
        // { field: 'fk_image', headerName: 'Аватар'},
    ];

    return (
        <UserListContainer>
            <DataGrid headerFields={headerFields} data={data} idName={'user_id'}/>
        </UserListContainer>
    )
}

const UserListContainer = styled.div`
  //height: 300px;
  //width: 100%
`