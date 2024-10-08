import * as React from "react";
import styled from "styled-components"
import {useParams} from "react-router-dom";
import {userAPI} from "../../../services/UserService";
import {chatAPI} from "../../../services/ChatService";
import {AdminRouteNames} from "../../../Router";
import {TextField} from "../../../components/Admin/components/TextField";
import {BoolField} from "../../../components/Admin/components/BoolField";
import {ReferenceField} from "../../../components/Admin/components/ReferenceField";
import {ChatComponent} from "../../../components/Admin/ChatComponent";
import {ToolbarBlock, LinkButton, ShowContainer} from "../../../components/Admin/TablesStyledBlocks";
import {DataError} from "../../../components/Admin/DataError";



export const ChatShow = () => {

    const {id} = useParams()
    const {data, isLoading} = chatAPI.useChatShowQuery(id, {refetchOnFocus: true})

    if (isLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <DataError/>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_CHAT}
                >
                    Список чатов
                </LinkButton>
            </ToolbarBlock>
            <ShowBlock>
                <ShowContent>
                    <TextField value={data.chat_id} label={'id'}/>
                    <DoubleFieldBlock>
                        <LeftFieldBlock>
                            <ReferenceField value={data.fk_user} label={'Пользователь'}
                                            searchFunc={userAPI.useGetUserDataMutation}
                                            searchFieldName={'user_name'}
                                            link={AdminRouteNames.ADMIN_USERS}
                            />
                        </LeftFieldBlock>
                        <RightFieldBlock>
                            <BoolField value={data.is_answer} label={'Отвечено'}/>
                        </RightFieldBlock>
                    </DoubleFieldBlock>
                    <ChatComponent chatId={data.chat_id} data={data.chat_messages} userId={data.fk_user}/>
                </ShowContent>
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
  padding: 40px 50px 40px;
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