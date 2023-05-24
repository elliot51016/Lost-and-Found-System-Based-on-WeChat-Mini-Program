// pages/login/login.js
import {ajax} from '../../utils/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:''
  },
 async submit(){
     const {username,password} = this.data;
    //判断必填项是否为空
     if(!username || !password){
      wx.showToast({
        title: '存在未填项',
        icon:"none"
      })
      return
     }
     const params ={
      username,
      password
    }
    const result = await ajax('/toLogin','POST',params);
    const {data} = result;
    if (data === "pwdError"){
      wx.showToast({
        title: '密码错误',
        icon:"none"
      });
      return;
    }else if(data ==="error"){
      wx.showToast({
        title: '请检查您的账号是否正确',
        icon:"none"
      });
      return;
    }else if(data === "success"){
      wx.setStorageSync('login_account',true);
      wx.setStorageSync('account',params);
      wx.switchTab({
        url: '../me/me',
        success:()=>{
          wx.showToast({
            title: '登陆成功',
            icon:"none"
          });
        }
      })
    }

  },

  getUserName(e){
    this.setData({
      username:e.detail.value
    })
  },

  getPassword(e){
    this.setData({
      password:e.detail.value
    })
  },

  toRegister(e){
    wx.redirectTo({
      url: '../register/register',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const openid = wx.getStorageSync('openid'); 
    //判断是否已经登陆过，登陆过就直接去首页 
    if(wx.getStorageSync('login_account')){
      wx.switchTab({
        url: '../me/me',
      })
    }else{
       if (!openid){
      const {code}=await wx.login();
      const params1 = {
        code
      }
      //发起网络请求
      const result1 = await ajax('/login','GET',params1);
      const {data}=result1;
      if(data !== 'error'){
        wx.setStorageSync('openid', data);
      };
    
      if (code) {
         console.log("成功获取openid")
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
    }
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})