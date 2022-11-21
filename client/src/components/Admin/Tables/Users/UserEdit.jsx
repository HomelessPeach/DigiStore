import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";

export const UserEdit = () => {

    const {data, isLoading} = userAPI.useUserListQuery()

    if (isLoading)
        return <h1>LOADING...</h1>

    const user = data[0]

    return (
        <EditBlock>
            <div>{user.user_id}</div>
            <div>{user.user_email}</div>
            <div>{user.user_password}</div>
            <div>{user.user_name}</div>
            <div>{user.user_phone_number}</div>
        </EditBlock>
    )

}

const EditBlock = styled.div`
    display: flex;
  flex-direction: column;
`