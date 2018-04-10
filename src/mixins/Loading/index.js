import loadingSvg from '../../assets/images/loading.svg'
/**
 * 判断一个元素是否显示
 * @private
 * @method isVisible
 * @param {Object} elem 原生element对象
 * @return {Boolean} true/false
 */
function isVisible (elem) {
  return elem.offsetWidth > 0 || elem.offsetHeight > 0
}
/**
 * 切换loading动画
 * @private
 * @method function
 * @param {Object} show 是否显示
 */
export default function showLoading (show) {
  let loading = document.getElementById('loading')
  if (!loading) {
    loading = document.createElement('img')
    loading.id = 'loading'
    loading.className = 'loading'
    loading.src = loadingSvg
    document.body.appendChild(loading)
  }
  // 创建遮罩
  let mask = document.getElementById('mask')
  if (!mask) {
    mask = document.createElement('div')
    mask.id = 'mask'
    mask.className = 'mask'
    document.body.appendChild(mask)
  }
  // 已经显示
  if (show && isVisible(loading)) {
    return
  }
  // 未显示
  if (show && !isVisible(loading)) {
    loading.style.display = 'block'
    return
  }
  // 隐藏
  loading.style.display = 'none'
  mask.style.display = 'none'
  // showLoading(show)
}
