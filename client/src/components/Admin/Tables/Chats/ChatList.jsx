import * as React from "react";
import {userAPI} from "../../../../services/UserService";
import {chatAPI} from "../../../../services/ChatService";
import {AdminRouteNames} from "../../../../Router";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";
import {BoolField} from "../../components/BoolField";
import {ReferenceField} from "../../components/ReferenceField";
import {ListContainer} from "../TablesStyledBlocks";

export const ChatList = () => {

    return (
        <ListContainer>
            <DataGrid getData={chatAPI.useChatListQuery} idName={'chat_id'}>
                <TextField source={'chat_id'} name={'id'} sortable={true}/>
                <ReferenceField source={'fk_user'} name={'Пользователь'} sortable={true}
                                searchFunc={userAPI.useGetUserDataMutation}
                                searchFieldName={'user_name'}
                                link={AdminRouteNames.ADMIN_USERS}
                />
                <BoolField source={'is_answer'} name={'Отвечено'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}