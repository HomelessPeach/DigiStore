import * as React from "react";
import styled from "styled-components";
import {useState} from "react";
import {TextInput} from "../../components/TextInput";
import {Button} from "../../components/Admin/TablesStyledBlocks";
import {PhoneNumberInput} from "../../components/PhoneNumberInput";
import {emailValidate, passwordHook, passwordValidate, userNameValidate} from "../../utils";
import {PasswordInput} from "../../components/PasswordInput";
import {authAPI} from "../../services/AuthService";
import {RouteNames} from "../../Router";
import {useNavigate} from "react-router-dom";
import {useResponsive} from "../../hook/responsive";

export const Registration = () => {

    const {smallMobile, tablet, mobile} = useResponsive()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})
    const [repeatPassword, setRepeatPassword] = useState('')
    const [isNotValid, setIsNotValid] = useState(false)
    const [isEmailUsed, setIsEmailUsed] = useState(false)
    const [registration] = authAPI.useRegistrationMutation()

    const validation = {
        user_name: (name) => name && userNameValidate(name),
        user_email: (email) => email && emailValidate(email),
        user_password: (password) => password && passwordValidate(password),
        repeat_password: (resetPassword, password) => resetPassword === password,
        user_phone_number: (phoneNumber) => phoneNumber?.length === 10,
        checkValidate: () =>
            validation.user_name(userData.user_name) &&
            validation.user_email(userData.user_email) &&
            validation.user_password(userData.user_password) &&
            validation.repeat_password(repeatPassword, userData.user_password) &&
            validation.user_phone_number(userData.user_phone_number)
    }

    async function registrationHandler() {
        if (validation.checkValidate()) {
            const res = await registration({...userData, user_password: await passwordHook(userData.user_password), password: userData.user_password})
            if (res?.error?.status === 400) {
                setIsEmailUsed(true)
            }
            if (!res?.error) {
                navigate(RouteNames.HOME)
            }
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
                    onChange={(value) => {
                        setIsEmailUsed(false)
                        setUserData({...userData, user_name: value})
                    }}
                    validation={{
                        validate: validation.user_name,
                        validationError: isNotValid,
                        validationMessage: 'Введите имя (от 2-х символов)'
                    }}
                    label={'Имя'}
                    w={(smallMobile)? '80%': (tablet || mobile)? '65%' : '50%'}
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
                    w={(smallMobile)? '80%': (tablet || mobile)? '65%' : '50%'}
                />
                {(isEmailUsed) &&
                    <ValidationMessage>
                        e-mail уже используется для другой учётной записи
                    </ValidationMessage>
                }
                <PasswordInput
                    value={userData?.user_password}
                    onChange={(value) => setUserData({...userData, user_password: value})}
                    validation={{
                        validate: validation.user_password,
                        validationError: isNotValid,
                        validationMessage: 'Некорректный пароль. Пароль должен содержать не менее 1-ой буквы и цифры и быть от 5 до 25 символов'
                    }}
                    label={'Пароль'}
                    w={(smallMobile)? '80%': (tablet || mobile)? '65%' : '50%'}
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
                    w={(smallMobile)? '80%': (tablet || mobile)? '65%' : '50%'}
                />
                <PhoneNumberInput
                    value={userData?.user_phone_number}
                    onChange={(value) => setUserData({...userData, user_phone_number: value})}
                    validation={{
                        validate: validation.user_phone_number,
                        validationError: isNotValid,
                        validationMessage: 'Заполните номер телефона'
                    }}
                    label={'Номер телефона'}
                    w={(smallMobile)? '80%': (tablet || mobile)? '65%' : '50%'}
                />
                <Toolbar>
                    <Button
                        width={210}
                        onClick={registrationHandler}
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
  padding: 0 20%;
  @media (${({theme}) => theme.media.large}) {
    padding: 0;
  }
`

const CreateUserContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
  box-shadow: 0 0 10px 0 #808080;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 5%;
  @media (${({theme}) => theme.media.large}) {
    padding: 0;
  }
`

const Title = styled.div`
  font-size: 35px;
  padding: 0 10px 20px;
  @media (${({theme}) => theme.media.small}) {
    font-size: 27px;
  }
`

const Toolbar = styled.div`
  display: flex;
  justify-content: right;
  padding: 30px;
`

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 15px;
  padding: 3px 0;
`