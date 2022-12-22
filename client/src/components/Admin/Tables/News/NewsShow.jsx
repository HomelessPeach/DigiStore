import * as React from "react";
import styled from "styled-components"
import {newsAPI} from "../../../../services/NewsService";
import {useLocation, useNavigate} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ImageField} from "../../components/ImageField";
import {BoolField} from "../../components/BoolField";
import {ReachTextField} from "../../components/ReachTextField";
import {ToolbarBlock, LinkButton, DeleteButton, ShowContainer} from "../TablesStyledBlocks";
import {NotThatWay} from "../../NotThatWay";

export const NewsShow = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const newsId = pathname.replace(`${AdminRouteNames.ADMIN_NEWS}/`, '')
    const [deleteNews] = newsAPI.useNewsDeleteMutation()
    const {data, isLoading} = newsAPI.useNewsShowQuery(newsId, {refetchOnFocus: true})

    async function deleteNewsHandler() {
        const res = await deleteNews(newsId)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
        if (res) {
            navigate(AdminRouteNames.ADMIN_NEWS)
        }
    }

    if (isLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <NotThatWay/>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_NEWS}
                >
                    Список новостей
                </LinkButton>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_NEWS}/edit/${newsId}`}
                >
                    Изменить данные
                </LinkButton>
                <DeleteButton onClick={deleteNewsHandler}>
                    Удалить новость
                </DeleteButton>
            </ToolbarBlock>
            <ShowBlock>
                <TextField
                    value={data.news_id}
                    label={'id'}
                />
                <ImageField
                    value={data?.image?.image_path}
                    size={{h: "440px", w: "960px", br: '10px'}}
                    label={'Изображение'}
                />
                <DoubleFieldBlock>
                    <LeftFieldBlock>
                        <TextField value={data.news_name} label={'Название'}/>
                    </LeftFieldBlock>
                    <RightFieldBlock>
                        <BoolField value={data.is_publish} label={'Опубликовано'}/>
                    </RightFieldBlock>
                </DoubleFieldBlock>
                <TextField value={data.news_short_description} label={'Краткое описание'}/>
                <ReachTextField value={data.news_description} label={'Описание'}/>
            </ShowBlock>
        </ShowContainer>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 40px 60px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
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