import * as React from "react";
import {feedbackAPI} from "../../../services/FeedbackService";
import {DataGrid} from "../../../components/Admin/components/Datagrid";
import {TextField} from "../../../components/Admin/components/TextField";
import {BoolField} from "../../../components/Admin/components/BoolField";
import {EmailField} from "../../../components/Admin/components/EmailField";
import {EmptyToolbarBlock, ListContainer} from "../../../components/Admin/TablesStyledBlocks";

export const FeedbackList = () => {

    return (
        <ListContainer>
            <EmptyToolbarBlock/>
            <DataGrid getData={feedbackAPI.useFeedbackListQuery} idName={'feedback_id'}>
                <TextField source={'feedback_id'} name={'id'} sortable={true}/>
                <EmailField source={'feedback_email'} name={'e-mail'} sortable={true}/>
                <BoolField source={'is_answer'} name={'Отвечено'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}