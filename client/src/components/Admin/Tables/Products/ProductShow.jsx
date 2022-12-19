import * as React from "react";
import styled from "styled-components"
import {userAPI} from "../../../../services/UserService";
import {useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, DeleteButton, ShowContainer} from "../TablesStyledBlocks";
import {CarouselImageInput} from "../../components/CarouselImageInput";
import {Carousel} from "../../../Carousel";
import {ReferenceInputField} from "../../components/ReferenceInputField";
import {useState} from "react";

export const ProductShow = () => {

    // const {pathname} = useLocation()
    // const userId = pathname.replace(`${AdminRouteNames.ADMIN_PRODUCT}/`, '')
    // const {data, isLoading} = userAPI.useUserShowQuery(1)
    //
    // if (isLoading)
    //     return <h1>LOADING...</h1>

    const [productData, setProductData] = useState({})

    const data = [
        {
            image_path: 'https://www.meme-arsenal.com/memes/1a0d126c09ef9859f5946bde0c3a79ef.jpg'
        }, {
            image_path: 'https://abrakadabra.fun/uploads/posts/2021-12/1640388888_5-abrakadabra-fun-p-kosmos-na-rabochii-stol-telefona-5.jpg'
        },
        {
            image_path: 'https://www.meme-arsenal.com/memes/1a0d126c09ef9859f5946bde0c3a79ef.jpg'
        },
        {
            image_path: 'https://abrakadabra.fun/uploads/posts/2021-12/1640388888_5-abrakadabra-fun-p-kosmos-na-rabochii-stol-telefona-5.jpg'
        }
    ]

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_PRODUCT}
                >
                    Список пользователей
                </LinkButton>
                {/*<LinkButton*/}
                {/*    to={`${AdminRouteNames.ADMIN_USERS}/edit/${userId}`}*/}
                {/*>*/}
                {/*    Изменить данные*/}
                {/*</LinkButton>*/}
                <DeleteButton>
                    Удалить пользователя
                </DeleteButton>
            </ToolbarBlock>
            <ShowBlock>
                {/*<CarouselImageInput*/}
                {/*    label={'Изображения'}*/}
                {/*/>*/}

                <Carousel>
                    {data.map((item, index) => <img src={item.image_path} alt={''}/>)}
                </Carousel>

                <ReferenceInputField
                    value={productData.fk_user}
                    searchFunc={userAPI.useGetUsersDataMutation}
                    idName={'user_id'}
                    onChange={(value) => setProductData({...productData, fk_user: value})}
                    searchFieldName={'user_name'}
                    label={'User'}
                />
            </ShowBlock>
        </ShowContainer>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const Img = styled.img`
  height: inherit;
  width: inherit;
  border-radius: inherit;
`