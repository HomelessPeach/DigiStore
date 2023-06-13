import * as React from "react";
import styled from "styled-components";
import {feedbackAPI} from "../../services/FeedbackService";
import {TextInput} from "../../components/TextInput";
import {useState} from "react";
import {TextArea} from "../../components/TextArea";
import {Button} from "../../components/Admin/TablesStyledBlocks";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../Router";
import {useSelector} from "react-redux";
import {useResponsive} from "../../hook/responsive";

export const Feedback = () => {

    const {smallMobile} = useResponsive()
    const navigate = useNavigate();
    const {data: user} = useSelector(state => state.user)
    const [feedbackData, setFeedbackData] = useState({feedback_email: user?.email || '', feedback_message: ''})

    const [createFeedback] = feedbackAPI.useFeedbackCreateMutation()

    function onClick() {
        if (feedbackData.feedback_email && feedbackData.feedback_message) {
            createFeedback(feedbackData)
            navigate(RouteNames.HOME)
        }

    }

    return (
        <FeedbackPage>
            <CreateFeedbackContainer>
                <Title>Обратная связь</Title>
                <TextInput
                    value={feedbackData?.feedback_email}
                    onChange={(value) => setFeedbackData({...feedbackData, feedback_email: value})}
                    label={'e-mail'}
                    w={(smallMobile)? '100%' : '50%'}
                />
                <TextArea
                    value={feedbackData?.feedback_message}
                    onChange={(value) => setFeedbackData({...feedbackData, feedback_message: value})}
                    label={'Сообщение'}
                    rows={20}
                    w={'100%'}
                />
                <Toolbar>
                    <Button
                        onClick={onClick}
                    >
                        Отправить
                    </Button>
                </Toolbar>
            </CreateFeedbackContainer>
        </FeedbackPage>
    )
}

const FeedbackPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20%;
  @media (${({theme}) => theme.media.large}) {
    padding: 0;
  }
`

const CreateFeedbackContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
  box-shadow: 0 0 10px 0 #808080;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 50px;
`

const Title = styled.div`
  font-size: 35px;
  padding: 0 10px 20px;
  @media (${({theme}) => theme.media.small}) {
    font-size: 27px;
  }
`

const Toolbar = styled.div`
  display: flex;
  justify-content: right;
  padding: 20px 13px;
`