import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {productAPI} from "../../../../services/ProductService";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, DeleteButton, ShowContainer} from "../TablesStyledBlocks";

export const ProductShow = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const productId = pathname.replace(`${AdminRouteNames.ADMIN_PRODUCT}/`, '')
    const [deleteProduct] = productAPI.useProductDeleteMutation()
    const {data, isLoading} = productAPI.useProductShowQuery(productId)

    async function deleteProductHandler() {
        const res = await deleteProduct(productId)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
        if (res) {
            navigate(AdminRouteNames.ADMIN_PRODUCT)
        }
    }

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_PRODUCT}
                >
                    Список товаров
                </LinkButton>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT}/edit/${productId}`}
                >
                    Изменить данные
                </LinkButton>
                <DeleteButton>
                    Удалить товар
                </DeleteButton>
            </ToolbarBlock>
            <ShowBlock>
                {/*<ImagesInput*/}
                {/*    label={'Изображения'}*/}
                {/*/>*/}

                {/*<Carousel>*/}
                {/*    {data.map((item, index) => <img src={item.image_path} alt={''}/>)}*/}
                {/*</Carousel>*/}

                {/*<ReferenceInputField*/}
                {/*    value={productData.fk_user}*/}
                {/*    searchFunc={userAPI.useGetUsersDataMutation}*/}
                {/*    idName={'user_id'}*/}
                {/*    onChange={(value) => setProductData({...productData, fk_user: value})}*/}
                {/*    searchFieldName={'user_name'}*/}
                {/*    label={'User'}*/}
                {/*/>*/}
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