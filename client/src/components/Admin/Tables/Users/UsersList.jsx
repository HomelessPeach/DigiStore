import * as React from "react";
import {userAPI} from "../../../../services/UserService";

export const UsersList = () => {

    const {data, isLoading} = userAPI.useUserListQuery()

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <div>
            Здесь будут пользователи
            {data[0].user_email}
        </div>
    )
}