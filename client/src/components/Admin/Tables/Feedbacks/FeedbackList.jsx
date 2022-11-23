import * as React from "react";
import {feedbackAPI} from "../../../../services/FeedbackService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";
import {ListContainer} from "../../TableStyledBlock";

export const FeedbackList = () => {

    return (
        <ListContainer>
            <DataGrid getData={feedbackAPI.useFeedbackListQuery} idName={'feedback_id'}>
                <TextField source={'feedback_id'} name={'id'} sortable={true}/>
                <TextField source={'feedback_email'} name={'e-mail'} sortable={true}/>
                <TextField source={'is_answer'} name={'Отвечено'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}