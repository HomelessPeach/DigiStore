import * as React from "react";
import {productAPI} from "../../../../services/ProductService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, ListContainer} from "../../TableStyledBlock";

export const ProductsList = () => {

    return (
        <ListContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT}/new`}
                >
                    Добавить товар
                </LinkButton>
            </ToolbarBlock>
            <DataGrid getData={productAPI.useProductrListQuery} idName={'product_id'}>
                <TextField source={'product_id'} name={'id'} sortable={true}/>
                <TextField source={'product_name'} name={'Название'} sortable={true}/>
                <TextField source={'product_rating'} name={'Рейтинг'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}