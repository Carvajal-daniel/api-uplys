// Script de teste para verificar as rotas de autenticação
const axios = require('axios');

const BASE_URL = 'http://localhost:8000';

async function testAuth() {
  try {
    console.log('🔍 Testando API de autenticação...\n');

    // 1. Testar health check
    console.log('1. Testando health check...');
    const healthResponse = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Health check:', healthResponse.data);

    // 2. Testar registro
    console.log('\n2. Testando registro...');
    const signUpData = {
      email: 'teste@exemplo.com',
      password: '123456',
      name: 'Usuário Teste'
    };

    try {
      const signUpResponse = await axios.post(`${BASE_URL}/api/auth/sign-up/email`, signUpData);
      console.log('✅ Registro bem-sucedido:', signUpResponse.data);
    } catch (error) {
      console.log('❌ Erro no registro:', error.response?.data || error.message);
    }

    // 3. Testar login
    console.log('\n3. Testando login...');
    const signInData = {
      email: 'teste@exemplo.com',
      password: '123456'
    };

    try {
      const signInResponse = await axios.post(`${BASE_URL}/api/auth/sign-in/email`, signInData);
      console.log('✅ Login bem-sucedido:', signInResponse.data);
    } catch (error) {
      console.log('❌ Erro no login:', error.response?.data || error.message);
    }

  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

testAuth();
