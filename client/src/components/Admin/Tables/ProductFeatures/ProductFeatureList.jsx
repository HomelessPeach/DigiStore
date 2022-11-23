import * as React from "react";
import styled from "styled-components"
import {productFeatureAPI} from "../../../../services/ProductFeatureService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const ProductFeatureList = () => {

    return (
        <ProductListContainer>
            <DataGrid getData={productFeatureAPI.useProductFeatureListQuery} idName={'product_feature_id'}>
                <TextField source={'product_feature_id'} name={'id'} sortable={true}/>
                <TextField source={'product_feature_name'} name={'Название'} sortable={true}/>
            </DataGrid>
        </ProductListContainer>
    )
}

const ProductListContainer = styled.div`

`