import * as React from "react";
import styled from "styled-components"
import {TextInput} from "../../components/TextInput";
import {Button} from "../TablesStyledBlocks";
import {createRef, useState} from "react";

export const UserChangePasswordForm = (props) => {

    const {
        setIsOpen,
        setPassword,
        validation,
    } = props

    const [newPassword, setNewPassword] = useState('')

    function changePassword() {
        if (validation.validate(newPassword)) {
            setPassword(newPassword)
            setIsOpen(false)
        }
    }

    return(
        <UserChangePasswordBlock onClick={() => setIsOpen(false)}>
            <ChangePasswordBlock onClick={(event) => event.stopPropagation()}>
                <ChangeBlock>
                    <TextInput
                        onChange={(value) => setNewPassword(value)}
                        validation={validation}
                        label={'Пароль'}
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
  width: 100%;
  height: 100%;
  border-radius: 9px;
  position: absolute;
`

const ChangePasswordBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  height: 40%;
  background-color: #ffffff;
  border-radius: inherit;
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