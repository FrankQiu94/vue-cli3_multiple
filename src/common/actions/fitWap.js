/**
 * 移动端rem适配方法
 * @param  {Object} global global对象
 */
function fit (global) {
  const window = global || this
  const width = 750
  const docEl = window.document.documentElement
  const resizeEvt = 'resize'
  const resizeCall = (function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) {
      docEl.style.fontSize = 100 + 'px'
    } else {
      docEl.style.fontSize = 100 * (clientWidth / parseInt(width)) + 'px'
    }
    return resizeCall
  })()
  let dpr = window.devicePixelRatio || 1
  dpr = dpr >= 3 ? 3 : dpr >= 2 ? 2 : 1
  docEl.setAttribute('data-dpr', dpr)
  window.addEventListener && window.addEventListener(resizeEvt, resizeCall, false)
}

export default fit
