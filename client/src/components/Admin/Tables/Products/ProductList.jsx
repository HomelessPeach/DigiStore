import * as React from "react";
import styled from "styled-components"
import {productAPI} from "../../../../services/ProductService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const ProductsList = () => {

    return (
        <ProductListContainer>
            <DataGrid getData={productAPI.useProductrListQuery} idName={'product_id'}>
                <TextField source={'product_id'} name={'id'} sortable={true}/>
                <TextField source={'product_name'} name={'Название'} sortable={true}/>
                <TextField source={'product_rating'} name={'Рейтинг'} sortable={true}/>
            </DataGrid>
        </ProductListContainer>
    )
}

const ProductListContainer = styled.div`

`