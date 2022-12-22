import * as React from "react";
import styled from "styled-components"
import {useNavigate, useParams} from "react-router-dom";
import {productCategoryAPI} from "../../../services/ProductCategoryService";
import {AdminRouteNames} from "../../../Router";
import {ImageField} from "../../../components/Admin/components/ImageField";
import {TextField} from "../../../components/Admin/components/TextField";
import {ToolbarBlock, LinkButton, ShowContainer, DeleteButton} from "../../../components/Admin/TablesStyledBlocks";
import {DataError} from "../../../components/Admin/DataError";

export const ProductCategoryShow = () => {

    const navigate = useNavigate();
    const {id} = useParams()
    const [deleteProductCategory] = productCategoryAPI.useProductCategoryDeleteMutation()
    const {data, isLoading} = productCategoryAPI.useProductCategoryShowQuery(id, {refetchOnFocus: true})

    async function deleteProductCategoryHandler() {
        const res = await deleteProductCategory(id)
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

    if (!data && !isLoading)
        return <DataError/>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_PRODUCT_CATEGORY}
                >
                    Список категорий
                </LinkButton>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/edit/${id}`}
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