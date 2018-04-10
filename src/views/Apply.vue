<!--申请页面-->
<template>
  <div class="open-form">
    <fieldset class="">
      <legend>企业资质信息</legend>
      <label class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          公司全称：
        </div>
        <input class="t-input" type="text" v-model="companyName" readonly>
      </label>
      <label class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          公司所在区域：
        </div>
        <input class="t-input" type="text" v-model="area" readonly>
      </label>
      <label class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          公司详细地址：
        </div>
        <input class="t-input" type="text" v-model="address" readonly>
      </label>
      <label class="t-label">
        <div class="txt">
          企业人数：
        </div>
        <input class="t-input" type="text" v-model="enterprisePerNum">
      </label>
      <label class="t-label">
        <div class="txt">
          公司性质：
        </div>
        <input class="t-input" type="text" v-model="enterpriseNature">
      </label>
      <label class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          法人姓名：
        </div>
        <input class="t-input" type="text" v-model="legalPerson">
      </label>
      <label class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          证件类型：
        </div>
        <select class="t-input" v-model="certificateType">
          <option v-for="certificate in certificateTypes" :value="certificate.val">{{certificate.text}}</option>
        </select>
      </label>
      <label class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          身份证号：
        </div>
        <input class="t-input" type="text" v-model="legalPersonId">
      </label>
    </fieldset>
    <fieldset>
      <legend>授信及安全</legend>
      <label class="t-label">
        <div class="txt">
          授信额度：
        </div>
        <input class="t-input" type="text" v-model="applyAmout">
      </label>
      <label class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          账期日：
        </div>
        <select class="t-input" v-model="billDay">
          <option v-for="val in 28" :value="val">{{val}}</option>
          <option value="31">月底</option>
        </select>
      </label>
    </fieldset>
    <fieldset>
      <legend>上传资质文件</legend>
      <span class="warn">
(上传文件均需加盖公章，支持bmp/gif/jpg/png/jpeg/pdf格式文件,务必上传清晰且小于10M。)</span>
      <div class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          营业执照副本：
        </div>
        <q-up-load class="f-input"
                   :accept="'image/jpg,image/jpeg,image/png,image/bmp,image/gif,image/pdf'"
                   :action="upUrl"
                   :sizes="10"
                   :types="'bmp|gif|jpg|png|jpeg|pdf'"
                   :onSuccess="sucBusiness"
                   :onError="errBusiness">
        </q-up-load>
        <span class="q-icon" @click="tips('营业执照（副本）复印件需加盖公司公章并注明“仅供齐采网开月结月结使用', 3000)"></span>
      </div>
      <div class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          经办人身份证明：
        </div>
        <q-up-load class="f-input"
                   :accept="'image/jpg,image/jpeg,image/png,image/bmp,image/gif,image/pdf'"
                   :action="upUrl"
                   :sizes="10"
                   :types="'bmp|gif|jpg|png|jpeg|pdf'"
                   :onSuccess="sucCard"
                   :onError="errCard">
        </q-up-load>
        <span class="q-icon" @click="tips('需上传身份证正反面复印件，并注明“仅供齐采网开月结月结使用”', 3000)"></span>
      </div>
      <div class="t-label">
        <div class="txt">
          <em class="t-red">*</em>
          齐采月结申请书：
        </div>
        <q-up-load class="f-input"
                   :accept="'image/jpg,image/jpeg,image/png,image/bmp,image/gif,image/pdf'"
                   :action="upUrl"
                   :sizes="10"
                   :types="'bmp|gif|jpg|png|jpeg|pdf'"
                   :onSuccess="sucAgreement"
                   :onError="errAgreement">
        </q-up-load>
        <span class="q-icon" @click="tips('请申请书2页一起拍照上传', 3000)"></span>
        <a class="t-blue" target="_blank"
           href="https://www.17cai.com/images/template/iou_agreement_file.pdf">下载月结申请书模板</a>
      </div>
    </fieldset>
    <button v-show="!isSub" class="btn btn-sub" @click="aply">立即申请</button>
    <button v-show="isSub" class="btn btn-refused">正在提交，请等待...</button>
  </div>
</template>
<script>
  import urls from '../api/urls'
  import http from '../api/http'
  import { QUpLoad, QDatePicker } from '../components'

  export default {
    components: {
      QUpLoad,
      QDatePicker
    },
    data: function () {
      return {
        companyName: '',
        area: '',
        address: '',
        enterprisePerNum: '',
        enterpriseNature: '',
        legalPersonId: '',
        certificateTypes: [
          {
            text: '身份证',
            val: 1
          }, {
            text: '护照',
            val: 2
          }, {
            text: '港澳回乡证',
            val: 3
          }, {
            text: '台胞证',
            val: 4
          }, {
            text: '其他',
            val: 5
          }
        ],
        certificateType: '',
        legalPerson: '',
        applyAmout: 1000,
        billDay: '',
        businessLicenseActualFileName: '',
        businessLicenseOriginalFileName: '',
        iouAgreementActualFileName: '',
        iouAgreementOriginalFileName: '',
        idCardActualFileName: '',
        idCardOriginalFileName: '',
        upUrl: urls.upload.dataUrl,
        isSub: false
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        let _this = this
        let opt = {
          method: 'get',
          url: urls.personInfo.dataUrl,
          isLoading: false,
          success: function (res) {
            _this.companyName = res.data.companyName
            _this.area = res.data.province + res.data.city + res.data.area
            _this.address = res.data.address
          }
        }
        http(opt)
      },
      aply () {
        if (this.isSub) {
          return
        }
        if (!this.legalPerson) {
          this.tips('请填写法人姓名', 1000)
          return
        }
        //  || !/^\d{17}(\d|x|X)$/.test(this.legalPersonId) 身份证校验
        if (!this.legalPersonId) {
          this.tips('身份证号码格式错误', 1000)
          return
        }
        if (!this.certificateType) {
          this.tips('请选择证件类型', 1000)
          return
        }
        if (!this.businessLicenseActualFileName) {
          this.tips('请上传营业执照', 1000)
          return
        }
        if (!this.iouAgreementActualFileName) {
          this.tips('请上传月结申请书', 1000)
          return
        }
        if (!this.idCardActualFileName) {
          this.tips('请上传经办人身份证明', 1000)
          return
        }
        if (!this.billDay || this.billDay === 0 || this.billDay > 31) {
          this.tips('请输入合法账期日', 1000)
          return
        }
        const subData = {
          companyName: this.companyName,
          area: this.area,
          address: this.address,
          enterprisePerNum: this.enterprisePerNum,
          enterpriseNature: this.enterpriseNature,
          legalPersonId: this.legalPersonId,
          certificateType: this.certificateType,
          legalPerson: this.legalPerson,
          applyAmout: this.applyAmout,
          billDay: this.billDay,
          businessLicenseActualFileName: this.businessLicenseActualFileName,
          businessLicenseOriginalFileName: this.businessLicenseOriginalFileName,
          iouAgreementActualFileName: this.iouAgreementActualFileName,
          iouAgreementOriginalFileName: this.iouAgreementOriginalFileName,
          idCardActualFileName: this.idCardActualFileName,
          idCardOriginalFileName: this.idCardOriginalFileName
        }
        this.isSub = true
        let _this = this
        let opt = {
          method: 'post',
          url: urls.apply.dataUrl,
          data: subData,
          success: function (res) {
            _this.tips(res.msg, 2000)
            setTimeout(() => {
              _this.$router.push({ path: 'aplySuccess' })
            }, 2000)
            _this.isSub = false
          },
          fail: function (res) {
            _this.tips(res.msg, 2000)
            _this.isSub = false
          }
        }
        http(opt)
      },
      sucBusiness (event, res) {
        this.tips('上传成功！', 1000)
        this.businessLicenseActualFileName = res.data.actualFileName
        this.businessLicenseOriginalFileName = res.data.originalFileName
      },
      errBusiness (event, res) {
        this.tips(res.msg || '上传失败，请检查网络！')
      },
      sucAgreement (event, res) {
        this.tips('上传成功！', 1000)
        this.iouAgreementActualFileName = res.data.actualFileName
        this.iouAgreementOriginalFileName = res.data.originalFileName
      },
      errAgreement (event, res) {
        this.tips(res.msg || '上传失败，请检查网络！')
      },
      sucCard (event, res) {
        this.tips('上传成功！', 1000)
        this.idCardActualFileName = res.data.actualFileName
        this.idCardOriginalFileName = res.data.originalFileName
      },
      errCard (event, res) {
        this.tips(res.msg || '上传失败，请检查网络！')
      }
    }
  }
</script>
<style lang="less">
  .open-form {
    padding-top: 30px;
    padding-left: 100px;
    color: #666666;
    width: 700px;
    fieldset {
      position: relative;
      width: inherit;
      padding-top: 30px;
      padding-bottom: 30px;
      legend {
        font-size: 16px;
      }
      .t-label {
        display: block;
        width: inherit;
        font-size: 12px;
        padding-bottom: 10px;
        .txt {
          display: inline-block;
          text-align: right;
          width: 30%;
        }
        .t-input {
          display: inline-block;
          vertical-align: middle;
          width: 300px;
          height: 32px;
          border: 1px solid #d6d6d6;
          padding-left: 4px;
        }
        .f-input {
          display: inline-block;
          width: 253px;
        }
        .q-icon {
          display: inline-block;
          margin-left: 15px;
          margin-right: 38px;
          width: 20px;
          height: 20px;
          cursor: pointer;
          vertical-align: -5px;
          background: url("../assets/images/question.png") no-repeat center center;
        }
      }
    }
    .btn-sub, .btn-refused {
      margin-left: 200px;
    }
    .warn {
      position: absolute;
      bottom: 136px;
    }
  }
</style>
