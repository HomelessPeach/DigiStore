import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {userAPI} from "../../../../services/UserService";
import {TextInput} from "../../components/TextInput";
import {AdminRouteNames} from "../../../../Router";
import {ToolbarBlock, LinkButton, EditContainer, EditToolbarBlock, Button} from "../TablesStyledBlocks";
import {ImageInput} from "../../components/ImageInput";

export const UserCreate = () => {

    const [createUser] = userAPI.useUserCreateMutation()
    const [userData, setUserData] = useState({})

    function createUserHandler() {
        createUser(userData).unwrap()
    }

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}`}
                >
                    Список пользователей
                </LinkButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <LeftBlock>
                        <ImageInput value={userData.image?.new_image || ''} size={{h: "300px", w: "300px", br: '250px'}} label={'Аватар'} onChange={(value) => (value) ? setUserData({...userData, image: {...userData.image, new_image: value}}) : null}/>
                    </LeftBlock>
                    <RightBlock>
                        <EditDataBlock>
                            <EditDataChildBlock>
                                <TextInput label={'e-mail'} onChange={(value) => setUserData({...userData, user_email: value})}/>
                                <TextInput label={'Пароль'} onChange={(value) => setUserData({...userData, user_password: value})}/>
                                <TextInput label={'Администратор'} onChange={(value) => setUserData({...userData, is_admin: value})}/>
                            </EditDataChildBlock>
                            <EditDataChildBlock>
                                <TextInput label={'Имя'} onChange={(value) => setUserData({...userData, user_name: value})}/>
                                <TextInput label={'Номер телефона'} onChange={(value) => setUserData({...userData, user_phone_number: value})}/>
                            </EditDataChildBlock>
                        </EditDataBlock>
                    </RightBlock>
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={createUserHandler}>
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
  justify-content: center;
  padding: 30px 60px;
  width: 100%;
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