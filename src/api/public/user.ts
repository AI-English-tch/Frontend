import request from '@/utils/request';
import { Session } from '@/utils/storage';

const FORM_CONTENT_TYPE = 'application/x-www-form-urlencoded';

/**
 * 登录
 * @param data
 */
export const login = (data: any) => {
	const basicAuth = 'Basic ' + window.btoa(import.meta.env.VITE_OAUTH2_PASSWORD_CLIENT);
	Session.set('basicAuth', basicAuth);
	const { username, password, grant_type, scope } = data;
	return request({
		url: '/auth/oauth2/token',
		method: 'post',
		params: { grant_type },
		data: { password: password,username,scope},
		headers: {
			skipToken: true,
			Authorization: basicAuth,
			'Content-Type': FORM_CONTENT_TYPE,

		},
	});
};
export const refreshTokenApi = (refresh_token: string) => {
	const grant_type = 'refresh_token';
	const scope = 'server';
	// 获取当前选中的 basic 认证信息
	const basicAuth = Session.get('basicAuth');

	return request({
		url: '/auth/oauth2/token',
		headers: {
			skipToken: true,
			Authorization: basicAuth,
			'Content-Type': FORM_CONTENT_TYPE,
		},
		method: 'post',
		params: { refresh_token, grant_type, scope },
	});
};
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
	return request({
		url: '/app/appuser/info',
		method: 'get',
	});
};

export const logout = () => {
	return request({
		url: '/auth/token/logout',
		method: 'delete',
	});
};
