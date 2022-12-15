import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {chatAPI} from "../../../../services/ChatService";
import {TextField} from "../../components/TextField";
import {Button} from "../TablesStyledBlocks";

export const ChatComponent = (props) => {

    const {
        chatId,
        data,
        userId
    } = props

    const [createMessage] = chatAPI.useMessageCreateMutation()
    const [message, setMessage] = useState('')

    async function sendMessage() {
        const sendMessage = message.replace(/^\s*|\s*$/g, '');
        if (sendMessage.length > 0) {
            await createMessage({
                fk_chat: chatId,
                is_user: false,
                chat_message_content: sendMessage
            })
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
        }
        setMessage('');
    }

    return(
        <ChatContainer>
            <MessageWrap>
                <MessageContainer>
                    {data.map((item) =>
                        (item.is_user == true)?
                            <UserMessageBlock>
                                <MessageBlock isUser={true}>
                                    <TextField
                                        value={item.chat_message_content}
                                    />
                                </MessageBlock>
                            </UserMessageBlock>
                            :
                            <AdminMessageBlock>
                                <MessageBlock isUser={false}>
                                    <TextField
                                        value={item.chat_message_content}
                                    />
                                </MessageBlock>
                            </AdminMessageBlock>
                    )

                    }
                </MessageContainer>
            </MessageWrap>
            {(userId)?
                <MessageInputContainer>
                    <MessageInputBlock>
                        <MessageInput
                            value={message}
                            rows={4}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                    </MessageInputBlock>
                    <ButtonBlock>
                        <Button
                            onClick={sendMessage}
                        >
                            Отправить
                        </Button>
                    </ButtonBlock>
                </MessageInputContainer>
                : null
            }
        </ChatContainer>
    )

}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0;
`

const MessageWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  height: 450px;
  overflow-y: auto;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const UserMessageBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: end;
  padding: 10px 10px 0;
`

const AdminMessageBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: end;
  padding: 10px 0;
`

const MessageBlock = styled.div`
  border: 1px solid ${({theme}) => theme.colors.tertiary};
  background-color: ${({theme, isUser}) => (isUser)? theme.colors.tertiary : '#ffffff'};
  color: ${({isUser}) => (isUser)? '#ffffff' : '#000000'};
  border-radius: ${({isUser}) => (isUser)? '15px 15px 15px 0' : '15px 15px 0 15px'};;
  max-width: 70%;
  padding: 5px 10px;
`

const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  width: 100%;
`

const MessageInputBlock = styled.div`
  width: 90%;
  padding: 10px 10px 0 10px;
`

const MessageInput = styled.textarea`
  border: 1px solid #000000;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 15px;
  line-height: 1.5;
  width: 100%;
  resize: none;
`

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  width: 10%;
`