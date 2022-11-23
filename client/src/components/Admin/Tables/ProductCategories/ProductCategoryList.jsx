import * as React from "react";
import styled from "styled-components"
import {productCategoryAPI} from "../../../../services/ProductCategoryService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const ProductCategoryList = () => {

    return (
        <ProductListContainer>
            <DataGrid getData={productCategoryAPI.useProductCategoryListQuery} idName={'product_category_id'}>
                <TextField source={'product_category_id'} name={'id'} sortable={true}/>
                <TextField source={'product_category_name'} name={'Название'} sortable={true}/>
            </DataGrid>
        </ProductListContainer>
    )
}

const ProductListContainer = styled.div`

`