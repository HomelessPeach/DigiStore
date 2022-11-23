import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {DeleteButton, LinkButton, ShowContainer, ToolbarBlock} from "../../TableStyledBlock";
import {ImageField} from "../../components/ImageField";

export const ProductFeatureShow = () => {

    const {pathname} = useLocation()
    const userId = pathname.replace(`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/`, '')
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
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}/edit/${userId}`}
                >
                    Изменить данные
                </LinkButton>
                <DeleteButton>
                    Удалить пользователя
                </DeleteButton>
            </ToolbarBlock>
            <ShowBlock>
                <LeftBlock>
                    <ImageField value={data?.image?.image_path} size={{h: "300px", w: "300px"}}/>
                </LeftBlock>
                <RightBlock>
                    <TextField value={data.user_id} label={'id'}/>
                    <TextField value={data.user_email} label={'e-mail'}/>
                    <TextField value={data.user_password} label={'Пароль'}/>
                    <TextField value={data.user_name} label={'Имя'}/>
                    <TextField value={data.user_phone_number} label={'Номер телефона'}/>
                </RightBlock>
            </ShowBlock>
        </ShowContainer>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const LeftBlock = styled.div`
  padding: 10px;
`

const RightBlock = styled.div`
  padding: 30px 50px;
`