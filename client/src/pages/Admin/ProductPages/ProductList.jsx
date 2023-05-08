import * as React from "react";
import {productAPI} from "../../../services/ProductService";
import {AdminRouteNames} from "../../../Router";
import {DataGrid} from "../../../components/Admin/components/Datagrid";
import {TextField} from "../../../components/Admin/components/TextField";
import {BoolField} from "../../../components/Admin/components/BoolField";
import {ToolbarBlock, LinkButton, ListContainer} from "../../../components/Admin/TablesStyledBlocks";
import {RatingField} from "../../../components/Admin/components/RatingField";

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
            <DataGrid getData={productAPI.useProductListQuery} idName={'product_id'}>
                <TextField source={'product_id'} name={'id'} sortable={true}/>
                <TextField source={'product_name'} name={'Название'} sortable={true}/>
                <RatingField source={'product_rating'} name={'Рейтинг'} sortable={true}/>
                <BoolField source={'is_publish'} name={'Опубликован'} sortable={true}/>
                <TextField source={'in_stock'} name={'В наличии'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}