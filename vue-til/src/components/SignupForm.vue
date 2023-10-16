<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">id: </label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">pw:</label>
        <input type="text" id="password" v-model="password" />
      </div>
      <div>
        <label for="nickname">nickname: </label>
        <input type="text" id="nickname" v-model="nickname" />
      </div>
      <button type="submit" :disabled="!isUsernameValid || !password">
        회원 가입
      </button>
      <p>{{ logMessage }}</p>
    </form>
  </div>
</template>

<script>
import { registerUser } from '@/api/index';
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form value
      username: '',
      password: '',
      nickname: '',
      // log
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
      console.log('폼 제출');
      const userData = {
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };
      const { data } = await registerUser(userData);
      console.log(data.username);
      this.logMessage = `${data.username}님 회원가입을 축하드립니다!`;
      this.initForm();
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style scope></style>
