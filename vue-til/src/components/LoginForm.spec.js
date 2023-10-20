import { shallowMount } from '@vue/test-utils';
import LoginForm from './LoginForm.vue';

// 사용자 관점에서 테스트 코드를 작성한다.
describe('LoginForm.vue', () => {
  test('ID가 이메일 형식이 아니면 경고 메시지가 출력된다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: 'test',
        };
      },
    });
    // const inInput = wrapper.find('#username');
    // console.log(inInput.html());
    // console.log('인풋 박스의 값', inInput.element.value);
    // console.log(wrapper.vm.isUsernameValid);

    const warningText = wrapper.find('.warning');
    // console.log(warningText.html());
    expect(warningText.exists()).toBeTruthy();
  });

  test('ID와 PW가 입력되지 않으면 로그인 버튼이 비활성화 된다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          // username: '',
          // password: '',
          username: 'f@',
          password: '1234',
        };
      },
    });
    const button = wrapper.find('button');
    expect(button.element.disabled).toBeTruthy();
  });
});
