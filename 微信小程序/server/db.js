//mongoose 是一个操作 mongodb 的nodejs 驱动库。
//1. 这一步是引入mongoose依赖包
const mongoose = require('mongoose');
//2.链接mongodb数据库
mongoose.connect("mongodb://localhost:27017/loseMg")
.then( ()=>{
    console.log("数据库连接成功")
}) 
.catch(()=>{
    console.log("数据库连接失败",err)
})

//每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力
    //丢失物品表 通过mongoose在链接的loseMG 数据库内建表LoseSchema
    const LoseSchema = new mongoose.Schema({
        openid:{
            type:String
        },
        type:{
            type:Number
        },
        classify1:{
             type:String
        },
        classify2:{
            type:String
        },
        name:{
            type:String 
        },
        date:{
            type:String
        },
        region:{
            type:String
        },
        phone:{
            type:String
        },
        desc:{
            type:String,
            default: ''
        },
        imgList:{
            type:Array,
            default:[]
        },
        time:{
            type:Number
        },
        commentList:{
             type:Array,
             default:[]
        },
        claimInfo:{         //认领信息
            type:mongoose.Schema.Types.Mixed,
            default:{}
        },
        state:{     //认领状态  0未认领  1认领中  2已认领
            type:Number, 
            default:0
        }

    })
 
    //收藏物品表    
    const CollectionSchema = new mongoose.Schema({ 
        //谁收藏的？
        openid:{
            type : String
        },
        //收藏的什么东西？ 对应Lose表的_id
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Lose'
        },
       
    })

    //用户账号
    const UserSchema = new mongoose.Schema({
        openid :{
            type:String 
        },
        username:{
            type: String 
        },
        password:{
            type:String
        },
        date:{
            type:Number
        }
    })

    //管理员账号
    const AdminSchema = new mongoose.Schema({
        username:{
            type:String
        },
        password:{
            type:String
        },
        create_time:{
            type:Number
        },
        //0代表超级管理员 1代表管理员
        role:{
            type:Number
        },
        nickname:{
            type:String
        }
    })


    //Model是由Schema编译而成的假想（fancy）构造器，
    // 具有抽象属性和行为。Model的每一个实例（instance）
    // 就是一个document，document可以保存到数据库和对数据库进行操作。
    // 简单说就是model是由schema生成的模型，可以对数据库的操作。
    const Lose = mongoose.model("Lose",LoseSchema)
    const Collection =mongoose.model("Collection",CollectionSchema)
    const User =mongoose.model("User",UserSchema);
    const Admin = mongoose.model("Admin",AdminSchema);



   // 创建超级管理员
    // Admin.create({
    //     username:"admin",
    //     password:123456,
    //     create_time:1683176028399,
    //     role:0,
    //     nickname:"superAdmin"
    // })   

    // for (let i =0 ;i<10 ; i++){
    //     Lose.create({
    //         openid:'6450c65550442cfa5cdf240d',
    //         type:0,
    //         classify1:'卡片、证件类',
    //         classify2:'身份证',
    //         name:'1',
    //         date:'2',
    //         region:'3',
    //         phone:'4',
    //         desc:'5',
    //         imgList:[ "http://localhost:3000/file/8effe079-aa6e-49a4-9ae9-ab4bd9a4e2c1.png" ],
    //         time:1683015253326.0
             
    //     })
    // }
    module.exports = {
        Lose ,
        Collection,
        User,
        Admin
    }