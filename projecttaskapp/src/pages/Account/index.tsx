import React, { useCallback, useRef } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import HeaderMain from '../../components/HeaderMain';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Title, BackToLogin, BackToLoginText } from './styles';

const Account: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const navigationLogin = useCallback(() => {
    return navigation.navigate('Login');
  }, [navigation]);

  const handleAccount = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <HeaderMain />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              style={{ width: '100%' }}
              ref={formRef}
              onSubmit={handleAccount}
            >
              <Input name="name" icon="user" placeholder="Nome" />

              <Input name="email" icon="mail" placeholder="E-mail" />

              <Input name="password" icon="lock" placeholder="Senha" />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Criar conta
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogin onPress={navigationLogin}>
        <Icon name="log-in" size={20} color="#fff" />
        <BackToLoginText>Voltar para logon</BackToLoginText>
      </BackToLogin>
    </>
  );
};

export default Account;
