import * as React from "react";
import styled from "styled-components"
import {useLocation} from "react-router-dom";
import {userAPI} from "../../../../services/UserService";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const UserShow = () => {

    const {pathname} = useLocation()
    const {data, isLoading} = userAPI.useUserShowQuery(pathname.replace(`${AdminRouteNames.ADMIN_USERS}/`, ''))

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <ShowBlock>
            <TextField value={data.user_id} label={'id'}/>
            <TextField value={data.user_email} label={'e-mail'}/>
            <TextField value={data.user_password} label={'Пароль'}/>
            <TextField value={data.user_name} label={'Имя'}/>
            <TextField value={data.user_phone_number} label={'Номер телефона'}/>
        </ShowBlock>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`