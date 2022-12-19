import * as React from "react";
import styled from "styled-components"
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {userAPI} from "../../../../services/UserService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {ImageInput} from "../../components/ImageInput";
import {BoolInput} from "../../components/BoolInput";
import {PhoneNumberInput} from "../../components/PhoneNumberInput";
import {PasswordInput} from "../../components/PasswordInput";
import {emailValidate, passwordHook, passwordValidate, userNameValidate} from "../../../../utils";
import {ToolbarBlock, LinkButton, EditContainer, EditToolbarBlock, Button} from "../TablesStyledBlocks";

export const UserCreate = () => {

    const navigate = useNavigate();
    const [createUser] = userAPI.useUserCreateMutation()
    const [userData, setUserData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        user_email: (email) => email && emailValidate(email),
        user_password: (password) => password && passwordValidate(password),
        user_phone_number: (phoneNumber) => {
            return phoneNumber?.length === 10
        },
        user_name: (name) => name && userNameValidate(name),
        checkValidate: () =>
            validation.user_email(userData.user_email) &&
            validation.user_password(userData.user_password) &&
            validation.user_phone_number(userData.user_phone_number) &&
            validation.user_name(userData.user_name)
    }

    async function createUserHandler() {
        console.log(userData)
        // if (validation.checkValidate()) {
        //     const res = await createUser({...userData, user_password: await passwordHook(userData.user_password)})
        //         .unwrap()
        //         .catch((err) => {
        //             console.log(err)
        //         })
        //     if (res) {
        //         navigate(`${AdminRouteNames.ADMIN_USERS}/${res.user_id}`)
        //     }
        // } else {
        //     setIsNotValid(true)
        // }
    }

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_USERS}
                >
                    Список пользователей
                </LinkButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <LeftBlock>
                        <ImageInput
                            value={userData.image?.new_image || ''}
                            size={{h: "300px", w: "300px", br: '250px'}}
                            onChange={(value) => (value)?
                                setUserData({...userData, image: {...userData.image, new_image: value}})
                                :null}
                            label={'Аватар'}
                        />
                    </LeftBlock>
                    <RightBlock>
                        <EditDataBlock>
                            <EditDataChildBlock>
                                <TextInput
                                    value={userData.user_email}
                                    onChange={(value) => setUserData({...userData, user_email: value})}
                                    validation={{
                                        validate: validation.user_email,
                                        validationError: isNotValid,
                                        validationMessage: 'Некорректный e-mail'
                                    }}
                                    label={'e-mail'}
                                />
                                <PasswordInput
                                    value={userData.user_password}
                                    onChange={(value) => setUserData({...userData, user_password: value})}
                                    validation={{
                                        validate: validation.user_password,
                                        validationError: isNotValid,
                                        validationMessage: 'Некорректный пароль. Пароль должен состоять из букв латинского алфавит (минимум 1), арабских цифр (минимум 1), длиной от 5 до 25 символов. Допускается содержание специальных символов: ' +
                                            '"!", "@", "#", "$", "%", "^", "&", "*", ":", "(", ")", ".", ";", "<", ">", "\'", """, "{", "}", "[", "]", "?", "\\", "/", "|", "-", "_", "~".'
                                    }}
                                    label={'Пароль'}
                                />
                            </EditDataChildBlock>
                            <EditDataChildBlock>
                                <TextInput
                                    value={userData.user_name}
                                    onChange={(value) => setUserData({...userData, user_name: value})}
                                    validation={{
                                        validate: validation.user_name,
                                        validationError: isNotValid,
                                        validationMessage: 'Некорректное имя пользователя. Имя пользователя должно состоять из букв латинского или русского алфавита (минимум 2 буквы), допускается наличие арабских цифр, а так же специальных символов: ' +
                                            '"#", "*", "(", ")", ":", "_", "-", ".". Запрещается использование подряд идущих пробелов. Максимальная длина – 30 символов.'
                                    }}
                                    label={'Имя'}
                                />
                                <PhoneNumberInput
                                    value={userData.user_phone_number}
                                    onChange={(value) => setUserData({...userData, user_phone_number: value})}
                                    validation={{
                                        validate: validation.user_phone_number,
                                        validationError: isNotValid,
                                        validationMessage: 'Номер телефона введён не корректно. Заполнены не все поля.'
                                    }}
                                    label={'Номер телефона'}
                                />
                                <BoolInput
                                    value={userData.is_admin}
                                    onChange={(value) => setUserData({...userData, is_admin: value})}
                                    label={'Права администратора'}
                                />
                            </EditDataChildBlock>
                        </EditDataBlock>
                    </RightBlock>
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={createUserHandler}>
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
  flex-direction: row;
  align-items: stretch
`

const LeftBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 60px;
`

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px 60px;
  width: 100%;
`


const EditDataBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const EditDataChildBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 47%;
`