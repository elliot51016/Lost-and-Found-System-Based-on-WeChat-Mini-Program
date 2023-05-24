const express = require ('express');
const app = express();
//将表导入
const{Lose,Collection,User,Admin}= require('./db');
//将下载的中间件引入来解决文件上传储存的问题
const multer =require('multer');
////将下载的中间件引入来返回不重复的字符串
const {v4} =require ('uuid');
//引入网络请求的中间件
const axios = require('axios');

//使用中间件来解决get请求的解析问题req.body;
app.use(express.urlencoded({ extended:true}));
app.use(express.json());
//允许浏览器访问本地服务器内容
app.use(express.static(__dirname));
//解决不同服务之间端口不同所造成的跨域问题 8080和3000端口
app.all("*",(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Headers",'*');

    next();
})
//设置文件存储的格式和位置
const storage =multer.diskStorage ({
    //cn:callback
    destination: (req, file, cb)=> {
        cb(null,"./file")
    }, 
    filename:(req,file,cb )=>{
        //type就是通过正则取的文件的类型
        let type = file.originalname.replace(/.+\./,".");
        // console.log(type);
        cb(null,`${v4()}${type}`)  
        //        cb(null,v4() + type) 也能识别 但是不标准  
  

    },
})

const upload = multer   ({storage});
 

// app.get("/hello", (req,res)=>{
//     res.send("success");
// })

//小程序端：发布接口 实现物品的发布功能 
app.post("/publish",async(req,res)=>{
    //1. 获取前端传过来的数据
    //2. 将数据存入Lose数据表里
    //post请求通过req.body获得前端传来的数据
    try {
        const { openid,type, classify1, classify2, name,  date, region, phone,  desc, imgList, time} =req.body;
    await Lose.create({
        openid,  type, classify1, classify2, name,  date, region, phone,  desc, imgList, time
    });
    res.send("success");
    } catch (error) {
        // console.log(error);
        res.send("error");
    }
    
})
//小程序端：上传图片
app.post("/uploadImg", upload.array("file",6 ) ,    (req,res)=>{
    res.send(req.files); 
}) 

//小程序端：获取首页的数据
app.get("/getLose", async (req,res)=>{
    //拿到前端传来的数据type   get请求通过req.qurery
    const {type} = req.query; 
    const result = await Lose.find({
        type,
    }).sort({time:-1});//降序排序  前端可以用reverse方法不推荐
            res.send(result);
})

//小程序端：收藏物品
app.post("/toCollection",async (req,res)=>{
    try{
         const {id,openid} =req.body;
    await Collection.create({
        id,openid
    })
    res.send("success");
}catch(error){
    // console.log(error);
    res.send("error")
}
     

})    
//小程序端：取消收藏
app.post("/cancelCollection",async(req,res)=>{
    try {
        const {id,openid} = req.body;
        await Collection.findOneAndRemove({id,openid});
         res.send("success")
    } catch (error) {
        // console.log(error)
        res.send("error");
    }
})

//小程序端：实现登陆操作    前端wx.login 获得code  去请求后端接口 把code传给后端 后端拿code和其它id去请求wx的接口 拿到appid返回给前端
app.get ("/login",async(req,res)=>{
    const {code} =  req.query;

    try {
        const {data: {openid}}= await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wx8cd4a42d1f55f375&secret=b250707a38c74696da0705725e02736a&js_code=${code}&grant_type=authorization_code`)
        // console.log(openid)
        res.send(openid)
    } catch (error) {
        // console.log(error);
        res.send("error");
    }
})   
  
//小程序端：查询当前物品有没有被当前的人收藏过
app.post("/checkCollection",async(req,res)=>{
    const {id,openid} =req.body;
    const result = await Collection.find({
        id, 
        openid
    });
    res.send(result);

})

//小程序端：获取收藏夹的数据
app.post("/getCollection", async (req,res)=>{
    const {openid,type} = req.body;
    const result = await Collection.find({
        openid,
        // type
    }).populate('id');
    const _result = result.filter(item=>item.id ?  item.id.type===type : false);
    res.send(_result); 
}) 
 
//小程序端：获取我的发布的数据
app.get("/getMyPublish",async(req,res)=>{
    const {openid,type} = req.query;
    const result = await  Lose.find({
        openid,
        type
    });
    res.send(result)
})   

//小程序端：通过二级分类查数据
app.post("/getClassifyTwo",async(req,res)=>{
    const {type,classify2} =req.body;
    const result = await Lose.find({
        type, 
        classify2
    });
    res.send(result); 

})

//小程序端：模糊查询物品名字searchLose
app.get("/searchLose", async (req,res)=>{
    const {name} = req.query;  
    //实现模糊查询
    const _name = new RegExp(name,'i');

    const result = await Lose.find({
        name:_name
    });
    res.send(result);     
})
//也可以通过if(type){}else()语句实现上下两个接口的复用
// type存在时查询历史二级页面 不存在时模糊查询物品名字
//小程序端：搜索历史点击二级界面
app.post("/searchLog",async(req,res)=>{
    const {name,type} =req.body;
    //实现模糊查询 
    const _name = new RegExp(name,'i');

    const result = await Lose.find({
        name:_name,
        type
    }); 
    res.send(result); 
 
})
//小程序端：注册
app.post("/register",async(req,res)=>{
    const {openid,username,password,date} =req.body;
   const result = await User.findOne({
    username
   })
    if(result){
        res.send("Registered")
    }else{
        await User.create({
            openid,username,password,date
        }); 
        res.send("success")
    }
 
})
 
//小程序端：登陆 登陆注册页
app.post("/toLogin",async(req,res)=>{
    const {username,password} =req.body;
    const result = await User.findOne({
        username,             
    }); 
    // console.log(password)
    // console.log(result[0].password)
    if(result){
        if(result.password===password){
            res.send("success")
        }else{
            res.send("pwdError")     
        }
    }else{
        res.send("error")
    }
   
})
//小程序端：删除用户发布的寻物或寻主数据
app.post("/deleteLose",async (req,res)=>{
    const {_id} = req.body;
    try {
        await Lose.findByIdAndRemove(_id);
        await Collection.deleteMany({
            id:_id
        });
        res.send("success")
    } catch (error) {
        res.send("error")
    }
})

//小程序端：查询物品详情数据getDetail
app.post("/getDetail",async (req,res)=>{
    const {_id} = req.body;
    // console.log(_id)
    try {
        const result = await Lose.findOne({_id});
        // console.log(result)
        res.send(result)
    } catch (error) { 
        res.send("error")
    }
})

////小程序端：修改寻物或寻主的数据
app.post("/updateLose",async(req,res)=>{
    const { openid,type, classify1, classify2, name,  date, region, phone,  desc, imgList, time,id} =req.body;
    try {
        await Lose.findByIdAndUpdate(id,{
            openid,type, classify1, classify2, name,  date, region, phone,  desc, imgList, time
        })
        res.send("success")
    } catch (error) {
        res.send("error")
    }
})

//微信小程序端:提交评论
app.post("/addComment", async(req,res)=>{
    //const定义的东西不能被修改 对象除外 
    const {avatarUrl,nickName,content,time,_id} = req.body;
  
    try {
        let result =await Lose.findById(_id);
        let {commentList} = result;
        
        commentList.unshift({
            avatarUrl,nickName,content,time
        })
        await Lose.findByIdAndUpdate(_id,{ 
            commentList
        })
        result["commentList"] = commentList;
        // const result = await Lose.findById(_id);

        res.send({
            status : "success",
            data:result
        });
    } catch (error) {
        res.send({
            status: "error",
            data:error
        });
    }
})

//认领物品
app.post('/toClaim',async(req,res)=>{
    try {
        const {desc,img_url,openid,_id} = req.body;
        await Lose.findByIdAndUpdate(_id,{
            claimInfo:{
                desc,img_url,openid
            },
            state:1
        })
        res.send('success')
    } catch (error) {
        res.send('error')
        console.log(error)
    }
})

//管理系统：管理员登陆
app.post("/admin/login",async(req,res)=>{
     const {username,password} = req.body;
     const result = await Admin.findOne({
        username
     })
     if (result&&result.password===password){
        //登陆成功
        res.send(result)
     }else{
        res.send("error")   
    }
        
})

//管理系统：寻主与寻物请求(取数据包含分页和数据量指定)
app.post("/admin/getLose",async(req,res)=>{
    const {type,page,size} = req.body; 
    try {
        const result = await Lose.find({
            type
        }).skip((page -1)*size ).limit(size).sort({time:-1});
        const total = await Lose.find({
            type
        }).countDocuments();
        res.send({
            result,
            total
        })
    } catch (error) {
        res.send("error")
    }
  
}) 

//管理系统：删除寻物/寻主
app.post("/admin/delete",async (req,res)=>{
    const {_id} = req.body;
    try {
        await Lose.findByIdAndRemove(_id);
        res.send("success")
    } catch (error) {
        res.send("error")
    }
})



//管理系统：用户数据
app.post("/admin/getUser",async(req,res)=>{
    const {page ,size,search}=req.body;
    try {
        if(search){
            const username =   new RegExp(search,'i');

            const result = await User.find({username}).skip((page -1)*size ).limit(size);
            const total = await User.find().countDocuments();
            
            res.send({
                result,
                total
            })
        }else{ const result = await User.find().skip((page -1)*size ).limit(size);
            const total = await User.find().countDocuments();
            
            res.send({
                result,
                total
            })}
       
    } catch (error) {
        res.send("error")
    }
})

//管理系统：删除用户信息
app.post("/admin/deleteUser",async (req,res)=>{
    const {_id} = req.body;
    try {
        await User.findByIdAndRemove(_id);
        res.send("success")
    } catch (error) {
        res.send("error")
    }
})

//管理系统：管理员信息
app.post("/admin/getAdmin",async(req,res)=>{
    const {page ,size,search}=req.body;
    try {
        if(search){
            const username =   new RegExp(search,'i');

            const result = await Admin.find({username}).skip((page -1)*size ).limit(size);
            const total = await Admin.find().countDocuments();
            
            res.send({
                result,
                total
            })
        }else{ const result = await Admin.find().skip((page -1)*size ).limit(size);
            const total = await Admin.find().countDocuments();
            
            res.send({
                result,
                total
            })}
       
    } catch (error) {
        res.send("error")
    }
})

//管理系统：删除管理员信息
app.post("/admin/deleteAdmin",async (req,res)=>{
    const {_id,username} = req.body;
    try {
        //权限校验
        const {role} = await Admin.findOne({username});

        if(role === 1){
                res.send('noPower')
        }else{
            await Admin.findByIdAndRemove(_id);
             res.send("success")
        }
    } catch (error) {
        res.send("error")
    }
})

//管理系统：新增管理员
app.post("/admin/addAdmin",async(req,res)=>{
    const {username,password,role,nickname,_id} = req.body;
    try {
             
        if(!await Admin.findOne({username})){
            if (_id){
                //编辑管理员信息
                await Admin.findByIdAndUpdate(
                   _id
                ,{
                    username,
                    password,
                    role,
                    nickname,
                })
            }else{
                //新增管理员信息
                await Admin.create({
                    username,
                    password,
                    role,
                    nickname,
                    create_time:new Date().getTime()
                })
            }    res.send("success")
        }else{
              res.send("nameError")
        }
       
       
      
    } catch (error) {
        res.send("error")
    }
})

//管理系统：查询当前管理员权限
app.post("/admin/getPower",async(req,res)=>{
    const {username} =req.body;
    try {
    const {role} =await Admin.findOne({username})
    if(role === 0){
        res.send(true)
    }else(
        res.send(false)
    )
    } catch (error) {
        res.send("error")
    }
})

//管理系统：审核认领操作
app.post('/admin/reviewClaim',async(req,res)=>{
    try {
       const {_id,state} =req.body;
       await Lose.findByIdAndUpdate(_id,{
        state
       });
       res.send("success")
    } catch (error) {
        res.send("error")
    }
})

app.listen(3000, ()=> {
    console.log('server running!');
}) 
