import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: ${RFValue(1.5)}px solid ${({ theme }) => theme.colors.text};
    border-radius: ${RFValue(5)}px;

    padding: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: ${RFValue(12)}px;

    color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention}
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;