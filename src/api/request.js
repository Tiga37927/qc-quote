import axios from 'axios'
import qs from 'qs'
import showLoading from '../components/Loading'
import showTips from '../components/ShowTips'

export default function fetch (opt) {
  var http = null

  //  配置loading
  if (opt.isLoading) {
    showLoading(true)
  }

  if (opt.type.toLocaleLowerCase() === 'get') {
    http = axios({
      method: 'get',
      url: opt.url,
      params: opt.data
    })
  } else {
    http = axios({
      method: 'post',
      url: opt.url,
      data: qs.stringify(opt.data)
    })
  }

  return new Promise(function (resolve, reject) {
    http.then(function (res) {
      showLoading(false)
      if (res.data.success) {
        let data = res.data.data
        resolve(data)
        opt.success(data)
      } else {
        let errMsg = res.data.msg || res.data
        reject(errMsg)
        opt.fail(errMsg)
        if (opt.errMsg) {
          showTips(opt.errMsg)
        }
      }
    })
    .catch(function (err) {
      showLoading(false)
      reject(err)
      opt.fail(err)
      if (opt.errMsg) {
        showTips(opt.errMsg)
      }
    })
  })
}
