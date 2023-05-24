// pages/infoDetail/infoDetail.js
import {ajax,formatTime} from '../../utils/index';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:['../../images/banner1.jpg','../../images/banner2.jpg','../../images/banner3.jpg','../../images/banner4.jpg','../../images/banner5.jpg'],

    collectionIcon:["../../images/DTcollection.png","../../images/DTcollection-fill.png"]  ,
    info:{},
    //收藏标识
    from:'',
    comment:"",
    avatarUrl:'',
    nickName:'',
    login:true,
    showModal:false,
    desc:'',
    img_url:''
  },
  uploadImg(e){
    // let {img_url} = this.data;
    wx.chooseMedia({
    
      count:1 ,
      
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        const {tempFiles} =res;
        wx.uploadFile({
          url: 'http://localhost:3000/uploadImg', //本地接口地址
          filePath: tempFiles[0].tempFilePath,
          name: 'file',
          success:(res)=>{ 
            // console.log(res)
            // console.log(JSON.parse(res.data))
            const {data} = res;
            let {filename} = JSON.parse(data)[0];
            let {fieldname} = JSON.parse(data)[0];
            let _path =`http://localhost:3000/${fieldname}/${filename}`;
            this.setData({
            img_url:_path
            })
          

            //do something
          },
          fail: (err)=>{
            console.log(err);
          }
        })
      }
    })
  },
  getDesc(e){
    this.setData({
      desc:e.detail.value
    })
  },
 async submit(){
    const {desc,img_url,info:{_id}} = this.data;
    if(!desc || !img_url){
      wx.showToast({
        title: '存在必填项未填',
        icon:'none'
      })
      return
    }
    const params ={
      desc,
      img_url, 
      openid:wx.getStorageSync('openid'),
      _id
    }
    const {data} = await ajax("/toClaim",'POST',params); 
    if(data==='success'){
      this.setData({
        showModal:false
      })
      wx.switchTab({
        url: '../index/index',
        success:()=>{
          wx.showToast({ 
            title: '提交成功',
            icon:"none"
          })
        },
      })
       
        // this.onLoad();
    }else{
      wx.showToast({
        title: '提交失败',
        icon:'none'
      })
    }


 
  },
  cancel(){
    this.setData({
      showModal:false
    })
  },
 
  toClaim(e ){
    this.setData({
      showModal:true
    })
  },
  async submitComment(){
    const {comment,info:{_id}} = this.data;
    if(comment.trim().length===0){
      wx.showToast({
        title: '您输入的评论内容为空',
        icon:'none'
      })
      return
    }
    const {
      avatarUrl,  nickName
    } =wx.getStorageSync('userInfo')
    const params = {
      avatarUrl,nickName,content:comment,time : new Date().getTime(), _id
    }
    const {data:{status,data}} = await ajax("/addComment","POST",params)
   
    if(status==="success"){
      wx.showToast({
        title: '评论成功',
        icon:'none'
      })

      data.commentList.forEach(item=>{
        item.time = formatTime(item.time)
      })
      this.setData({
        info:data,
      comment:""
      })
    }else{
      wx.showToast({
        title: '评论失败',
        icon:'none'
      })
    }

  }, 
  getComment(e){
      this.setData({
        comment:e.detail.value
      })
  },
  async toCollection(e){
      const {info,collectionIcon,from} = this.data;
      const {
        _id
      } =info
      if (collectionIcon[0]==='../../images/DTcollection.png'){
       
        //收藏 
        const params = {  
             id:_id,
             openid:wx.getStorageSync('openid')
        }
        const  {data} = await ajax('/toCollection','POST',params)
            if(data==="success"){
              wx.showToast({
                title: '收藏成功',
                icon:"none"
              })
              let last = collectionIcon.pop();
              collectionIcon.unshift(last);
              this.setData({
                collectionIcon,
              })
            }
     
      }else{
        //取消收藏
        const params ={
          id: _id,
           openid:wx.getStorageSync('openid'),
        }
        const result = await ajax('/cancelCollection','POST',params)
        const{data}=result;
        //  console.log(data)
         if(data==='success'){
           wx.showToast({
             title: '取消成功',
             icon:'none'
           })
           let last = collectionIcon.pop();
            collectionIcon.unshift(last);
            this.setData({
              collectionIcon,
            })
         }else{
          console.log("failCollection")
         }

      }
      // let collectionIcon=this.data.collectionIcon;
     
  },

  getPhone(e){
    
    // const {info:{state}} = this.data;
    // console.log(state)
    this.setData({
      login:!!wx.getStorageSync('login')
    })
    // console.log(this.data.login)
    if(this.data.login){
      const {info} = this.data;
      wx.showModal({
        title: '联系方式',
        content: info.phone,
        confirmText:'复制',
        success: (res) => {
          if (res.confirm) {
            wx.setClipboardData({
              data: info.phone,
              success (res) {
                wx.showToast({
                  title: '内容已复制',
                  icon: 'none'
                })
              
              }
            })
          }
          if (res.cancel) {
             
          }
      
          
        }
      })
    }else{
      wx.showToast({
        title: '请您先进行认领操作',
        icon:'none'
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
        const {collectionIcon} =this.data;
          const{_id} =options;

        const _params = {_id}
        
        const {data:info} = await ajax('/getDetail','POST',_params);
       
        if(info.commentList){
          info.commentList.forEach(item=>{
            item.time = formatTime(item.time)
          })
        }

          this.setData({
            info
          })
          
          const params = {
            id:_id,
            openid: wx.getStorageSync('openid')
          }
          const result = await ajax('/checkCollection','POST',params)
          const {data} = result;
              if(data.length>0){
                let last = collectionIcon.pop();
              collectionIcon.unshift(last);
              this.setData({
                collectionIcon,
              })
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