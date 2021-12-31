import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon
} from "./styles";

export function Dashboard(){
    return(
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                        source={{ uri: 'https://avatars.githubusercontent.com/u/22282704?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Pedro</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>
            </Header>

            <HighlightCard />


        </Container>
    )
}