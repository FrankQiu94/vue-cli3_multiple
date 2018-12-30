/**
 * 公用axios封装，暴露get、post、sendAjax（用于put等请求）接口
 */
import axios from 'axios'
import Qs from 'qs'

/**
 * 发送请求
 * @param  {String} api     接口
 * @param  {String} method  请求方式
 * @param  {Object} data    请求数据
 * @param  {Object} options 其他参数选项
 */
function sendAjax (api, method, data, options) {
  if (!api || typeof api !== 'string') {
    return
  }
  const ajaxConfig = {
    url: api,
    method: method.toLowerCase()
  }
  if (method === 'GET') {
    ajaxConfig.params = data
  } else {
    if (data instanceof FormData) {
      ajaxConfig.data = data
    } else {
      ajaxConfig.data = Qs.stringify(data, { arrayFormat: 'brackets' })
    }
  }
  Object.assign(ajaxConfig, options)
  const _promise = new Promise((resolve, reject) => {
    axios(ajaxConfig)
      .then(response => {
        const _data = response.data
        // 成功逻辑
        if (_data.code === 1) {
          resolve(_data.data)
        } else {
          // 失败
          reject(_data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  })
  return _promise
}

/**
 * get请求
 * @param  {String} api     接口
 * @param  {Object} data    请求数据
 * @param  {Object} options 其他参数选项
 */
function get (api, data, options) {
  return sendAjax(api, 'GET', data, options)
}

/**
 * post请求
 * @param  {String} api     接口
 * @param  {Object} data    请求数据
 * @param  {Object} options 其他参数选项
 */
function post (api, data, options) {
  return sendAjax(api, 'POST', data, options)
}

export default {
  get,
  post,
  sendAjax
}
