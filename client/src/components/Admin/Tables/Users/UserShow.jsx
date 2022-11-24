import * as React from "react";
import styled from "styled-components"
import {useLocation} from "react-router-dom";
import {userAPI} from "../../../../services/UserService";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ImageField} from "../../components/ImageField";
import {ToolbarBlock, LinkButton, ShowContainer, DeleteButton} from "../TablesStyledBlocks";
import {TextInput} from "../../components/TextInput";

export const UserShow = () => {

    const {pathname} = useLocation()
    const userId = pathname.replace(`${AdminRouteNames.ADMIN_USERS}/`, '')
    const {data, isLoading} = userAPI.useUserShowQuery(userId)

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
                    <ImageField value={data?.image?.image_path} size={{h: "300px", w: "300px", br: '150px'}} label={'Аватар'}/>
                </LeftBlock>
                <RightBlock>
                    <IdBlock>
                        <TextField value={data.user_id} label={'id'}/>
                    </IdBlock>
                    <EditDataBlock>
                        <EditDataChildBlock>
                            <TextField value={data.user_email} label={'e-mail'}/>
                            <TextField value={data.is_admin} label={'Администратор'}/>
                        </EditDataChildBlock>
                        <EditDataChildBlock>
                            <TextField value={data.user_name} label={'Имя'}/>
                            <TextField value={data.user_phone_number} label={'Номер телефона'}/>
                        </EditDataChildBlock>
                    </EditDataBlock>
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
  align-items: stretch
`

const LeftBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 60px;
`

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 60px;
  width: 100%;
`

const IdBlock = styled.div`
  padding: 0 0 10px ;
`

const EditDataBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const EditDataChildBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 60%;
`