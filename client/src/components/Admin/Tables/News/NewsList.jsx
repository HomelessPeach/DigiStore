import * as React from "react";
import styled from "styled-components"
import {newsAPI} from "../../../../services/NewsService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";

export const NewsList = () => {

    return (
        <ProductListContainer>
            <DataGrid getData={newsAPI.useNewsListQuery} idName={'news_id'}>
                <TextField source={'news_id'} name={'id'} sortable={true}/>
                <TextField source={'news_name'} name={'Название'} sortable={true}/>
            </DataGrid>
        </ProductListContainer>
    )
}

const ProductListContainer = styled.div`

`