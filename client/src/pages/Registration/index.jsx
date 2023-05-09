import * as React from "react";
import styled from "styled-components";
import {useState} from "react";
import {TextInput} from "../../components/TextInput";
import {Button} from "../../components/Admin/TablesStyledBlocks";
import {PhoneNumberInput} from "../../components/PhoneNumberInput";
import {emailValidate, passwordValidate, userNameValidate} from "../../utils";
import {PasswordInput} from "../../components/PasswordInput";

export const Registration = () => {

    const [userData, setUserData] = useState({})
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        user_name: (name) => name && userNameValidate(name),
        user_email: (email) => email && emailValidate(email),
        user_password: (password) => password && passwordValidate(password),
        repeat_password: (resetPassword, password) => resetPassword === password,
        user_phone_number: (phoneNumber) => {
            return phoneNumber?.length === 10
        },
        checkValidate: () =>
            validation.user_name(userData.user_name) &&
            validation.user_email(userData.user_email) &&
            validation.user_password(userData.user_password) &&
            validation.repeat_password(repeatPassword, userData.user_password) &&
            validation.user_phone_number(userData.user_phone_number)
    }

    async function registration() {
        if (validation.checkValidate()) {
            console.log(userData, true)
        } else {
            setIsNotValid(true)
        }
    }

    return (
        <RegistrationPage>
            <CreateUserContainer>
                <Title>Регистрация</Title>
                <TextInput
                    value={userData?.user_name}
                    onChange={(value) => setUserData({...userData, user_name: value})}
                    validation={{
                        validate: validation.user_name,
                        validationError: isNotValid,
                        validationMessage: 'Введите имя (от 2-х символов)'
                    }}
                    label={'Имя'}
                    w={'50%'}
                />
                <TextInput
                    value={userData?.user_email}
                    type={'email'}
                    onChange={(value) => setUserData({...userData, user_email: value})}
                    validation={{
                        validate: validation.user_email,
                        validationError: isNotValid,
                        validationMessage: 'Некорректный e-mail'
                    }}
                    label={'e-mail'}
                    w={'50%'}
                />
                <PasswordInput
                    value={userData?.user_password}
                    onChange={(value) => setUserData({...userData, user_password: value})}
                    validation={{
                        validate: validation.user_password,
                        validationError: isNotValid,
                        validationMessage: 'Некорректный пароль. Пароль должен содержать не менее 1-ой буквы и цифры и быть от 5 до 25 символов'
                    }}
                    label={'Пароль'}
                    w={'50%'}
                />
                <PasswordInput
                    value={repeatPassword}
                    onChange={(value) => setRepeatPassword(value)}
                    validation={{
                        validate: (pass) => validation.repeat_password(pass, userData.user_password || ''),
                        validationError: isNotValid,
                        validationMessage: 'Пароль не совпадает'
                    }}
                    label={'Повторите пароль'}
                    w={'50%'}
                />
                <PhoneNumberInput
                    value={userData?.user_phone_number}
                    onChange={(value) => setUserData({...userData, user_phone_number: value})}
                    validation={{
                        validate: validation.repeat_password,
                        validationError: isNotValid,
                        validationMessage: 'Заполните номер телефона'
                    }}
                    label={'Номер телефона'}
                    w={'50%'}
                />
                <Toolbar>
                    <Button
                        width={210}
                        onClick={registration}
                    >
                        Зарегистрироваться
                    </Button>
                </Toolbar>
            </CreateUserContainer>
        </RegistrationPage>
    )

}

const RegistrationPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 400px;
`

const CreateUserContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
  box-shadow: 0 0 10px 0 #808080;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
`

const Title = styled.div`
  font-size: 35px;
  padding: 0 10px 20px;
`

const Toolbar = styled.div`
  display: flex;
  justify-content: right;
  padding: 30px;
`