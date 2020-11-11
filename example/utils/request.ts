/* eslint-disable camelcase */
import { extend } from 'umi-request';
// import { getTokenAsync } from './index';

let getTokenPromise: any = null;

interface TokenRespProps {
  access_token: string;
}

const request = extend({});
const request2 = extend({});

const baseUrl = `${process.env.REACT_APP_API_BASE_URL || 'http://192.10.169.212:31111'}`;

// 通过中间件 添加头部 Authorization
request.use(async (ctx, next) => {
  const { req } = ctx;
  const { options } = req;
  const { headers } = options;

  if (getTokenPromise === null) {
    getTokenPromise = getAccessTokenAsync();
  }

  const access_token = await Promise.resolve(getTokenPromise);

  ctx.req.options.headers = {
    ...headers,
    Authorization: `Bearer ${access_token}`,
  };

  await next();
});

/**
 * 从 url 中获取用户名和密码
 */
function getUserNameAndPasswordFromUrl(md5: any) {
  const search = window.location.search;
  const query: { un?: string; pwd?: string } =
    search.length > 1
      ? search
          .slice(1)
          .split('&')
          .map(m => m.split('='))
          .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {})
      : {};

  if (!query.un || !query.pwd) {
    // return { username: 'wjm_admin@cwb', password: md5(md5('1qaz@WSX').toString()).toString() };
    return { username: 'xiao@zchl', password: md5(md5('1qaz@WSX').toString()).toString() };
  }

  // 从 url 返回
  return { username: query.un, password: md5(md5(query.pwd).toString()).toString() };
}

// eslint-disable-next-line no-inner-declarations
async function getTokenFromUrl() {
  let md5;
  if (process.env.NODE_ENV === 'development') {
    md5 = await import('crypto-js/md5').then(md5 => {
      // console.log('md5', md5);
      return md5.default;
    });
  }

  const data = Object.entries({
    grant_type: 'password',
    ...getUserNameAndPasswordFromUrl(md5),
  })
    .map(m => m.join('='))
    .join('&');
  const encode = window.btoa;

  const username = '$2a$10$XOVs4Z1YtPKqKwQVywG9j.xLAqXYRQLGZMGMrZDNbtl6pUC0Weteq';
  const password = '$2a$10$XOVs4Z1YtPKqKwQVywG9j.xLAqXYRQLGZMGMrZDNbtl6pUC0Weteq';

  return request2('/uaa/api/oauth/token', {
    method: 'POST',
    // 使用 application/x-www-form-urlencoded 提交数据
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encode(username + ':' + password)}`,
    },

    data,
  })
    .then((resp: TokenRespProps) => {
      // console.log('resp', resp);
      return resp.access_token;
    })
    .catch((_err: any) => {
      // console.log('err', err);
      return '';
    });
}

export async function getAccessTokenAsync() {
  // const { loggedin, expiresed, access_token, refresh_token } = getTokenInfoFromLocalStorage();

  // 已登录，一切正常
  // if (loggedin && !expiresed && access_token) return access_token;

  let accessToken = '';

  if (process.env.NODE_ENV === 'development') {
    accessToken = await getTokenFromUrl();
  } else {
    accessToken = '';
  }
  // else if (loggedin && expiresed && refresh_token) {
  // 已经登录，access_token 已过期，去刷新 access_token
  //   accessToken = await refreshTokenAsync(refresh_token);
  // }

  return accessToken;
}

// 全局处理 url 地址，加上 baseUrl
request.interceptors.request.use((url, options) => {
  const nextUrl: string = url.startsWith('/') ? `${baseUrl}${url}` : url;
  return { url: nextUrl, options };
});

// 处理 response status=200 code!==0 的请求，这种要 reject 掉
request.interceptors.response.use(async response => {
  const { status } = response;
  const data = await response.clone().json();

  if (status === 200 && data && data.code !== undefined && data.code !== 0) {
    return Promise.reject(data);
  }
  // console.log('request.interceptors.response', data, response);
  return response;
});

export default (service: any, options: any) => {
  if (typeof service !== 'string') {
    const { url, ...rest } = service;
    return request(url, rest).then(resp => resp.data);
  }

  return request(service, options).then(resp => resp.data);
};

export const request4useRequest = (service: any) => {
  if (typeof service !== 'string') {
    const { url, ...options } = service;
    return request(url, options).then(resp => resp.data);
  }
  return request(service).then(resp => resp.data);
};
