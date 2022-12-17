import * as React from "react";
import styled from "styled-components"
import {useLocation, useNavigate} from "react-router-dom";
import {productCategoryAPI} from "../../../../services/ProductCategoryService";
import {AdminRouteNames} from "../../../../Router";
import {ImageField} from "../../components/ImageField";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, ShowContainer, DeleteButton} from "../TablesStyledBlocks";

export const ProductCategoryShow = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const productCategoryId = pathname.replace(`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/`, '')
    const [deleteProductCategory] = productCategoryAPI.useProductCategoryDeleteMutation()
    const {data, isLoading} = productCategoryAPI.useProductCategoryShowQuery(productCategoryId, {refetchOnFocus: true})

    async function deleteProductCategoryHandler() {
        const res = await deleteProductCategory(productCategoryId)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
        if (res) {
            navigate(AdminRouteNames.ADMIN_PRODUCT_CATEGORY)
        }
    }

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_PRODUCT_CATEGORY}
                >
                    Список категорий
                </LinkButton>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/edit/${productCategoryId}`}
                >
                    Изменить данные
                </LinkButton>
                <DeleteButton onClick={deleteProductCategoryHandler}>
                    Удалить категорию
                </DeleteButton>
            </ToolbarBlock>
            <ShowBlock>
                <TextField value={data.product_category_id} label={'id'}/>
                <ImageField
                        value={data?.image?.image_path}
                        size={{h: "400px", w: "300px", br: '10px'}}
                        label={'Изображение'}
                    />
                <TextField value={data.product_category_name} label={'Название'}/>
            </ShowBlock>
        </ShowContainer>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 60px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
  align-items: stretch
`