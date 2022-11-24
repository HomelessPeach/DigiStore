import * as React from "react";
import styled from "styled-components"
import {TextInput} from "../../components/TextInput";
import {AdminRouteNames} from "../../../../Router";
import {ToolbarBlock, LinkButton, EditContainer, EditToolbarBlock, Button} from "../TablesStyledBlocks";
import {ImageInput} from "../../components/ImageInput";

export const UserCreate = () => {

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
                        <ImageInput value={''} size={{h: "300px", w: "300px", br: '250px'}} label={'Аватар'}/>
                    </LeftBlock>
                    <RightBlock>
                        <EditDataBlock>
                            <EditDataChildBlock>
                                <TextInput label={'e-mail'}/>
                                <TextInput label={'Пароль'}/>
                                <TextInput label={'Администратор'}/>
                            </EditDataChildBlock>
                            <EditDataChildBlock>
                                <TextInput label={'Имя'}/>
                                <TextInput label={'Номер телефона'}/>
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