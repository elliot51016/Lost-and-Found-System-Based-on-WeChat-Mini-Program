1. 将npm镜像源切换为淘宝镜像
npm config set registry http://registry.npm.taobao.org
2. 下载node.js框架express
npm install express --save

3. 下载全局nodemon解决nodejs代码更新后要重新启动服务的痛点
npm install nodemon -g 

4. 运行该服务
nodemon

5. 若无法加载文件 D:\Program Files\nodejs\node_global\nodemon.ps1，因为在此系统上禁止运行脚本
set-ExecutionPolicy RemoteSigned 设置权限即可运行
 
6. node.js 链接mongodb数据库
npm install mongoose --save

7. 安装mongoose 这是mongodb 的nodejs 驱动库通过使用mongoose提供的接口可以更好的操作数据库
npm install mongoose --saveall mongoose --save

8. 下载multer 来实现文件的上传与存储
npm install multer --save

9. 下载uuid来实现返回不重复的字符串
npm install uuid --save

10. 下载axios实现网络请求
npm install axios   --save


前端想访问后端，就要通过接口来访问。无论什么操作都要去通过接口去通知后端