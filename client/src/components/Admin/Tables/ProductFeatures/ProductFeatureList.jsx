import * as React from "react";
import {productFeatureAPI} from "../../../../services/ProductFeatureService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, ListContainer} from "../../TableStyledBlock";


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