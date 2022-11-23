import * as React from "react";
import styled from "styled-components"
import {feedbackAPI} from "../../../../services/FeedbackService";
import {DataGrid} from "../../components/Datagrid";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";

export const FeedbackList = () => {

    return (
        <ProductListContainer>
            <DataGrid getData={feedbackAPI.useFeedbackListQuery} idName={'feedback_id'}>
                <TextField source={'feedback_id'} name={'id'} sortable={true}/>
                <TextField source={'feedback_email'} name={'e-mail'} sortable={true}/>
                <TextField source={'is_answer'} name={'Отвечено'} sortable={true}/>
            </DataGrid>
        </ProductListContainer>
    )
}

const ProductListContainer = styled.div`

`