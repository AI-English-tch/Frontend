import { defineStore } from 'pinia';
import { Session } from '@/utils/storage';
import {  login, refreshTokenApi } from '@/api/public/user';
import utils from '@/utils/utils';
import { useMessage } from '@/hooks/message';

/**
 * @function useUserInfo
 * @returns {UserInfosStore}
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),

	actions: {
		/**
		 * 登录方法
		 * @function login
		 * @async
		 * @param {Object} data - 登录数据
		 * @returns {Promise<Object>}
		 */
		async login(data) {
			data.grant_type = 'password';
			data.scope = 'server';
			// TODO 密码加密待跟进
			const user = utils.encryption({
				data: data,
				param: ['password'],
			});


			return new Promise((resolve, reject) => {
				login(user)
					.then((res) => {
						// 存储token 信息
						const data = res || {};
						Session.set('token', data.access_token);
						Session.set('refresh_token', data.refresh_token);
						Session.set('user_id',data.user_id);
						resolve(res);
					})
					.catch((err) => {
						useMessage().error(err?.msg || '系统异常请联系管理员');
						reject(err);
					});
			});
		},


		/**
		 * 刷新token方法
		 * @function refreshToken
		 * @async
		 * @returns {Promise<any>}
		 */
		async refreshToken() {
			return new Promise((resolve, reject) => {
				const refreshToken = Session.get('refresh_token');
				refreshTokenApi(refreshToken)
					.then((res) => {
						// 存储token 信息
						const data = res.data || {}
						Session.set('token', data.access_token);
						Session.set('refresh_token', data.refresh_token);
						resolve(res);
					})
					.catch((err) => {
						useMessage().error(err.msg);
						reject(err);
					});
			});
		},
	},
});
