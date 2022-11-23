import * as React from "react";
import {userAPI} from "../../../../services/UserService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";
import {AdminRouteNames} from "../../../../Router";
import {ToolbarBlock, LinkButton, ListContainer} from "../../TableStyledBlock";


export const UserList = () => {

    return (
        <ListContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}/new`}
                >
                    Создать пользователя
                </LinkButton>
            </ToolbarBlock>
            <DataGrid getData={userAPI.useUserListQuery} idName={'user_id'}>
                <TextField source={'user_id'} name={'id'} sortable={true}/>
                <TextField source={'user_email'} name={'e-mail'} sortable={true}/>
                <TextField source={'user_name'} name={'Имя'} sortable={true}/>
                <TextField source={'user_phone_number'} name={'Номер телефона'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}