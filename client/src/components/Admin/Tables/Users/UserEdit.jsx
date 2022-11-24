import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {TextInput} from "../../components/TextInput";
import {useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";
import {ToolbarBlock, LinkButton, DeleteButton, EditContainer, EditToolbarBlock, Button} from "../TablesStyledBlocks";
import {ImageInput} from "../../components/ImageInput";
import {TextField} from "../../components/TextField";

export const UserEdit = () => {

    const {pathname} = useLocation()
    const userId = pathname.replace(`${AdminRouteNames.ADMIN_USERS}/edit/`, '')
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
                <EditContent>
                    <LeftBlock>
                        <ImageInput value={data?.image?.image_path} size={{h: "300px", w: "300px", br: '250px'}} label={'Аватар'}/>
                    </LeftBlock>
                    <RightBlock>
                        <IdBlock>
                            <TextField value={data.user_id} label={'id'}/>
                        </IdBlock>
                        <EditDataBlock>
                            <EditDataChildBlock>
                                <TextInput value={data.user_email} label={'e-mail'}/>
                                <TextInput value={data.is_admin} label={'Администратор'}/>
                                <ButtonChangePassword>Изменить пароль</ButtonChangePassword>
                            </EditDataChildBlock>
                            <EditDataChildBlock>
                                <TextInput value={data.user_name} label={'Имя'}/>
                                <TextInput value={data.user_phone_number} label={'Номер телефона'}/>
                            </EditDataChildBlock>
                        </EditDataBlock>
                    </RightBlock>
                </EditContent>
                <EditToolbarBlock>
                    <Button>
                        Сохранить
                    </Button>
                </EditToolbarBlock>
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

const EditContent = styled.div`
  display: flex;
  flex-direction: row;
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
  width: 47%;
`

const ButtonChangePassword = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  margin: 30px auto 17px;
  text-align: center;
  padding: 3px;
  user-select: none;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`