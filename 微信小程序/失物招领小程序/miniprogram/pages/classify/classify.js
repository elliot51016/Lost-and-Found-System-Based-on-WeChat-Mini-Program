// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
         asideBar:["卡片、证件类","生活用品类","数码产品类","美妆护肤类","衣服物品类","饰品","文娱","其它"],
         rightList:[
          [
			{url:"../../images/idCard.png",
              text:"身份证"},
			{url:"../../images/idCard01.png",
              text:'校园卡'},
			{url:"../../images/idCard02.png",
              text:'学生证'},
			{url:"../../images/idCard03.png",
              text:'水卡'},
			{url:"../../images/idCard04.png",
              text:'公交卡'},
			{url:"../../images/idCard05.png",
              text:'银行卡'},
			{url:"../../images/other.png",
              text:'其它'}
			  ],
          [
			{ url:"../../images/dailyUse.png",
              text:'水杯'},
			{url:"../../images/dailyUse01.png",
              text:'雨伞'},
			{url:"../../images/dailyUse02.png",
              text:'小风扇'},
			{url:"../../images/dailyUse03.png",
              text:'钥匙/钥匙扣'},
			{url:"../../images/other.png",
              text:'其它'}
		  ],
          [
			{url:"../../images/Digital.png",
              text:'手机'},
			{url:"../../images/Digital01.png",
              text:'相机'},
			{url:"../../images/Digital02.png",
              text:'U盘/硬盘'},
			{url:"../../images/Digital03.png",
              text:'充电宝'},
			{url:"../../images/Digital04.png",
              text:'平板电脑'},
			{url:"../../images/Digital05.png",
              text:'鼠标'},
			{url:"../../images/Digital06.png",
              text:'充电线'},
			{url:"../../images/Digital07.png",
              text:'耳机'},
			{url:"../../images/Digital08.png",
              text:'手写笔'},
			{url:"../../images/Digital09.png",
              text:'支架'},
			{url:"../../images/Digital10.png",
              text:'音箱'},
			{url:"../../images/Digital11.png",
              text:'MP3'},
			{url:"../../images/other.png",
              text:'其它'}
			  ],
          [
			{url:"../../images/Beauty.png",
              text:'口红'},
			{url:"../../images/Beauty01.png",
              text:'粉底'},
			{url:"../../images/Beauty02.png",
              text:'眉笔'},
			{url:"../../images/Beauty03.png",
              text:'腮红'},
			{url:"../../images/Beauty04.png",
              text:'眼影'},
			{url:"../../images/Beauty05.png",
              text:'防晒'},
			{url:"../../images/Beauty06.png",
              text:'喷雾'},
			{url:"../../images/Beauty07.png",
              text:'香水'},
			{url:"../../images/other.png",
              text:'其它'}
			  ],
          [
			{url:"../../images/clothing.png",
              text:'男装'},
			{url:"../../images/clothing01.png",
              text:'女装'},
			{url:"../../images/clothing02.png",
              text:'男鞋'},
			{url:"../../images/clothing03.png",
              text:'女鞋'},
			{url:"../../images/clothing04.png",
              text:'包包'},
			{url:"../../images/other.png",
              text:'其它'}
			  ],
          [
			{url:"../../images/decorations.png",
              text:'手表'},
			{url:"../../images/decorations01.png",
              text:'项链'},
			{url:"../../images/decorations02.png",
              text:'手链'},
			{url:"../../images/decorations03.png",
              text:'戒指'},
			{url:"../../images/decorations04.png",
              text:'耳饰'},
			{url:"../../images/decorations05.png",
              text:'眼镜'},
			{url:"../../images/decorations06.png",
              text:'帽子'},
			{url:"../../images/decorations07.png",
              text:'发饰'},
			{url:"../../images/other.png",
              text:'其它'}
			  ],
          [
			{url:"../../images/CR.png",
              text:'教材'},
			{url:"../../images/CR01.png",
              text:'笔记'},
			{url:"../../images/CR02.png",
              text:'文具'},
			{url:"../../images/CR03.png",
              text:'球/球拍'},
			{url:"../../images/CR04.png",
              text:'护具'},
			{url:"../../images/CR05.png",
              text:'跳绳'},
			{url:"../../images/CR06.png",
              text:'自行车'},
			{url:"../../images/CR07.png",
              text:'棋牌'},
			{url:"../../images/other.png",
              text:'其它'}
			  ],
          [
			{url:"../../images/drug.png",
              text:'药品'},
			{url:"../../images/eat.png",
              text:'零食'},
			{url:"../../images/peripheral.png",
              text:'周边'},
			{url:"../../images/other.png",
              text:'其它'}
			  ]
          ],
         select:0,
  },
  toClassify(e){
      const {text}  =  e.currentTarget.dataset;
      wx.navigateTo({
        url: `../classifyList/classifyList?text=${text}`,
      })
   },
  selectLeft(e){
    const {index}=e.currentTarget.dataset;
    this.setData({
      select:index
    })
  },
  toSearch(){
    wx.navigateTo({
      url: '../search/search',
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
    if (typeof this.getTabBar==='function'&&this.getTabBar()){
      this.getTabBar().setData({
        select:1
      })
    }
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