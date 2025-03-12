import { User } from "@auth0/auth0-react"
import { Card } from "primereact/card"
import styled from "styled-components"

const ProfileCardContainer = styled.div`
    display: flex;
    align-items: flex-start;
    column-gap: 16px;
    border-radius: 8px;
`
const ProfilePicture = styled.img`
    width: 100px;
    object-fit: contain;
    border-radius: 50%;
`

export default function ProfileCard({ user }: { user: User }) {
    return (
        <Card>
            <ProfileCardContainer>
                <ProfilePicture src={user?.picture} />
                <p>{user?.given_name}</p>
            </ProfileCardContainer>
        </Card>
    )
}