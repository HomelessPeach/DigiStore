import * as React from "react";
import styled from "styled-components"
import {chatAPI} from "../../../../services/ChatService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const ChatList = () => {

    return (
        <ProductListContainer>
            <DataGrid getData={chatAPI.useChatListQuery} idName={'chat_id'}>
                <TextField source={'chat_id'} name={'id'} sortable={true}/>
                <TextField source={'fk_user_id'} name={'Пользователь'} sortable={true}/>
                <TextField source={'is_answer'} name={'Отвечено'} sortable={true}/>
            </DataGrid>
        </ProductListContainer>
    )
}

const ProductListContainer = styled.div`

`