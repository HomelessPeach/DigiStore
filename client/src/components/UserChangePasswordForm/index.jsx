import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {PasswordInput} from "../PasswordInput";

export const UserChangePasswordForm = (props) => {

    const {
        password,
        setIsOpen,
        setPassword,
        validation,
    } = props

    const [isNotValid, setIsNotValid] = useState(false)

    function checkValidation(password) {
        const isValid = validation.validate(password)
        setIsNotValid(!isValid)
        return isValid
    }

    function changePassword() {
        if (validation.validate(password)) {
            setIsOpen(false)
        }
    }

    return(
        <UserChangePasswordBlock onClick={() => setIsOpen(false)}>
            <ChangePasswordBlock
                isNotValid={isNotValid}
                onClick={(event) => event.stopPropagation()}
            >
                <ChangeBlock>
                    <PasswordInput
                        value={password}
                        onChange={(value) => setPassword(value)}
                        validation={{...validation, validate: checkValidation}}
                        label={'Пароль'}
                        w={'100%'}
                    />
                </ChangeBlock>
                <EditToolbarBlock>
                    <Button onClick={changePassword} aria-disabled={true}>
                        Сохранить
                    </Button>
                </EditToolbarBlock>
            </ChangePasswordBlock>
        </UserChangePasswordBlock>
    )
}

const UserChangePasswordBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(136, 136, 136, 0.5);
  position: absolute;
  z-index: 4;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ChangePasswordBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  height: ${({isNotValid}) => (isNotValid)? 350 : 170}px;
  background-color: #ffffff;
  border-radius: 9px;
  position: relative;
  box-shadow: 0 0 10px 0 #5e5e5e;
`

const ChangeBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0;
  height: 70%;
`

const EditToolbarBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  height: 30%;
  padding: 0 20px 0;
  user-select: none;
`

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({width}) => (width)? width : 100}px;
  height: ${({height}) => (height)? height : 35}px;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  margin: 0 0 0 10px;
  text-align: center;
  padding: 3px;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
`