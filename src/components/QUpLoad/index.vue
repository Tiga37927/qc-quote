<template>
  <div class="up-box">
    <input name="file" type="file" @change="handleChange" ref="input" :multiple="multiple" :accept="accept">
    <span class="percent" v-show="!upSuccess && percentage > 0 && percentage < 100">{{percentage}}%</span>
    <i v-show="upSuccess" class="up-suc iconfont icon-roundcheckfill"></i>
  </div>
</template>
<script>
  function noop () {
  }

  export default {
    props: {
      accept: String,
      multiple: Boolean,
      withCredentials: Boolean,
      sizes: {
        type: Number,
        required: true
      },
      types: {
        type: String,
        required: true
      },
      action: {
        type: String,
        required: true
      },
      name: {
        type: String,
        default: 'file'
      },
      headers: {
        type: Object,
        default () {
          return {}
        }
      },
      onSuccess: {
        type: Function,
        default: noop
      },
      onProgress: {
        type: Function,
        default: noop
      },
      onError: {
        type: Function,
        default: noop
      }
    },
    data: function () {
      return {
        upSuccess: false,
        percentage: 0
      }
    },
    methods: {
      handleChange (ev) {
        const files = ev.target.files
        if (!files) return
        this.upSuccess = false
        this.uploadFiles(files)
//        this.$refs.input.value = null
      },
      uploadFiles (files) {
        // 获取文件
        let postFiles = Array.prototype.slice.call(files)
        if (!this.multiple) { postFiles = postFiles.slice(0, 1) }

        if (postFiles.length === 0) { return }

        postFiles.forEach(rawFile => {
          this.post(rawFile)
        })
      },
      post (rawFile) {
        let fileSize = rawFile.size / 1024 / 1024
        if (this.sizes > 0 && fileSize > this.sizes) {
          this.$refs.input.value = null
          this.tips(`文件大小超过${this.sizes}M,请重新上传!`, 2000)
          return
        }
        let fileSuffix = this.$refs.input.value && this.$refs.input.value.split('.').slice(-1).join()
        if (this.types && fileSuffix) {
          let reg = new RegExp(this.types, 'i')
          if (!reg.test(fileSuffix)) {
            this.$refs.input.value = null
            this.tips('请上传符合规则的文件')
            return
          }
        }
        if (typeof XMLHttpRequest === 'undefined') {
          return
        }
        const xhr = new XMLHttpRequest()
        const action = this.action
        if (xhr.upload) {
          xhr.upload.onprogress = (e) => {
            if (e.total > 0) {
              e.percent = e.loaded / e.total * 100
            }
            this.percentage = Math.round(e.percent)
            this.onProgress(e, rawFile)
          }
        }

        const formData = new FormData()

        formData.append('file', rawFile)
        // 错误处理
        xhr.onerror = (err) => {
          this.$refs.input.value = null
          this.onError(err, rawFile)
        }

        xhr.onload = (e) => {
          if (xhr.status < 200 || xhr.status >= 300) {
            return this.onError(event, this.getError(action, xhr))
          }
          let result = this.getBody(xhr)
          if (result.success) {
            this.upSuccess = true
            this.onSuccess(e, result)
          } else {
            this.upSuccess = false
            this.$refs.input.value = null
            this.onError(e, result)
          }
        }

        xhr.open('post', action, true)

        if (this.withCredentials && 'withCredentials' in xhr) {
          xhr.withCredentials = true
        }
        // 设置请求头
        const headers = this.headers || {}
        for (let item in headers) {
          if (headers.hasOwnProperty(item) && headers[item] !== null) {
            xhr.setRequestHeader(item, headers[item])
          }
        }
        xhr.send(formData)
      },
      getError (action, xhr) {
        let msg
        if (xhr.response) {
          msg = `${xhr.status} ${xhr.response.error || xhr.response}`
        } else if (xhr.responseText) {
          msg = `${xhr.status} ${xhr.responseText}`
        } else {
          msg = `fail to post ${action} ${xhr.status}'`
        }

        const err = new Error(msg)
        err.status = xhr.status
        err.method = 'post'
        err.url = action
        return err
      },
      getBody (xhr) {
        const text = xhr.responseText || xhr.response
        if (!text) {
          return text
        }

        try {
          return JSON.parse(text)
        } catch (e) {
          return text
        }
      }
    }
  }
</script>
<style>
  .up-box {
    position: relative;
  }

  .up-suc {
    position: absolute;
    top: 5px;
    right: -14px;
    color: #13ce66;
  }

  .percent {
    position: absolute;
    top: 3px;
    right: -74px;
  }
</style>
