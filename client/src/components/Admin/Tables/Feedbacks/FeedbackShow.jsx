import * as React from "react";
import styled from "styled-components"
import {useLocation} from "react-router-dom";
import {feedbackAPI} from "../../../../services/FeedbackService";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {BoolField} from "../../components/BoolField";
import {EmailField} from "../../components/EmailField";
import {ToolbarBlock, LinkButton, ShowContainer, EditToolbarBlock, Button} from "../TablesStyledBlocks";
import {NotThatWay} from "../../NotThatWay";

export const FeedbackShow = () => {

    const {pathname} = useLocation()
    const feedbackId = pathname.replace(`${AdminRouteNames.ADMIN_FEEDBACK}/`, '')
    const [feedbackMarkAsAnswered] = feedbackAPI.useFeedbackMarkAsAnsweredMutation()
    const {data, isLoading} = feedbackAPI.useFeedbackShowQuery(feedbackId, {refetchOnFocus: true})

    async function markAsAnswered() {
        await feedbackMarkAsAnswered(feedbackId)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

    if (isLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <NotThatWay/>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_FEEDBACK}
                >
                    Список обращений
                </LinkButton>
            </ToolbarBlock>
            <ShowBlock>
                <ShowContent isToolbar={data.is_answer == false}>
                    <TextField value={data.feedback_id} label={'id'}/>
                    <DoubleFieldBlock>
                        <LeftFieldBlock>
                            <EmailField value={data.feedback_email} label={'e-mail'}/>
                        </LeftFieldBlock>
                        <RightFieldBlock>
                            <BoolField value={data.is_answer} label={'Отвечено'}/>
                        </RightFieldBlock>
                    </DoubleFieldBlock>
                    <TextField value={data.feedback_message} label={'Обращение'}/>
                </ShowContent>
                {(data.is_answer == false)?
                    <EditToolbarBlock>
                        <Button
                            onClick={markAsAnswered}
                            width={150}
                            height={50}
                        >
                            Пометить как отвеченное
                        </Button>
                    </EditToolbarBlock>
                    : null
                }
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
  padding: 40px 50px ${({isToolbar}) => (isToolbar)? 10 : 40}px;
`

const DoubleFieldBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const LeftFieldBlock = styled.div`
  width: 50%;
  padding-right: 100px;
`

const RightFieldBlock = styled.div`
  width: 50%;
  padding-left: 100px;
`