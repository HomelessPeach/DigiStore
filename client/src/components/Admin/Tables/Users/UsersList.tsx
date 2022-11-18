import * as React from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {userAPI} from "../../../../services/UserService";

export const UsersList = () => {

    const {
        data,
        isLoading,
        error
    } = userAPI.useUserListQuery([])

    if (isLoading)
        return <h1>Loading</h1>

    return (
        <div>
            Здесь будут пользователи<br/>
            {data[0].user_name}
        </div>
    )
}