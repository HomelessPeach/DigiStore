import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";

export const UserShow = () => {

    const {data, isLoading} = userAPI.useUserListQuery()

    if (isLoading)
        return <h1>LOADING...</h1>

    const headerFields = [
        { field: 'user_id', name: 'id'},
        { field: 'user_email', name: 'e-mail'},
        { field: 'user_password', name: 'Пароль'},
        { field: 'user_name', name: 'Имя'},
        { field: 'user_phone_number', name: 'Номер телефона'},
        // { field: 'fk_image', headerName: 'Аватар'},
    ];

    const user = data[0]

    return (
        <ShowBlock>
            <div>{user.user_id}</div>
            <div>{user.user_email}</div>
            <div>{user.user_password}</div>
            <div>{user.user_name}</div>
            <div>{user.user_phone_number}</div>
        </ShowBlock>
    )

}

const ShowBlock = styled.div`
    display: flex;
  flex-direction: column;
`