// pages/search/search.js
import { ajax } from "../../utils/index";

let t = null;
//怎么对搜索历史进行的赋值过程？
//首先页面渲染时通过onload。获取缓存中的searchLog。
//通过wx:for赋值显示渲染出搜索历史
// 当搜索框内内容被延迟响应获取到后，将本次搜索的内容添加到数组searchLog的头部，并对页面的视图进行赋值显示。达到动态变化的效果
//最后将更改后的searchlog重新存入缓存
Page({

  /**
   * 页面的初始数据
   */
  data: {
      //延迟响应
        search:'',
        //及时响应
        _search:'',
        //搜索历史
        searchLog:[],
        //搜索结果
        searchRes:[],
  },
  toSearchLog(e){
    const {name} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../searchResult/searechResult?name=${name}`,
    })

  },
  toDetail(e){
   
    const {info:{_id}} = e.currentTarget.dataset;
  wx.navigateTo({
    //url只能传字符串 所以传数据之前要转成字符串
    url: `../infoDetail/infoDetail?_id=${_id}`,
  })
},
  deleteLog(){
     //删除视图内的数据
      this.setData({
        searchLog:[]
      });
      //删除缓存中的数据  
      wx.removeStorageSync('searchLog')
  },

  deleteSearch(e){
      this.setData({
          search:'',
          _search:''
      })
      //防止删除快过抖动
      clearTimeout(t);
  },
  getSearch(e){
    
      this.setData({
        _search:e.detail.value 
      })
       //实现简单版防抖
      if (t) clearTimeout(t);
         t =  setTimeout(async () => {
        this.setData({
          search: e.detail.value
        })
        if (e.detail.value){
          let  searchLog = wx.getStorageSync('searchLog');
          if (searchLog){
            //缓存有值
            searchLog.unshift(e.detail.value);
      }else{
            //没有 缓存 
            searchLog=  [e.detail.value];
      } 
      wx.setStorageSync('searchLog', searchLog)
      this.setData({
        searchLog
      })
        }
        const params = {
         name: e.detail.value
        }
        const result = await ajax('/searchLose','GET',params);
        // console.log(result);
        const {data} = result;
        this.setData({
          searchRes:data
        })
      }, 1000);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        const searchLog = wx.getStorageSync('searchLog');
        this.setData({
          searchLog
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