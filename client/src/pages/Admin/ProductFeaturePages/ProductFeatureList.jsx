import * as React from "react";
import {productFeatureAPI} from "../../../services/ProductFeatureService";
import {AdminRouteNames} from "../../../Router";
import {DataGrid} from "../../../components/Admin/components/Datagrid";
import {TextField} from "../../../components/Admin/components/TextField";
import {ToolbarBlock, LinkButton, ListContainer} from "../../../components/Admin/TablesStyledBlocks";


export const ProductFeatureList = () => {

    return (
        <ListContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/new`}
                >
                    Добавить характеристику товара
                </LinkButton>
            </ToolbarBlock>
            <DataGrid getData={productFeatureAPI.useProductFeatureListQuery} idName={'product_feature_id'}>
                <TextField source={'product_feature_id'} name={'id'} sortable={true}/>
                <TextField source={'product_feature_name'} name={'Название'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}