import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {TextInput} from "../../components/TextInput";
import {useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";
import {DeleteButton, EditContainer, LinkButton, ToolbarBlock} from "../../TableStyledBlock";

export const ProductFeatureEdit = () => {

    const {pathname} = useLocation()
    const userId = pathname.replace(`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/edit/`, '')
    const {data, isLoading} = userAPI.useUserShowQuery(userId)

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}`}
                >
                    Список пользователей
                </LinkButton>
                <DeleteButton>
                    Удалить пользователя
                </DeleteButton>
            </ToolbarBlock>
            <EditBlock>
                <TextInput value={data.user_id} label={'id'}/>
                <TextInput value={data.user_email} label={'e-mail'}/>
                <TextInput value={data.user_password} label={'Пароль'}/>
                <TextInput value={data.user_name} label={'Имя'}/>
                <TextInput value={data.user_phone_number} label={'Номер телефона'}/>
            </EditBlock>
        </EditContainer>
    )

}

const EditBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`