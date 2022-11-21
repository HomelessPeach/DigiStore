import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {TextField} from "../../components/TextField";
import {useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";

export const UserEdit = () => {

    const {pathname} = useLocation()
    const {data, isLoading} = userAPI.useUserShowQuery(pathname.replace(`${AdminRouteNames.ADMIN_USERS}/edit/`, ''))

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <EditBlock>
            <TextField value={data.user_id} label={'id'}/>
            <TextField value={data.user_email} label={'e-mail'}/>
            <TextField value={data.user_password} label={'Пароль'}/>
            <TextField value={data.user_name} label={'Имя'}/>
            <TextField value={data.user_phone_number} label={'Номер телефона'}/>
        </EditBlock>
    )

}

const EditBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`