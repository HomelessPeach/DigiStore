import * as React from "react";
import styled from "styled-components"
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {newsAPI} from "../../../../services/NewsService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {ImageInput} from "../../components/ImageInput";
import {ToolbarBlock, LinkButton, EditContainer, Button, EditToolbarBlock, DeleteButton} from "../TablesStyledBlocks";
import {BoolInput} from "../../components/BoolInput";
import {ReachTextInput} from "../../components/ReachTextInput";
import {TextField} from "../../components/TextField";

export const NewsEdit = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const newsId = pathname.replace(`${AdminRouteNames.ADMIN_NEWS}/edit/`, '')
    const [deleteNews] = newsAPI.useNewsDeleteMutation()
    const [updateNews] = newsAPI.useNewsUpdateMutation()
    const {data, isLoading} = newsAPI.useNewsShowQuery(newsId, {refetchOnFocus: true})
    const [newsData, setNewsData] = useState(data || {})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        news_name: (name) => name?.length > 0,
        news_short_description: (shortDescription) => shortDescription?.length > 0,
        news_description: (description) => description?.length > 0,
        checkValidate: () =>
            validation.news_name(newsData.news_name) &&
            validation.news_short_description(newsData.news_short_description) &&
            validation.news_description(newsData.news_description)
    }

    useEffect(() => {
        if (data)
            setNewsData(data)
    }, [data])

    async function updateNewsHandler() {
        if (validation.checkValidate()) {
            const res = await updateNews(newsData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`${AdminRouteNames.ADMIN_NEWS}/${newsId}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

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

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_NEWS}
                >
                    Список новостей
                </LinkButton>
                <DeleteButton onClick={deleteNewsHandler}>
                    Удалить новость
                </DeleteButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <TextField
                        value={data.news_id}
                        label={'id'}
                    />
                    <ImageInput
                        value={newsData.image?.new_image || newsData.image?.image_path || ''}
                        size={{h: "440px", w: "960px", br: '10px'}}
                        onChange={(value) => (value)?
                            setNewsData({...newsData, image: {...newsData.image, new_image: value}})
                            :null}
                        label={'Изображение'}
                    />
                    <DoubleFieldBlock>
                        <LeftFieldBlock>
                            <TextInput
                                value={newsData.news_name}
                                onChange={(value) => setNewsData({...newsData, news_name: value})}
                                validation={{
                                    validate: validation.news_name,
                                    validationError: isNotValid,
                                    validationMessage: 'Новость обязательно должна иметь название.'
                                }}
                                label={'Название'}
                            />
                        </LeftFieldBlock>
                        <RightFieldBlock>
                            <BoolInput
                                value={newsData.is_publish}
                                onChange={(value) => setNewsData({...newsData, is_publish: value})}
                                label={'Опубликовано'}
                            />
                        </RightFieldBlock>
                    </DoubleFieldBlock>
                    <TextInput
                        value={newsData.news_short_description}
                        onChange={(value) => setNewsData({...newsData, news_short_description: value})}
                        validation={{
                            validate: validation.news_short_description,
                            validationError: isNotValid,
                            validationMessage: 'Новость обязательно должна иметь краткое описание.'
                        }}
                        multiply={true}
                        label={'Краткое описание'}
                    />
                    <ReachTextInput
                        value={newsData.news_description}
                        onChange={(value) => setNewsData({...newsData, news_description: value})}
                        validation={{
                            validate: validation.news_description,
                            validationError: isNotValid,
                            validationMessage: 'Новость обязательно должна иметь описание.'
                        }}
                        label={'Описание'}
                    />
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={updateNewsHandler}>
                        Сохранить
                    </Button>
                </EditToolbarBlock>
            </EditBlock>
        </EditContainer>
    )

}

const EditBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px 40px
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