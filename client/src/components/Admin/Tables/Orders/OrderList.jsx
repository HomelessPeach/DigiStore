import * as React from "react";
import styled from "styled-components"
import {orderAPI} from "../../../../services/OrderService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const OrderList = () => {

    return (
        <ProductListContainer>
            <DataGrid getData={orderAPI.useOrderListQuery} idName={'order_id'}>
                <TextField source={'order_id'} name={'id'} sortable={true}/>
                <TextField source={'order_number'} name={'Номер'} sortable={true}/>
                <TextField source={'fk_user'} name={'Пользователь'} sortable={true}/>
                <TextField source={'is_complete'} name={'Выполнен'} sortable={true}/>
            </DataGrid>
        </ProductListContainer>
    )
}

const ProductListContainer = styled.div`

`