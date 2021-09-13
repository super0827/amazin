import { axiosPublic, axiosPrivate } from './axiosClient';
import {
  userRegisterActions,
  userSigninActions,
  userDetailsActions,
  userUpdateProfileActions,
  userUpdateActions,
  userListActions,
  userDeleteActions,
  userTopSellerListActions
} from '../slice/UserSlice';
import { Storage } from '../utils';
import { KEY } from '../constants';

export const register = (name: string, email: string, password: string, confirmPassword: string) =>
  axiosPublic([userRegisterActions], {
    successAction: userSigninActions._SUCCESS,
    successHandler: (_data) => (Storage[KEY.USER_INFO] = _data)
  })('post', '/api/users/register', {
    name,
    email,
    password,
    confirmPassword
  });

export const signin = (email: string, password: string) =>
  axiosPublic([userSigninActions], { successHandler: (_data) => (Storage[KEY.USER_INFO] = _data) })(
    'post',
    '/api/users/signin',
    {
      email,
      password
    }
  );

export const signout = () => (dispatch: AppDispatch) => {
  Storage[KEY.USER_INFO] = '';
  Storage[KEY.CART_ITEMS] = '';
  Storage[KEY.SHIPPING_ADDRESS] = '';
  dispatch(userSigninActions._RESET(''));
  document.location.href = '/signin';
};

export const publicDetailsSeller = (userId: string) => axiosPublic([userDetailsActions])('get', `/api/users/${userId}`);

export const detailsUser = (userId: string) => axiosPrivate([userDetailsActions])('get', `/api/users/${userId}`);

export const updateUserProfile = (user: UserType) =>
  axiosPrivate([userUpdateProfileActions], {
    successAction: userSigninActions._SUCCESS,
    successHandler: (userInfo) => (Storage[KEY.USER_INFO] = userInfo)
  })('put', `/api/users/profile`, user);

export const updateUser = (user: UserType) =>
  axiosPrivate([userUpdateProfileActions, userUpdateActions])('put', `/api/users/${user._id}`, user);

export const listUsers = () => axiosPrivate([userListActions])('get', '/api/users');

export const deleteUser = (userId: string) => axiosPrivate([userDeleteActions])('delete', `/api/users/${userId}`);

export const listTopSellers = () => axiosPublic([userTopSellerListActions])('get', '/api/users/top-sellers');