import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {productCategoryAPI} from "../../../services/ProductCategoryService";
import {AdminRouteNames} from "../../../Router";
import {TextInput} from "../../../components/Admin/components/TextInput";
import {ImageInput} from "../../../components/Admin/components/ImageInput";
import {ToolbarBlock, LinkButton, DeleteButton, EditContainer, EditToolbarBlock, Button} from "../../../components/Admin/TablesStyledBlocks";
import {DataError} from "../../../components/Admin/DataError";

export const ProductCategoryEdit = () => {

    const navigate = useNavigate();
    const {id} = useParams()
    const [deleteProductCategory] = productCategoryAPI.useProductCategoryDeleteMutation()
    const [updateProductCategory] = productCategoryAPI.useProductCategoryUpdateMutation()
    const {data, isLoading} = productCategoryAPI.useProductCategoryShowQuery(id, {refetchOnFocus: true})
    const [productCategoryData, setProductCategoryData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        product_category_name: (name) => name?.length > 0,
        checkValidate: () =>
            validation.product_category_name(productCategoryData.product_category_name)
    }

    useEffect(() => {
        if (data)
            setProductCategoryData(data)
    }, [data])

    async function updateProductFeatureHandler() {
        if (validation.checkValidate()) {
            const res = await updateProductCategory(productCategoryData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}/${id}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

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
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT_CATEGORY}`}
                >
                    Список категорий
                </LinkButton>
                <DeleteButton onClick={deleteProductCategoryHandler}>
                    Удалить категорию
                </DeleteButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <ImageInput
                        value={productCategoryData.image?.new_image || productCategoryData.image?.image_path || ''}
                        size={{h: "400px", w: "300px", br: '10px'}}
                        onChange={(value) => (value)?
                            setProductCategoryData({...productCategoryData, image: {...productCategoryData.image, new_image: value}})
                            :null}
                        label={'Изображение'}
                    />
                    <TextInputBlock>
                        <TextInput
                            value={productCategoryData.product_category_name}
                            onChange={(value) => setProductCategoryData({...productCategoryData, product_category_name: value})}
                            validation={{
                                validate: validation.product_category_name,
                                validationError: isNotValid,
                                validationMessage: 'Категория продукта обязательно должна иметь название.'
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

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px 40px
`

const TextInputBlock = styled.div`
  width: 40%;
  min-width: 300px;
`