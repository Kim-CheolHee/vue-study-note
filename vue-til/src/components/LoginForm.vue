<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">id:</label>
      <input type="text" id="username" v-model="username" required />
    </div>
    <div>
      <label for="password">pw:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit" :disabled="!isUsernameValid || !password">
      로그인
    </button>
    <p>{{ logMessage }}</p>
  </form>
</template>

<script>
import { loginUser } from '@/api/index';
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      username: '',
      password: '',
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          username: this.username,
          password: this.password,
        };
        const { data } = await loginUser(userData);
        console.log(data);
        this.logMessage = `${data.user.username}님 환영합니다!`;
      } catch (error) {
        console.log(error.response);
        this.logMessage = '아이디 혹은 비밀번호가 잘못되었습니다.';
        alert(error.response.data);
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style scope></style>
