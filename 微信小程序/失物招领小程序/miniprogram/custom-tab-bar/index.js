Component({
  data:{
    select:0,
    list: [
    {
    pagePath: "/pages/index/index",
    text: "首页",
    iconPath: "/images/index.png",
    selectedIconPath: "/images/index_fill.png",
    type:0,
  },
  {
    pagePath: "/pages/classify/classify",
    text: "分类",
    iconPath: "/images/classify.png",
    selectedIconPath: "/images/classify_fill.png",
    type:0,
  },
{

  type:1,
  pagePath: "/pages/publish/publish",
},
  {
    pagePath: "/pages/collection/collection",
    text: "收藏",
    iconPath: "/images/collection.png",
    selectedIconPath: "/images/collection_fill.png",
    type:0,
  },
  {
    pagePath: "/pages/me/me",
    text: "我的",
    iconPath: "/images/me.png",
    selectedIconPath: "/images/me_fill.png",
    type:0,
  }
]



},
  methods:{
    selectPage(e){
      const{index,page,type}=e.currentTarget.dataset;
      if (index !== this.data.select && type==0 ){
        if(!wx.getStorageSync('login')){
          wx.showToast({
            title: '请您先登陆',
            icon:'none'
          })
          return
        }else{
          wx.switchTab({
            url: page,
          })
        }
       
      }else{
        if(!wx.getStorageSync('login')){
          wx.showToast({
            title: '请您先登陆',
            icon:'none'
          })
          return
        }else{
          wx.navigateTo({
            url: page,
          })
        }
        
      }
    } 
  }


})