import React, { useState, useEffect } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { InputForm } from "../../components/Form/InputForm";
import { useForm } from "react-hook-form";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import uuid from 'react-native-uuid';
import { CategorySelect } from '../CategorySelect'
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesParamList } from "../../routes/app.routes";

interface FormData {
    name: string;
    amount: string;
}

type RegisterNavigationProps = BottomTabNavigationProp<AppRoutesParamList, "Cadastrar">;


const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('Informe um valor positivo')
    .required('Preço é obrigatório'),
});

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria'
    });

    const navigation = useNavigation<RegisterNavigationProps>();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategoryModal(){
        setCategoryModalOpen(true);
    }

    function handleCloseSetCategoryModal(){
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo da transação')
            
        if(category.key === "category")
            return Alert.alert('Selecione a categoria')


        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key,
            date: new Date(),
    }
    
    try {
        const dataKey = '@gofinance:transactions';

        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];

        const dataFormatted = [
            ...currentData,
            newTransaction
        ]

        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

        setTransactionType('');
        setCategory({
            key: 'category',
            name: 'Categoria'
        });
        reset();
        navigation.navigate("Listagem");

    } catch (error) {
        console.log(error)
        Alert.alert('Não foi possível salvar')
    }

}
    
/* useEffect(() => {
    async function loadData(){
        const data = await AsyncStorage.getItem(dataKey);
        console.log(JSON.parse(data!));
    }
    loadData()

    /* async function removeAll(){
         await AsyncStorage.removeItem(dataKey)
     }
     removeAll() /*
},[]) */

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    
                    <Fields>
                        <InputForm
                            placeholder="Nome"
                            control={control}
                            name="name"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                            />
                        <InputForm
                            placeholder="Preço"
                            control={control}
                            name="amount"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Income"
                                onPress={() => handleTransactionsTypeSelect('up')}
                                isActive={transactionType === 'up'}
                                />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionsTypeSelect('down')}
                                isActive={transactionType === 'down'}
                                
                            />
                        </TransactionTypes>

                        <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                        />

                    </Fields>

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSetCategoryModal}

                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
}