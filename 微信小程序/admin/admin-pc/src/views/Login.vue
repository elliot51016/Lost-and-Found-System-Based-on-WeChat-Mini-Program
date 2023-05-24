<template>
    <div class="body">
        <img class="bg" src="../assets/bg.jpg" alt="">
        <div class="from">
            <h2>校园失物招领后台管理系统</h2>
         <el-input v-model="username" placeholder="请输入账号"></el-input>
         <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
         <el-button @click="submit">登陆</el-button>
        </div>
        
    </div>
</template>

<script>
    export default {
        data(){
                return{
                    username:"",
                    password:""
                }
        },
        methods:{
         async   submit(){
                const {username,password} = this;
                if(!username||!password){
                    // console.log(this.$http)
                   
                    this.$message.error("存在必填项未填");
                    
                    return;
                   }else{
                  
                    const params ={
                    username,
                    password
                };
                const res = await this.$http.post("/admin/login",params)
               
                const {data} = res;
                if (typeof data ==='object'){
                    //将数据转成json存入本地缓存
                    localStorage.setItem('userInfo',JSON.stringify(data))
                    this.$message.success("登录成功！");
                    this.$router.push("/home")
                }else{
                    this.$message.error("账号或密码错误")  
                  
                }
               
               
                   }
                
            }
        }
    }
</script>

<style lang="less" scoped>
.body{
    width: 100vw;
    height: 100vh;
    position: relative;
    .bg{
        width: 100vw;
         height: 100vh;
         position: absolute;
         z-index: 10;
    }
    .from{
        position:absolute;
        z-index: 11 ;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);


        background-color: aqua;
        padding: 20px 30px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        h2{
            margin-bottom: 20px;
        }
        .el-input{
            margin-bottom: 10px;
            width: 300px;
        }
        .el-button{
            width: 100px;
        }
    }
}


</style>