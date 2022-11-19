import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {DataGrid} from "../../components/DataGrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const ProductsList = () => {

    const {data, isLoading} = userAPI.useUserListQuery()

    if (isLoading)
        return <h1>LOADING...</h1>


    const headerFields = [
        { field: 'user_id', name: 'id'},
        { field: 'user_email', name: 'e-mail'},
        { field: 'user_password', name: 'Пароль'},
        { field: 'user_name', name: 'Имя'},
        { field: 'user_phone_number', name: 'Номер телефона'},
        // { field: 'fk_image', headerName: 'Аватар'},
    ];

    return (
        <ProductListContainer>
            <DataGrid data={data} idName={'product_id'}>
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