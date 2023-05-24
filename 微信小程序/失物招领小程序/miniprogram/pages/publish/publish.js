// pages/publish/publish.js
import {ajax} from '../../utils/index';
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    multiArray:[["卡片、证件类","生活用品","数码产品","美妆护肤类","衣服物品类","饰品","文娱","其它"],
    ['身份证','校园卡','学生证','水卡','公交卡','银行卡','其它'],],
    //第二列的储备数据
    pickerList:[
      ['身份证','校园卡','学生证','水卡','公交卡','银行卡','其它'],
      ['水杯','雨伞','小风扇','钥匙/钥匙扣','其它'],
      ['手机','相机','U盘/硬盘','充电宝','平板电脑','鼠标','充电线','耳机','手写笔','支架','音箱','MP3','其它'],
      ['口红','粉底','眉笔','腮红','眼影','防晒','喷雾','香水','其它'],
      ['男装','女装','男鞋','女鞋','包包','其它'],
      ['手表','项链','手链','戒指','耳饰','眼镜','帽子','发饰','其它'],
      ['教材','笔记','文具','球/球拍','护具','跳绳','自行车','棋牌','其它'],
      ['药品','零食','周边','其它']
      ],
    multiIndex: [0, 0 ],
    select:false,
    name:'',
    date:'',
    region:'',
    phone:'',
    desc:'',
    imgList:[],
    type:'',
    type_check:false,
    name_check:false,
    date_check:false,
    region_check:false,
    phone_check:false,
    id:''
    

  },
  async toPublish(){

      const {
        type,
        multiArray,
        multiIndex,
        name,
        date,
        region,
        phone,
        desc, 
        imgList,
        select,
        id
      } = this.data;
      
      if(!type){
        this.setData({
          type_check:true
        })
      }
      if(!name){
        this.setData({
          name_check:true
        })
      }
      if(!date){
        this.setData({
          date_check:true
        })
      }
      if(!region){
        this.setData({
          region_check:true
        })
      }
      if(!phone){
        this.setData({

          phone_check:true
        })
      }

      if ( !type || !select || ! name || ! date || ! region || ! phone){
        wx.showToast({
          title: '未填写必填项',
          icon :'none',
        })
        return
      }
      if(id){
        //修改
        const params = {
          openid:wx.getStorageSync('openid'),
          type:Number(type),
          classify1:multiArray[0][multiIndex[0]],
          classify2:multiArray[1][multiIndex[1]],
          name,
          date,
          region,
          phone,
          desc,
          imgList,
          time:new Date().getTime(),
          id
        }
        const {data} = await ajax('/updateLose','POST',params)
        if (data ==="success"){
          wx.switchTab({
               url: '../index/index',
               success:()=>{
                 wx.showToast({
                   title: '修改成功',
                   icon:'none',
                 })
               }
       })
      }else{
        wx.showToast({
          title: '修改失败',
          icon:'none',
        })
      }

      }else{
        //发布
        const params = {
          openid:wx.getStorageSync('openid'),
          type:Number(type),
          classify1:multiArray[0][multiIndex[0]],
          classify2:multiArray[1][multiIndex[1]],
          name,
          date,
          region,
          phone,
          desc,
          imgList,
          time:new Date().getTime()
        }
        // console.log(params)
        const result = await ajax('/publish','POST',params)
        const {data } = result;
  
            if (data ==="success"){
                wx.switchTab({
                     url: '../index/index',
                     success:()=>{
                       wx.showToast({
                         title: '发布成功',
                         icon:'none',
                       })
                     }
             })
            }else{
              wx.showToast({
                title: '发布失败',
                icon:'none',
              })
            }
      }
    

     


  },

  backPage(){ 
    //返回上一页 如果是第一页将无法返回
    wx.navigateBack()
    //直接返回指定页面
    // wx.switchTab({
    //   url: '../index/index',
    // })
  },
  selectType  (e){
      const {id} = e.currentTarget.dataset;
      this.setData({
          type:id,
          type_check:false
      })

  },

  deleteImg(e){
    let {index} =e.currentTarget.dataset;
    let  {imgList} =this.data;
    //删除数组中制定位置的元素
    imgList.splice(index,1);
    this.setData({
      imgList
    })
  },

  uploadImg(e){
    let {imgList} = this.data;
    // console.log(imgList.length)
    wx.chooseMedia({
    
      count: 6-imgList.length ,
      
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success:(res)=> {
        const {tempFiles} =res;
            //  console.log(tempFiles)
            tempFiles.forEach(item => {
              // console.log(item)  item就是遍历后得到的数组 再将这个数组中的tempFilePath输入到imglist就好了
              //imgList.unshift(item.tempFilePath)   这样就将临时路径放入的imglist数组供前端临时使用

              wx.uploadFile({
                url: 'http://localhost:3000/uploadImg', //本地接口地址
                filePath: item.tempFilePath,
                name: 'file',
                success:(res)=>{ 
                  // console.log(res)
                  // console.log(JSON.parse(res.data))
                  const {data} = res;
                  let {filename} = JSON.parse(data)[0];
                  let {fieldname} = JSON.parse(data)[0];
                  let _path =`http://localhost:3000/${fieldname}/${filename}`;
                  // console.log(_path);
                  imgList.unshift(_path);
                  this.setData({
                  imgList
                  })
                
 
                  //do something
                },
                fail: (err)=>{
                  console.log(err);
                }
              })
          
            });



           
            // console.log(this.data.imgList)
        // console.log(res.tempFiles.tempFilePath)
        // console.log(res.tempFiles.size)
      }
    })
  },
  deleteDesc(e){
      this.setData({
        desc:''
      })
  },

  getName(e){
    this.setData({
      name : e.detail.value,
      name_check:false
    })
  },
  getDate(e){
    this.setData({
      date : e.detail.value,
      date_check:false
    })
  },
  getRegion(e){
    this.setData({
      region : e.detail.value,
      region_check:false
    })
  },
  getPhone(e){
    this.setData({
      phone : e.detail.value,
      phone_check:false
    })
  },
  getDesc(e){
    this.setData({
      desc : e.detail.value
      // .trim() 想去掉输入框内的空格可以加
    })
  },

  closeSelect(e){
      this.setData({
        select:false,
        multiIndex: [0, 0 ],
      })
  },

  bindMultiPickerChange(e){
    this.setData({
      select:true
    })
    },
  bindMultiPickerColumnChange(e){
    let{column , value} = e.detail; 
    let data = this.data;
    let {multiArray,pickerList}=this.data;
    if(column===0){
      multiArray[1]=pickerList[value];
      data.multiIndex[1]=0;
    }
    data.multiArray = multiArray;
    data.multiIndex[column]=value;
    
    this.setData(data);
    // console.log(value);
    // console.log( column)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const {id} =options;
    const {multiArray,pickerList} = this.data;
    if(id){
    const params = {
      _id :id
    }
    const {data} = await ajax('/getDetail','POST',params)
   const {type , classify1 , classify2,name,date,region,phone,desc,imgList} = data;
   const index1 = multiArray[0].findIndex(item=>item===classify1);   
   const index2 = pickerList[index1].findIndex(item=>item===classify2);   

   this.setData({
     select:true,
     type:String(type),
     multiArray:[multiArray[0],pickerList[index1]],
     multiIndex:[index1,index2]
     ,name,date,region,phone,desc,imgList,id
   }) 


    }

    const userInfo = wx.getStorageSync('userInfo');
    if(userInfo&&userInfo.phone){
      this.setData({
        phone:userInfo.phone
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