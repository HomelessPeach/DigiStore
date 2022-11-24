import * as React from "react";
import {chatAPI} from "../../../../services/ChatService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";
import {BoolField} from "../../components/BoolField";
import {ListContainer} from "../TablesStyledBlocks";

export const ChatList = () => {

    return (
        <ListContainer>
            <DataGrid getData={chatAPI.useChatListQuery} idName={'chat_id'}>
                <TextField source={'chat_id'} name={'id'} sortable={true}/>
                <TextField source={'fk_user'} name={'Пользователь'} sortable={true}/>
                <BoolField source={'is_answer'} name={'Отвечено'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}