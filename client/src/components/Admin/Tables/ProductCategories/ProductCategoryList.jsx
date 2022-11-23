import * as React from "react";
import {productCategoryAPI} from "../../../../services/ProductCategoryService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, ListContainer} from "../../TableStyledBlock";


export const ProductCategoryList = () => {

    return (
        <ListContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/new`}
                >
                    Добавить категорию товара
                </LinkButton>
            </ToolbarBlock>
            <DataGrid getData={productCategoryAPI.useProductCategoryListQuery} idName={'product_category_id'}>
                <TextField source={'product_category_id'} name={'id'} sortable={true}/>
                <TextField source={'product_category_name'} name={'Название'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}