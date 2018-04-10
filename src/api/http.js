import axios from 'axios'
import qs from 'qs'
import showLoading from '../components/Loading'
import showTips from '../components/ShowTips'

export default function (opt) {
  // 配置loading
  if (opt.isLoading) {
    showLoading(true)
  }
  let http = axios({
    method: opt.method.toLocaleLowerCase() || 'get',
    url: opt.url,
    headers: opt.headers || {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    responseType: 'json',
    data: qs.stringify(opt.data)
  }).then(function (response) {
    let result = response.data
    showLoading(false)
    if (result.success === true) {
      opt.success(result)
    } else if (result.success === false) {
      opt.fail(result)
    }
  }).catch(function (err) {
    showLoading(false)
    opt.fail && opt.fail(err)
    showTips('网络异常，请刷新页面！', 3000)
  })
  return http
}
