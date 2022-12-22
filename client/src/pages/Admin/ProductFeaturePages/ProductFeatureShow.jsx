import * as React from "react";
import styled from "styled-components"
import {useNavigate, useParams} from "react-router-dom";
import {productFeatureAPI} from "../../../services/ProductFeatureService";
import {AdminRouteNames} from "../../../Router";
import {TextField} from "../../../components/Admin/components/TextField";
import {DeleteButton, LinkButton, ShowContainer, ToolbarBlock} from "../../../components/Admin/TablesStyledBlocks";
import {DataError} from "../../../components/Admin/DataError";

export const ProductFeatureShow = () => {

    const navigate = useNavigate();
    const {id} = useParams()
    const [deleteProductFeature] = productFeatureAPI.useProductFeatureDeleteMutation()
    const {data, isLoading} = productFeatureAPI.useProductFeatureShowQuery(id, {refetchOnFocus: true})

    async function deleteProductFeatureHandler() {
        const res = await deleteProductFeature(id)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
        if (res) {
            navigate(AdminRouteNames.ADMIN_PRODUCT_FEATURE)
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
                    to={AdminRouteNames.ADMIN_PRODUCT_FEATURE}
                >
                    Список характеристик
                </LinkButton>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/edit/${id}`}
                >
                    Изменить данные
                </LinkButton>
                <DeleteButton onClick={deleteProductFeatureHandler}>
                    Удалить характеристику
                </DeleteButton>
            </ToolbarBlock>
            <ShowBlock>
                <TextField value={data.product_feature_id} label={'id'}/>
                <TextField value={data.product_feature_name} label={'Название'}/>
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