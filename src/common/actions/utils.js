/**
 * @fileoverview 通用方法
 * @author qiuxiaoguang | @author qiuxiaoguang | qxg1994@gmail.com
 * @version 1.0 | 2019-01-02 | qiuxiaoguang    // 初始版本。
 * @description 通用方法封装
 */

/**
 * 获取url中参数
 * @param  {String} query 要获取的参数，对大小写敏感
 * @return {String}       要获取的参数对应的值，为获取则为空字符串
 */
function getQuery (query) {
  if (!query) return ''
  const _query = window.location.search.substring(1)
  const _eachQuery = _query.split('&')
  let i = 0
  while (i < _eachQuery.length) {
    let _keyValue = _eachQuery[i].split('=')
    if (_keyValue[0] === query) {
      return _keyValue[1]
    }
    i++
  }
  return ''
}

/**
 * 删除url中参数
 * @param  {String} query 要删除的query
 * @param  {String} url   要删除的url
 * @return {String}       返回删除后的url
 */
function delQuery (query, url = window.location.href) {
  let urlArr = url.split('?')
  if (urlArr.length > 1 && urlArr[1].indexOf(query) > -1) {
    let _search = urlArr[1]
    let obj = {}
    let arr = _search.split('&')
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split('=')
      obj[arr[i][0]] = arr[i][1]
    }
    delete obj[query]
    const urlte = `${urlArr[0]}?${JSON.stringify(obj).replace(/["{}]/g, '').replace(/:/g, '=').replace(/,/g, '&')}`
    return urlte
  } else {
    return url || window.location.href
  }
}

/**
 * 验证用户输入的手机号或姓名是否合法
 * @param  {Object}  options
 *         {String}  type    验证类型（phone or name)
 *         {String}  content 验证内容
 * @return {Boolean}         是否合法
 */
function verifyInput (options) {
  switch (options.type) {
    case 'phone':
      const _phoneReg = /^1((3\d)|(4[5, 7])|(5\d)|7([0, 6, 7, 8])|8(\d))\d{8}$/
      return _phoneReg.test(options.content) === true
    case 'name':
      const _nameReg = /^[\u4e00-\u9fa5]+$/
      return _nameReg.test(options.content) === true
    default:
      return false
  }
}

/**
 * 获取字符串字节长度（中文算两个字节）
 * @param  {[String, Number]} val 需要判断的字符串
 * @return {Number}     长度
 */
function getByteLen (val) {
  if (!val && val !== 0) return 0
  let _length = 0
  const _val = val.toString()
  for (let i = 0; i < _val.length; i++) {
    const _char = _val.charCodeAt(i)
    if (_char > 127 || _char === 94) {
      _length += 2
    } else {
      _length++
    }
  }
  return _length
}

/**
 * 判断是否是函数
 * @param  {Function}  func 传入函数
 * @return {Boolean}       是否是函数
 */
function isFunction (func) {
  return func && Object.prototype.toString.call(func) === '[object Function]'
}

/**
 * 判断是否是对象
 * @param  {Object}  obj 传入对象
 * @return {Boolean}     是否是对象
 */
function isObject (obj) {
  return obj && Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 判断是否是数字
 * @param  {Number}  num 传入数字
 * @return {Boolean}     是否是数字
 */
function isNumber (num) {
  return num && Object.prototype.toString.call(num) === '[object Number]'
}

/**
 * 判断是否是真数组
 * @param  {Array}  arr  传入数组
 * @return {Boolean}     是否是真数组
 */
function isArray (arr) {
  return arr && Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * 判断是否是伪数组
 * @param  {Object}  obj 传入对象
 * @return {Boolean}     是否是伪数组
 */
function isLikeArray (obj) {
  if (isFunction(obj) || obj === window) return false
  if (isNumber(obj.length) && obj.length >= 0 && (obj.length - 1) in obj) return true
  return false
}

/**
 * localStorage简单封装
 *  @function get                       获取storage
 *    @params {String}                    key 要获取的key
 *  @function set                       设置storage
 *    @params {String}                    key 要设置的key
 *    @params {[String, Number, Object]}  val 要设置的val
 *  @function remove                    删除storage
 *    @params {String}                    key 要删除的key
 *  @function clear                     完全清除storage
 */
const Storage = {
  get (key, storage = localStorage) {
    const _obj = storage.getItem(key)
    if (_obj && _obj !== 'undefined' && _obj !== 'null') {
      return JSON.parse(_obj)
    }
    return ''
  },
  set (key, val, storage = localStorage) {
    storage.setItem(key, JSON.stringify(val))
  },
  remove (key, storage = localStorage) {
    if (key) {
      storage.removeItem(key)
    } else {
      this.clear()
    }
  },
  clear (storage = localStorage) {
    storage.clear()
  }
}

/**
 * 深拷贝
 * @param  {Object} [obj={}] 深拷贝对象
 * @return {Object}          深拷贝后的结果
 */
function cloneDeep (obj = {}) {
  if (!isObject(obj)) return obj
  let newobj = {}
  for (let attr in obj) {
    newobj[attr] = cloneDeep(obj[attr])
  }
  return newobj
}

/**
 * Cookie操作封装
 *  @function get                     获取cookie
 *    @params {String}                  key 要获取的key
 *  @function set                     设置cookie
 *    @params {String}                  key 要设置的key
 *    @params {[String, Number Object]} val 要设置的val
 *  @function remove                  删除cookie
 *    @params {String}                  key 要删除的key
 *  @function clear                   完全清除cookie
 */
const Cookie = {
  get (key) {
    const _cookie = '' + document.cookie
    let ind = _cookie.indexOf(key)
    if (ind === -1 || key === '') return ''
    let ind1 = _cookie.indexOf('; ', ind)
    if (ind1 === -1) ind1 = _cookie.length
    // 读取Cookie值
    return unescape(_cookie.substring(ind + key.length + 1, ind1))
  },
  set (key, value) {
    const _now = new Date()
    // Cookie过期时间
    let _expire = new Date()
    // 如果未设置nDays参数或者nDays为0，取默认值1
    // if(nDays == null || nDays == 0) nDays = 1;
    // 计算Cookie过期时间【 3600000 * 24  为一天】
    _expire.setTime(_now.getTime() + 3600000 * 24 * 30) // 一个月
    document.cookie = `${key}=${escape(value)}; path=/; expires=${_expire.toGMTString()}`
  },
  remove (key) {
    // const myDate = new Date()
    // myDate.setTime(-1000) // 设置时间
    // document.cookie = `${key}=; expires=${myDate.toGMTString()}`
    this.set(key, '')
  },
  removes (keys) {
    const _cookies = isArray(keys) ? keys : [keys]
    for (let i = 0; i < _cookies.length; i++) {
      this.set(_cookies[i], '')
    }
  },
  clear () {
    const _now = new Date()
    _now.setTime(-1000) // 设置时间
    let _cookie = document.cookie
    let _cookieArray = _cookie.split('; ')
    for (let i = 0; i < _cookieArray.length; i++) {
      const _key = _cookieArray[i].split('=')
      document.cookie = `${_key[0]}=; expires=${_now.toGMTString()}`
    }
  }
}

/**
 * Url操作
 * @type {Object}
 */
const Uri = {
  decode (url) {
    return decodeURIComponent(url)
  },
  encode (url) {
    return encodeURIComponent(url)
  }
}

export default {
  getQuery,
  delQuery,
  verifyInput,
  getByteLen,
  isFunction,
  isObject,
  isArray,
  isNumber,
  isLikeArray,
  Storage,
  cloneDeep,
  Cookie,
  Uri
}
