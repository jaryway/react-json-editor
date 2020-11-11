// import axios from "axios";
// 基于 flyio.js 实现的 api
import Fly from 'flyio/dist/npm/fly';
// import { Base64 } from "js-base64";
import md5 from 'crypto-js/md5';
import { notification, message } from 'antd';
// import { createHashHistory } from 'history';
// import { getAccessTokenAsync, ShowMessage } from './utils';

// export {
//   normalApi, // checkLoggedIn, // getAccessTokenAsync, // getTokenInfoFromLocalStorage,
// } from './utils';

// const history = createHashHistory();
// const showMessage = new ShowMessage();

function createApi() {
  const fly = new Fly();

  fly.config.baseURL = `${window.CONFIG.API_BASE_URL}`;
  fly.config.withCredentials = false;
  fly.interceptors.request.use(setToken2HeaderBeforeRequest.bind(fly));
  fly.interceptors.response.use(responseOkHandler, responseErrorHandler);

  const api = (url, newOptions = { method: 'GET' }) => {
    // const { data = null } = newOptions;
    const isObject = typeof url === 'object' && url !== null;

    const options = isObject ? { ...newOptions, ...url } : { url, ...newOptions };
    const { data = null } = isObject ? options : newOptions;
    const req = fly.request(options.url, null, { ...options, body: data });

    // 支持上传进度条
    if (options.onUploadProgress) {
      req.engine.upload.onprogress = options.onUploadProgress;
    }

    return req;
  };

  api.get = (url, newOptions) => api(url, { ...newOptions, method: 'GET' });
  api.post = (url, newOptions) => api(url, { ...newOptions, method: 'POST' });

  return api;
}

export default createApi();

/*
 helper methods
 ----------------------------------------------------------------- */

/**
 * 发起请求前，把 access_token 放入请求头中
 * @param {*} request fly request 对象
 */
async function setToken2HeaderBeforeRequest(request) {
  // console.log("request", request);

  const { url } = request;
  request = clearUpRequestParams(request);

  // 如果是去获取 token 则直接跳过
  if (url.indexOf('/token') > 0) return request;
  this.interceptors.request.lock();
  // log(`发起请求：path:${request.url}，baseURL:${request.baseURL}`);
  const access_token = await getAccessTokenAsync();
  this.interceptors.request.unlock();

  request.params = { ...request.params, __t: Date.now() };
  request.headers = { ...request.headers, Authorization: `Bearer ${access_token}` };

  return request;
}

/**
 * ok
 * @param {*} response
 */
function responseOkHandler(response) {
  // 没有发生错误的状态
  // status >= 200 && status < 300 || status === 304
  // console.log("responseOkHandler", response);
  const { code, message: errMessage } = response.data;

  // 登录接口是没有 code 的
  if (code === undefined) return response;

  // 没有发生错误
  if (code !== undefined && code === 0) return response;

  // 以下是code不为 0 的情况，此时返回 reject， reducer 中才会是reject状态。

  // 没有权限，提示信息
  if (code === 403) {
    notification.info({
      duration: 2,
      message: `${response.data.message}`,
      description: `请联系管理员开放功能权限！`,
    });
  }

  if (errMessage === '系统错误') {
    message.error('发生网络错误-系统错误');
  }

  // token 无效
  // if (code === 401) transfer2LoginPage();

  return Promise.reject(response);
}

/**
 * 发生网络错误
 * @param {*} error
 */
function responseErrorHandler(error) {
  return error;
}

/**
 * 整理请求参数，移除 params 中值为 undefined、null 的项
 * @param {*} request
 */
function clearUpRequestParams(request) {
  const { body, params: _params, method } = request;
  const mergeParams = {
    ..._params,
    ...(method.toUpperCase() === 'GET' ? body : {}),
  };

  // 移除 params 中 undefined 、null 数据
  const params = Object.entries(mergeParams)
    .filter(([, v]) => !(v === undefined || v === null))
    .reduce((prev, [k, v]) => ({ ...prev, [k]: v }), {});

  if (method.toUpperCase() === 'GET') request.body = {};
  request.params = params;

  return request;
}

function getUserNameAndPasswordFromUrl() {
  if (window.location.search.length < 2) {
    return { username: 'xiao@zchl', password: md5(md5('1qaz@WSX').toString()).toString() }; // 普通用户
    // return { username: 'jtadmin', password: '123456' }; // 系统管理员
    // return { username: 'jtman', password: '654321' } // 系统管理员
    // return { username: 'superadmin', password: 'admin' } // 超级管理员
  }

  const query = window.location.search
    .slice(1)
    .split('&')
    .map(m => m.split('='))
    .reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

  return { username: query.un, password: md5(md5(query.pwd).toString()).toString() };
}

async function getAccessTokenAsync() {
  const fly = new Fly();

  fly.config.baseURL = `${window.CONFIG.API_BASE_URL}`;
  fly.config.withCredentials = false;

  const data = Object.entries({ grant_type: 'password', ...getUserNameAndPasswordFromUrl() })
    .map(m => m.join('='))
    .join('&');
  const encode = window.btoa;
  const code = '$2a$10$XOVs4Z1YtPKqKwQVywG9j.xLAqXYRQLGZMGMrZDNbtl6pUC0Weteq';
  return fly
    .request('/uaa/api/oauth/token', null, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encode(`${code}:${code}`)}`,
      },

      body: data,
    })
    .then(resp => {
      return resp.data.access_token;
    })
    .catch(err => {
      console.log('err', err);
      return '';
    });
}
// createApi()('/uaa/api/facilitator/curIndexUrl');
