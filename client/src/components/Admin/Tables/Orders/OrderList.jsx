import * as React from "react";
import {orderAPI} from "../../../../services/OrderService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";
import {ListContainer} from "../../TableStyledBlock";

export const OrderList = () => {

    return (
        <ListContainer>
            <DataGrid getData={orderAPI.useOrderListQuery} idName={'order_id'}>
                <TextField source={'order_id'} name={'id'} sortable={true}/>
                <TextField source={'order_number'} name={'Номер'} sortable={true}/>
                <TextField source={'fk_user'} name={'Пользователь'} sortable={true}/>
                <TextField source={'is_complete'} name={'Выполнен'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}