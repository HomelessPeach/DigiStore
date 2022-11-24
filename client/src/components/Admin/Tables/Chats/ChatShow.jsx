import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, ShowContainer} from "../TablesStyledBlocks";


export const ChatShow = () => {

    const {pathname} = useLocation()
    const userId = pathname.replace(`${AdminRouteNames.ADMIN_CHAT}/`, '')
    const {data, isLoading} = userAPI.useUserShowQuery(1)

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}`}
                >
                    Список пользователей
                </LinkButton>
            </ToolbarBlock>
            <ShowBlock>
                <TextField value={data.user_id} label={'id'}/>
                <TextField value={data.user_email} label={'e-mail'}/>
                <TextField value={data.user_password} label={'Пароль'}/>
                <TextField value={data.user_name} label={'Имя'}/>
                <TextField value={data.user_phone_number} label={'Номер телефона'}/>
            </ShowBlock>
        </ShowContainer>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`