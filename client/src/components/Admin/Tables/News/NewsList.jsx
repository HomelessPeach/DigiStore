import * as React from "react";
import {newsAPI} from "../../../../services/NewsService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";
import {AdminRouteNames} from "../../../../Router";
import {ToolbarBlock, LinkButton, ListContainer} from "../TablesStyledBlocks";
import {BoolField} from "../../components/BoolField";

export const NewsList = () => {

    return (
        <ListContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_NEWS}/new`}
                >
                    Создать объявление
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