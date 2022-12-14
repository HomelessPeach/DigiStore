import * as React from "react";
import styled from "styled-components"
import {feedbackAPI} from "../../../../services/FeedbackService";
import {useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, ShowContainer, EditToolbarBlock, Button} from "../TablesStyledBlocks";
import {BoolField} from "../../components/BoolField";
import {passwordHook} from "../../../../utils";

export const FeedbackShow = () => {

    const {pathname} = useLocation()
    const feedbackId = pathname.replace(`${AdminRouteNames.ADMIN_FEEDBACK}/`, '')
    const [feedbackMarkAsAnswered] = feedbackAPI.useFeedbackMarkAsAnsweredMutation()
    const {data, isLoading} = feedbackAPI.useFeedbackShowQuery(feedbackId)

    async function markAsAnswered() {
        await feedbackMarkAsAnswered(feedbackId)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_FEEDBACK}`}
                >
                    Список обращений
                </LinkButton>
            </ToolbarBlock>
            <ShowBlock>
                <ShowContent>
                    <TextField value={data.feedback_id} label={'id'}/>
                    <DoubleFieldBlock>
                        <FieldBlock>
                            <TextField value={data.feedback_email} label={'e-mail'}/>
                        </FieldBlock>
                        <FieldBlock>
                            <BoolField value={data.is_answer} label={'Отвечено'}/>
                        </FieldBlock>
                    </DoubleFieldBlock>
                    <TextField value={data.feedback_message} label={'Обращение'}/>
                </ShowContent>
                <EditToolbarBlock>
                    <Button
                        onClick={markAsAnswered}
                        width={150}
                        height={50}
                    >
                        Пометить как отвеченное
                    </Button>
                </EditToolbarBlock>
            </ShowBlock>
        </ShowContainer>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const ShowContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 40px 50px 10px;
`

const DoubleFieldBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const FieldBlock = styled.div`
  width: 50%;
`