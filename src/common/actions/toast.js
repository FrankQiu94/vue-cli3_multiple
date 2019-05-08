/**
 * @fileoverview toast
 * @author qiuxiaoguang | qxg1994@gmail.com
 * @version 1.0 | 2019-01-15 | qiuxiaoguang    // 初始版本。
 * @description toast
 */

/**
 * [Toast description]
 * @param {string}   text        [内容文字]
 * @param {number}   duration    [持续时长，毫秒]
 * @param {string}   bottom      [离底部位置]
 * @param {function} success     [回调函数]
 * @param {boolean}  ifFit       [是否根据端内外调用toast]
 * @param {function} hideControl [是否可控制隐藏/与duration相悖]
 */
function Toast (options) {
  let _opts = options
  let _defaultOpts = {
    text: '',
    duration: 2000,
    bottom: '45%',
    radius: '100px',
    success: '',
    ifFit: true,
    hideControl: false
  }
  for (let key in _opts) {
    _defaultOpts[key] = _opts[key]
  }
  for (let key in _defaultOpts) {
    this[key] = _defaultOpts[key]
  }
  _opts = null
  _defaultOpts = null
  this.init()
}

Toast.prototype = {
  construct: Toast,
  init () {
    // var _this = this
    // if (_this.ifFit) {
    //   if (_this.inApp()) {
    //     hybrid('toast', {
    //       text: _this.text
    //     })
    //   } else {
    //     _this.toastFn()
    //   }
    // } else {
    //   _this.toastFn()
    // }
    this.toastFn()
  },
  // inApp: function () {
  //   var _inType = /(MicroMessenger|WeiBo|QQ|teacher)/i.test(navigator.userAgent) ? RegExp.$1.toLowerCase() : 'other'
  //   return _inType == ''
  // },
  toastFn () {
    let _toastTimer
    if (document.querySelector('#kaochong-toast') != null) {
      _toastTimer && clearTimeout(_toastTimer)
      this.removeToast()
    }
    this.toastShow()
    _toastTimer = setTimeout(() => {
      this.removeToast()
      if (this.success) {
        this.success()
      }
    }, this.duration)
  },
  toastShow () {
    const _div = document.createElement('div')
    _div.id = 'kaochong-toast'
    const _style = {
      position: 'fixed',
      width: '100%',
      left: '0',
      bottom: this.bottom,
      textAlign: 'center',
      zIndex: '9999'
    }
    for (let key in _style) {
      _div['style'][key] = _style[key]
    }
    const _toastHtml = `<p style="background: rgba(0,0,0,.7);color: #fff;border-radius: ${this.radius};display: inline-block;padding: 10px 15px;font-size:14px">
      ${this.text}
      </p>`
    _div.innerHTML = _toastHtml
    const _body = document.body || document.documentElement
    _body.appendChild(_div)
  },
  removeToast () {
    const _child = document.querySelector('#kaochong-toast')
    if (_child !== null) {
      const _parent = _child.parentNode
      _parent.removeChild(_child)
    }
  }
}

const toast = (options) => new Toast(options)

export default toast
