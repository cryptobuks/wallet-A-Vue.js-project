const regexRoules = {
  username: /^[a-zA-Z0-9]{4,20}$/,
  phone: /^[0-9]{11,20}$/,
  password: /^[a-zA-Z0-9]{6,20}$/,
  captcha: /^[0-9]{6}$/,
  walletName: /^[a-zA-Z0-9]{3,20}$/,
  passwordAgain: /^[0-9]{6,20}$/,
  desc:{
    username:"账号",
    phone:"手机号",
    password:"密码",
    captcha:"验证码",
    walletName:"钱包名",
    passwordAgain:"再次输入的密码",
  }
};
export default regexRoules;
