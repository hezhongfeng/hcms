import { UserService } from './user/user.service';

const initData = async function (userService: UserService) {
  console.log('initData function');
  console.log(await userService.findAll());
};

export { initData };
