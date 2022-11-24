import * as React from "react";
import styled from "styled-components"
import {TextInput} from "../../components/TextInput";
import {AdminRouteNames} from "../../../../Router";
import {ToolbarBlock, LinkButton, EditContainer} from "../TablesStyledBlocks";

export const ProductCategoryCreate = () => {

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}`}
                >
                    Список пользователей
                </LinkButton>
            </ToolbarBlock>
            <CreateBlock>
                <TextInput label={'id'}/>
                <TextInput label={'e-mail'}/>
                <TextInput label={'Пароль'}/>
                <TextInput label={'Имя'}/>
                <TextInput label={'Номер телефона'}/>
            </CreateBlock>
        </EditContainer>
    )

}

const CreateBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`