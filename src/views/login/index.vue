<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :model="loginForm"
      :rules="rules"
    >
      <div>
        <img
          data-v-26affb70=""
          src="../../assets/common/logo.png"
          class="login-logo"
        />
      </div>
      <div class="title-container">
        <h3 class="title"></h3>
      </div>
      <el-form-item prop="mobile">
        <span class="svg-container el-icon-mobile-phone" />
        <el-input v-model="loginForm.mobile" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="pwb"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
        />
        <span class="svg-container" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <!-- 验证框 -->
      <el-form-item prop="verify">
        <div class="el-verify">
          <span class="el-samll el-icon-folder-checked">
            <!-- <svg-icon icon-class="password"/> -->
          </span>
          <el-input
            class="verify-input"
            v-model="loginForm.verify"
            :type="passwordType"
            placeholder="请输入验证码"
          />
          <div class="verify-form"><img :src="imData" @click="cut" /></div>
        </div>
      </el-form-item>
      <!-- onclick="createCode()" -->
      <el-button class="loginBtn" :logining="logining" @click="login"
        >登录</el-button
      >
    </el-form>
  </div>
</template>


<script>
import { getverify } from "@/api/login.js";
import { validphone } from "@/utils/validate";
export default {
  name: "Login",
  data() {
    const phoneValid = (rule, value, callback) => {
      if (validphone) {
        callback();
      } else {
        callback(new Error("电话号码格式不对"));
      }
    };
    return {
      passwordType: "password",
      logining: false,
      imData: "",
      url: "",
      databas: "",
      loginForm: {
        mobile: "13800000002",
        password: "123456",
        verify: "",
        clientToken: "",
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: phoneValid, trigger: "blur" },
        ],
        password: [
          { require: true, message: "请输入密码", trigger: "blur" },
          // { min: 6, max: 16, message: "密码格式不对" },
        ],
      },
    };
  },
  created() {
    this.getverify();
  },
  watch: {},
  methods: {
    showPwd() {
      this.passwordType === "password"
        ? (this.passwordType = "")
        : (this.passwordType = "password");
    },
    async login() {
      try {
        const loginDate={
          loginName: this.loginForm.mobile,
          password: this.loginForm.password,
          code: this.loginForm.verify,
          clientToken: this.clientToken,
          loginType: 0,
        }
        // 调用 vuex 上的 actions 中的异步方法
        this.$store.dispatch('user/login',loginDate)

      } catch (error) {
        console.log(new Error("登录失败"));
      }
    },
    async getverify() {
      try {
        const random = Math.random();
        this.clientToken = random;
        const { data } = await getverify(random);
        console.log(data);
        const blob = new Blob([data], { type: "image/png" });
        const url = window.URL.createObjectURL(blob);
        console.log(1, url);
        this.imData = url;
      } catch (error) {
        console.log(error);
      }
    },
    cut() {
      this.getverify();
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #d4e3ff;
$light_gray: #68b0fe;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      color: $light_gray;
      caret-color: $cursor;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #e2e2e2;
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
  .loginBtn {
    background: rgba(89, 109, 225);
    height: 64px;
    line-height: 32px;
    font-size: 24px;
    width: 100%;
    margin-bottom: 30px;
    border: none;
    color: #fff;
  }
  .el-samll {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .el-verify {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-content: flex-start;
    .verify-form {
      width: 100px;
      height: 30px;
    }
    .verify-input {
      width: 75%;
      background: transparent;
      border: 0;
      border-radius: 0;
      color: #999;
      caret-color: #999;
      -webkit-appearance: none;
    }
    .verify-form {
      width: 30%;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #68b0fe;

.login-container {
  min-height: 100%;
  width: 85%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: absolute;
    width: 518px;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0rgba (30, 111, 72, 0.35);
    border-radius: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #889aa4;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login-logo {
  position: absolute;
  width: 96px;
  height: 96px;
  top: -46px;
  left: 50%;
  margin-left: -48px;
}
// @识别不出来前面可以加工～就可以识别
.login-container {
  background-image: url("~@/assets/common/background.png"); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
}
</style>

