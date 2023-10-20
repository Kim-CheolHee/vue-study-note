import { mount } from '@vue/test-utils';
import SignupForm from '@/components/SignupForm.vue';
import { registerUser } from '@/api/auth';

// Mock the API call
jest.mock('@/api/auth', () => ({
  registerUser: jest.fn(() =>
    Promise.resolve({
      data: {
        username: 'testUser',
      },
    }),
  ),
}));

describe('SignupForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SignupForm);
  });

  it('renders the form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('initializes with correct elements', () => {
    expect(wrapper.find('#username').exists()).toBe(true);
    expect(wrapper.find('#password').exists()).toBe(true);
    expect(wrapper.find('#nickname').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('should update username, password and nickname when user inputs data', async () => {
    await wrapper.setData({
      username: 'test',
      password: '1234',
      nickname: 'testNick',
    });
    expect(wrapper.vm.username).toBe('test');
    expect(wrapper.vm.password).toBe('1234');
    expect(wrapper.vm.nickname).toBe('testNick');
  });

  it('should call registerUser when the form is submitted', async () => {
    const submitForm = jest.spyOn(wrapper.vm, 'submitForm');
    await wrapper.setData({
      username: 'test',
      password: '1234',
      nickname: 'testNick',
    });

    await wrapper.find('form').trigger('submit.prevent');
    expect(submitForm).toHaveBeenCalled();
  });

  it('should display the username when registration is successful', async () => {
    await wrapper.setData({
      username: 'test',
      password: '1234',
      nickname: 'testNick',
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Wait for promise and DOM update
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.logMessage).toBe('testUser 님이 가입되었습니다');
    expect(wrapper.find('.log').text()).toBe('testUser 님이 가입되었습니다');
  });

  it('should clear the form after successful registration', async () => {
    await wrapper.setData({
      username: 'test',
      password: '1234',
      nickname: 'testNick',
    });
    await wrapper.find('form').trigger('submit.prevent');

    // Wait for promise and DOM update
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.username).toBe('');
    expect(wrapper.vm.password).toBe('');
    expect(wrapper.vm.nickname).toBe('');
  });
});
