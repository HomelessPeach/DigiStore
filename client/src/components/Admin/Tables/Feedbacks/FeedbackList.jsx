import * as React from "react";
import {feedbackAPI} from "../../../../services/FeedbackService";
import {DataGrid} from "../../components/Datagrid";
import {TextField} from "../../components/TextField";
import {BoolField} from "../../components/BoolField";
import {EmailField} from "../../components/EmailField";
import {ListContainer} from "../TablesStyledBlocks";

export const FeedbackList = () => {

    return (
        <ListContainer>
            <DataGrid getData={feedbackAPI.useFeedbackListQuery} idName={'feedback_id'}>
                <TextField source={'feedback_id'} name={'id'} sortable={true}/>
                <EmailField source={'feedback_email'} name={'e-mail'} sortable={true}/>
                <BoolField source={'is_answer'} name={'Отвечено'} sortable={true}/>
            </DataGrid>
        </ListContainer>
    )
}