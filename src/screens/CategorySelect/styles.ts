import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import theme  from '../../global/styles/theme';

interface CategoryProps {
    isActive: boolean;
}

import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};

`;

export const Header = styled(GestureHandlerRootView)`
    width: 100%;
    height: ${RFValue(113)}px;
    
    background-color: ${({ theme }) => theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    padding-bottom: ${RFValue(19)}px;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;

    color: ${({ theme }) => theme.colors.shape}
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    
    flex-direction: row;
    align-items: center;

    padding: ${RFValue(15)}px;

    background-color: ${({ isActive }) => 
        isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;

    margin-right: ${RFValue(16)}px;
`;

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;

export const Separator = styled.View`
    height: ${RFValue(1)}px;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.text_dark}
`;

export const Footer = styled.View`
    width: 100%;
    padding: ${RFValue(24)}px;
    `;

export const ButtonText = styled.Text`

`;
