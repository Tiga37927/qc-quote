//pagination.vue  bootstrap风格分页组件

<template>
  <div class="pagination-wrap" v-cloak v-if="totalPage!=0">
    <ul class="pagination">
      <!--<li :class="currentPage==1?'disabled':''"><a href="javascript:;" @click="turnToPage(1)">首页</a></li>-->
      <li :class="currentPage==1?'disabled':''"><a @click="turnToPage(currentPage-1)" href="javascript:;">上一页</a></li>

      <!-- 10以内 -->
      <li v-if="totalPage <= 10" v-for="$index in totalPage" :class="{ 'active' : currentPage === $index }">
        <a href="javascript:;" v-text="$index" @click="turnToPage($index)"></a>
      </li>

      <!-- 10以外 -->
      <!-- 当前页在7以内，生成7页 -->
      <li v-if="totalPage > 10 && currentPage <= 7" v-for="$index in 7" :class="{ 'active' : currentPage === $index }">
        <a href="javascript:;" v-text="$index" @click="turnToPage($index)"></a>
      </li>

      <!-- 当前页在7以上，显示第一页并且省略号 -->
      <li v-if="totalPage > 10 && currentPage > 7" >
        <a href="javascript:;" v-text="1" @click="turnToPage(1)"></a>
      </li>
      <li v-if="totalPage > 10 && currentPage > 7" >
        <a href="javascript:;" >...</a>
      </li>

      <!-- 当前页大于7，并且剩余页数大于7 -->
      <li v-if="totalPage > 10 && currentPage > 7 && totalPage - currentPage > 7" :class="{ 'active' : currentPage === myPage - 1 }">
        <a href="javascript:;" v-text="currentPage-1" @click="turnToPage(currentPage-1)"></a>
      </li>
      <li v-if="totalPage > 10 && currentPage > 7 && totalPage - currentPage > 7" :class="{ 'active' : currentPage === myPage }">
        <a href="javascript:;" v-text="currentPage" @click="turnToPage(myPage)"></a>
      </li>
      <li v-if="totalPage > 10 && currentPage > 7 && totalPage - currentPage > 7" :class="{ 'active' : currentPage === myPage + 1 }">
        <a href="javascript:;" v-text="currentPage+1" @click="turnToPage(myPage+1)"></a>
      </li>
      <li v-if="totalPage > 10 && currentPage > 7 && totalPage - currentPage > 7" :class="{ 'active' : currentPage === myPage + 2 }">
        <a href="javascript:;" v-text="currentPage+2" @click="turnToPage(currentPage+2)"></a>
      </li>

      <li v-if="totalPage > 10 && currentPage <= 7 || totalPage > 10 && totalPage - currentPage > 7">
        <a href="javascript:;" >...</a>
      </li>


      <!-- 最后剩下7页 -->
      <li v-if="totalPage > 10 && currentPage > 7 && totalPage - currentPage <= 7" v-for="$index in 8" :class="{ 'active' : currentPage === totalPage-8+$index }">
        <a href="javascript:;" v-text="totalPage-8+$index" @click="turnToPage(totalPage-8+$index)"></a>
      </li>
      <li :class="currentPage==totalPage?'disabled':''"><a href="javascript:;" @click="turnToPage(currentPage+1)" >下一页</a></li>
    </ul>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      //  传入总页数，默认100
      totalPage: {
        type: Number,
        default: 1,
        required: true,
        validator (value) {
          return value >= 0
        }
      },
      //  传入页面改变时的回调，用于更新你的数据
      //  传入当前页，默认1
      currentPage: {
        type: Number,
        default: 1,
        validator (value) {
          return value >= 0
        }
      },
      //  回调默认是打印当前页
      //  请根据需要在传入的回调函数里更改函数体
      changeCallback: {
        type: Function,
        default (cPage) {
          console.log('默认回调，显示页码：' + cPage)
        }
      }
    },
    data () {
      return {
        goToPage: null,
        isPageNumberError: false,
        myPage: null
      }
    },
    methods: {
      //  turnToPage为跳转到某页
      //  传入参数pageNum为要跳转的页数
      turnToPage (pageNum) {
        if (pageNum === this.currentPage) {
          return
        }
        var ts = this
        var pageNumber = parseInt(pageNum)
        //  页数不合法则退出
        if (!pageNumber || pageNumber > ts.totalPage || pageNumber < 1) {
        //  console.log('页码输入有误！');
          ts.isPageNumberError = true
          return false
        }

        ts.isPageNumberError = false
        //  更新当前页
        ts.myPage = pageNumber
        //  页数变化时的回调
        ts.changeCallback(pageNumber)
      }
    }
  }
</script>

<style type="text/css" scoped>
  .pagination-wrap{
    margin: 0 auto;
    text-align: center;
  }
  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 40px 0 20px 0;
    border-radius: 4px;
  }
  .small {
    margin: 0 10px;
    position: relative;
    top: -32px;
  }
  .nowrap {
    white-space: nowrap;
  }
  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
  }
  .input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 0 4px 4px 0;
  }
  .input-group-addon, .input-group-btn {
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
  }
  .input-group-addon, .input-group-btn, .input-group .form-control {
    box-sizing: border-box;
    display: table-cell;
  }
  .input-group .form-control:first-child, .input-group-addon:first-child, .input-group-btn:first-child>.btn, .input-group-btn:first-child>.btn-group>.btn, .input-group-btn:first-child>.dropdown-toggle, .input-group-btn:last-child>.btn:not(:last-child):not(.dropdown-toggle), .input-group-btn:last-child>.btn-group:not(:last-child)>.btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .input-group-addon, .input-group-btn, .input-group .form-control {
    display: table-cell;
  }
  .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 100%;
    margin-bottom: 0;
  }
  .go .error .form-control{
    border: 1px solid #d95656;
  }
  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  }
  .text-primary {
    color: #ee7448;
  }
  .pagination>li:first-child>a, .pagination>li:first-child>span {
    margin-left: 0;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  .go {
    display: inline-block;
    max-width: 140px;
    top: -21px;
    position: relative;
  }
  .input-group-addon:last-child {
    display: table-cell;
    text-decoration: none;
    border-left: 0;
  }
  .pagination>.disabled>span, .pagination>.disabled>span:hover, .pagination>.disabled>span:focus, .pagination>.disabled>a, .pagination>.disabled>a:hover, .pagination>.disabled>a:focus {
    color: #777;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }
  .pagination>li:last-child>a, .pagination>li:last-child>span {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .pagination>.active>a, .pagination>.active>span, .pagination>.active>a:hover, .pagination>.active>span:hover, .pagination>.active>a:focus, .pagination>.active>span:focus {
    z-index: 2;
    color: #fff;
    cursor: default;
    background-color: #ee7448;
    border-color: #ee7448;
  }
  .pagination>li>a, .pagination>li>span {
    position: relative;
    float: left;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #ee7448;
    text-decoration: none;
    background-color: #fff;
    border: 1px solid #ddd;
  }
  .pagination>li {
    display: inline;
  }
</style>
