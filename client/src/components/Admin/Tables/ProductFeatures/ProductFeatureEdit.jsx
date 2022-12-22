import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {productFeatureAPI} from "../../../../services/ProductFeatureService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {Button, DeleteButton, EditContainer, EditToolbarBlock, LinkButton, ToolbarBlock} from "../TablesStyledBlocks";import {TextField} from "../../components/TextField";
import {NotThatWay} from "../../NotThatWay";

export const ProductFeatureEdit = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const productFeatureId = pathname.replace(`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/edit/`, '')
    const [deleteProductFeature] = productFeatureAPI.useProductFeatureDeleteMutation()
    const [updateProductFeature] = productFeatureAPI.useProductFeatureUpdateMutation()
    const {data, isLoading} = productFeatureAPI.useProductFeatureShowQuery(productFeatureId, {refetchOnFocus: true})
    const [productFeatureData, setProductFeatureData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        product_feature_name: (name) => name?.length > 0,
        checkValidate: () => validation.product_feature_name(productFeatureData.product_feature_name)
    }

    useEffect(() => {
        if (data)
            setProductFeatureData(data)
    }, [data])

    async function updateProductFeatureHandler() {
        if (validation.checkValidate()) {
            const res = await updateProductFeature(productFeatureData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}/${productFeatureId}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

    async function deleteProductFeatureHandler() {
        const res = await deleteProductFeature(productFeatureId)
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
        return <NotThatWay/>

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT_FEATURE}`}
                >
                    Список характеристик
                </LinkButton>
                <DeleteButton onClick={deleteProductFeatureHandler}>
                    Удалить характеристику
                </DeleteButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <TextField
                        value={productFeatureData.product_feature_id}
                        label={'id'}
                    />
                    <TextInputBlock>
                        <TextInput
                            value={productFeatureData.product_feature_name}
                            onChange={(value) => setProductFeatureData({...productFeatureData, product_feature_name: value})}
                            validation={{
                                validate: validation.product_feature_name,
                                validationError: isNotValid,
                                validationMessage: 'Характеристика обязательно должна иметь название.'
                            }}
                            label={'Название'}
                        />
                    </TextInputBlock>
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={updateProductFeatureHandler}>
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

const TextInputBlock = styled.div`
  width: 40%;
  min-width: 300px;
`

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px 40px
`