import {formatTime,ajax} from '../../utils/index';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:['../../images/banner1.jpg','../../images/banner2.jpg','../../images/banner3.jpg','../../images/banner4.jpg','../../images/banner5.jpg'],
    tabList:['寻主','寻物'],
    select: 0,
    list:[],
    
  },
  toSearch(){
      wx.navigateTo({
        url: '../search/search',
      })
  },

  toDetail(e){

    const {info:{_id,state}} = e.currentTarget.dataset;
    if(state===2){
      wx.showToast({
        title: '该物品已被认领，如有疑问联系管理员',
        icon:'none'
      })
      return
    }
    // console.log(_id)
  wx.navigateTo({
    //url只能传字符串 所以传数据之前要转成字符串
    url: `../infoDetail/infoDetail?_id=${_id}`,
  })
},
  getTab(e){
    this.setData({
      select:e.detail
    }),
    this.onLoad();
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
      const {select} = this.data;
      const params={
        type:select
      }
      //判断是否登陆 若未登陆则回登录页
      if(!wx.getStorageSync('login_account')){
        wx.redirectTo({
          url: '../login/login',
        })
      }else{
        const result =await ajax('/getLose','GET',params)
        const {data} = result;
        this.setData({
          list:data.map(item=>{ 
            return{
              //扩展运算符
              ...item,
              time: formatTime(item.time)
            }
          })
        })
        const openid = wx.getStorageSync('openid');
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
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
      if (typeof this.getTabBar==='function'&&this.getTabBar()){
        this.getTabBar().setData({
          select:0
        })
      }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})