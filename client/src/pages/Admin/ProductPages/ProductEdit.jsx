import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {productAPI} from "../../../services/ProductService";
import {productCategoryAPI} from "../../../services/ProductCategoryService";
import {productFeatureAPI} from "../../../services/ProductFeatureService";
import {AdminRouteNames} from "../../../Router";
import {TextInput} from "../../../components/Admin/components/TextInput";
import {ImagesInput} from "../../../components/Admin/components/ImagesInput";
import {ReferenceInputField} from "../../../components/Admin/components/ReferenceInputField";
import {BoolInput} from "../../../components/Admin/components/BoolInput";
import {TableInput} from "../../../components/Admin/components/TableInput";
import {ToolbarBlock, LinkButton, DeleteButton, EditContainer, EditToolbarBlock, Button} from "../../../components/Admin/TablesStyledBlocks";
import {DataError} from "../../../components/Admin/DataError";
import {RatingField} from "../../../components/Admin/components/RatingField";
import {TextField} from "../../../components/Admin/components/TextField";

export const ProductEdit = () => {

    const navigate = useNavigate();
    const {id} = useParams()
    const [deleteProduct] = productAPI.useProductDeleteMutation()
    const [updateProduct] = productAPI.useProductUpdateMutation()
    const {data, isLoading} = productAPI.useProductShowQuery(id, {refetchOnFocus: true})
    const [productData, setProductData] = useState(data || {})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        product_name: (name) => name,
        product_price: (price) => Number(price),
        fk_product_category: (productCategoryId) => productCategoryId,
        product_feature_values: (productFeatureValues) => {
            if (productFeatureValues.length === 1 && !productFeatureValues[0].fk_product_feature && !productFeatureValues[0].product_features_values_value)
                return false
            for (let item of productFeatureValues) {
                if ((!item.fk_product_feature || !item.product_features_values_value) &&
                    (item.fk_product_feature || item.product_features_values_value)) {
                    return false
                }
            }
            return true
        },
        product_description: (description) => description?.length > 0,
        checkValidate: () =>
            validation.product_name(productData.product_name) &&
            validation.fk_product_category(productData.fk_product_category) &&
            validation.product_feature_values(productData.product_feature_values) &&
            validation.product_price(productData.product_price) &&
            validation.product_description(productData.product_description)
    }

    useEffect(() => {
        if (data)
            setProductData(data)
    }, [data])

    async function updateProductHandler() {
        if (validation.checkValidate()) {
            const res = await updateProduct(productData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`${AdminRouteNames.ADMIN_PRODUCT}/${id}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

    async function deleteProductHandler() {
        const res = await deleteProduct(id)
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

    if (!data && !isLoading)
        return <DataError/>

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_PRODUCT}
                >
                    Список товаров
                </LinkButton>
                <DeleteButton onClick={deleteProductHandler}>
                    Удалить товар
                </DeleteButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <ImagesInput
                        value={productData.product_images}
                        onChange={(value) => setProductData({...productData, product_images: [...(productData.product_images)? productData.product_images: [], ...value]})}
                        label={'Изображения'}
                    />

                    <DoubleFieldBlock>
                        <LeftFieldBlock>
                            <TextInput
                                value={productData.product_name}
                                onChange={(value) => setProductData({...productData, product_name: value})}
                                validation={{
                                    validate: validation.product_name,
                                    validationError: isNotValid,
                                    validationMessage: 'Продукт обязательно должен иметь название.'
                                }}
                                label={'Название'}
                            />
                            <ReferenceInputField
                                value={productData.fk_product_category}
                                onChange={(value) => setProductData({...productData, fk_product_category: value})}
                                searchFunc={productCategoryAPI.useGetProductCategoriesDataMutation}
                                idName={'product_category_id'}
                                searchFieldName={'product_category_name'}
                                label={'Категория продукта'}
                            />
                            <TextInput
                                value={productData.product_price}
                                onChange={(value) => setProductData({...productData, product_price: value})}
                                validation={{
                                    validate: validation.product_price,
                                    validationError: isNotValid,
                                    validationMessage: 'Некорректная цена.'
                                }}
                                label={'Цена'}
                            />
                            <TextInput
                                value={data.in_stock}
                                onChange={(value) => setProductData({...productData, in_stock: value})}
                                label={'В наличии, шт.'}
                            />
                        </LeftFieldBlock>
                        <RightFieldBlock>
                            <BoolInput
                                value={productData.is_publish}
                                onChange={(value) => setProductData({...productData, is_publish: value})}
                                label={'Опубликован'}
                            />
                            <RatingField
                                value={data.product_rating}
                                label={'Рейтинг товара'}
                            />
                        </RightFieldBlock>
                    </DoubleFieldBlock>
                    <TextInput
                        value={productData.product_description}
                        onChange={(value) => setProductData({...productData, product_description: value})}
                        validation={{
                            validate: validation.product_description,
                            validationError: isNotValid,
                            validationMessage: 'Продукт обязательно должен иметь описание.'
                        }}
                        multiply={true}
                        label={'Описание'}
                    />
                    <TableInput
                        value={productData.product_feature_values}
                        onChange={(value) => setProductData({...productData, product_feature_values: [...(productData.product_feature_values)? productData.product_feature_values: [], value]})}
                        label={'Характеристики продукта'}
                    >
                        <ReferenceInputField
                            fieldName={'fk_product_feature'}
                            searchFunc={productFeatureAPI.useGetProductFeaturesDataMutation}
                            idName={'product_feature_id'}
                            searchFieldName={'product_feature_name'}
                            label={'Характеристика'}
                        />
                        <TextInput
                            fieldName={'product_features_values_value'}
                            label={'Значение'}
                        />
                    </TableInput>
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={updateProductHandler}>
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