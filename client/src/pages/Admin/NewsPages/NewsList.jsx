import * as React from "react";
import {newsAPI} from "../../../services/NewsService";
import {AdminRouteNames} from "../../../Router";
import {DataGrid} from "../../../components/Admin/components/Datagrid";
import {TextField} from "../../../components/Admin/components/TextField";
import {BoolField} from "../../../components/Admin/components/BoolField";
import {ToolbarBlock, LinkButton, ListContainer} from "../../../components/Admin/TablesStyledBlocks";

export const NewsList = () => {

    return (
        <ListContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_NEWS}/new`}
                >
                    Создать новость
                </LinkButton>
            </ToolbarBlock>
            <DataGrid getData={newsAPI.useNewsListQuery} idName={'news_id'}>
                <TextField source={'news_id'} name={'id'} sortable={true}/>
                <TextField source={'news_name'} name={'Название'} sortable={true}/>
                <BoolField source={'is_publish'} name={'Опубликовано'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}