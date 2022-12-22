import * as React from "react";
import {orderAPI} from "../../../services/OrderService";
import {DataGrid} from "../../../components/Admin/components/Datagrid";
import {TextField} from "../../../components/Admin/components/TextField";
import {EmptyToolbarBlock, ListContainer} from "../../../components/Admin/TablesStyledBlocks";

export const OrderList = () => {

    return (
        <ListContainer>
            <EmptyToolbarBlock/>
            <DataGrid getData={orderAPI.useOrderListQuery} idName={'order_id'}>
                <TextField source={'order_id'} name={'id'} sortable={true}/>
                <TextField source={'order_number'} name={'Номер'} sortable={true}/>
                <TextField source={'fk_user'} name={'Пользователь'} sortable={true}/>
                <TextField source={'is_complete'} name={'Выполнен'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}