import { ajax } from "../../utils/index";
import {formatTime} from "../../utils/index";
// pages/myPublish/myPublish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:["寻主","寻物"],
    list:[],
    select:0
  },
  async getDelete(e){
        const id = e.detail;
        const params = {
          _id :id
        }
        const {data} = await ajax('/deleteLose','POST',params)
        if(data==="success"){
          wx.showToast({
            title: '删除成功！',
            icon:'none',
            success:()=>{
              this.onLoad()
            }
          })
        }else{
          wx.showToast({
            title: '删除失败！',
            icon:'none'
          })
        }
  },
  async getUpdate(e){
    const id = e.detail;
    wx.navigateTo({
      url: `../publish/publish?id=${id}`,
    })
  },
  toDetail(e){
    const {info:{_id}} = e.currentTarget.dataset;
  wx.navigateTo({
    //url只能传字符串 所以传数据之前要转成字符串
    url: `../infoDetail/infoDetail?_id=${_id}`,
  })
},
  getTab(e){
    // console.log(e.detail),
    this.setData({
      select:e.detail
    }),
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
      const {select} = this.data;   
      const params = {
        openid :wx.getStorageSync('openid'),
        type : select 
      };
      const result = await ajax("/getMyPublish",'GET',params)
      // console.log(result) 
      const {data} = result ;
      this.setData({
        list : data.map(item =>{
          return{
              ...item,
              time:formatTime(item.time)
          }
        }).reverse()
      })

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