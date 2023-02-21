import * as React from "react";
import {orderAPI} from "../../../services/OrderService";
import {AdminRouteNames} from "../../../Router";
import {DataGrid} from "../../../components/Admin/components/Datagrid";
import {TextField} from "../../../components/Admin/components/TextField";
import {EmptyToolbarBlock, ListContainer} from "../../../components/Admin/TablesStyledBlocks";
import {BoolField} from "../../../components/Admin/components/BoolField";
import {PhoneNumberField} from "../../../components/Admin/components/PhoneNumberField";
import {UncertainLink} from "../../../components/Admin/components/UncertainLink";

export const OrderList = () => {

    return (
        <ListContainer>
            <EmptyToolbarBlock/>
            <DataGrid getData={orderAPI.useOrderListQuery} idName={'order_id'}>
                <TextField source={'order_id'} name={'id'} sortable={true}/>
                <TextField source={'order_number'} name={'Номер'} sortable={true}/>
                <UncertainLink source={'client_name'} name={'Имя заказчика'} sortable={true} params={['fk_user']} link={AdminRouteNames.ADMIN_USERS}/>
                <PhoneNumberField source={'client_phone_number'} name={'Номер телефона'} sortable={true}/>
                <BoolField source={'is_complete'} name={'Выполнен'} sortable={true}/>
                <BoolField source={'is_cancel'} name={'Отменён'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}