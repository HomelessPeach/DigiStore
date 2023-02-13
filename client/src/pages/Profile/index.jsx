import * as React from "react";
import styled from "styled-components"

export const Profile = () => {
    return (
        <ProfilePage>
            <ProfileCardContainer>

            </ProfileCardContainer>
        </ProfilePage>
    )
}

const ProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 300px;
`

const ProfileCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10% 20% 5%;
  box-shadow: 0 0 10px 0 #808080;
  border-radius: 30px;
  width: 100%;
`