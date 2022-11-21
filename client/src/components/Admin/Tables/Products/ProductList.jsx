import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const ProductsList = () => {

    return (
        <ProductListContainer>
            <DataGrid data={userAPI.useUserListQuery()} idName={'product_id'}>
                <TextField source={'user_id'} name={'id'}/>
                <TextField source={'user_email'} name={'e-mail'}/>
                <TextField source={'user_password'} name={'Пароль'}/>
                <TextField source={'user_name'} name={'Имя'}/>
                <TextField source={'user_phone_number'} name={'Номер телефона'}/>
            </DataGrid>
        </ProductListContainer>
    )
}

const ProductListContainer = styled.div`

`