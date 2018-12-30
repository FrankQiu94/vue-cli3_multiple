# 基于vue-cli3脚手架搭建多页面应用
## 初始化
1. 安装yarn
>  **npm install -g yarn**  或  **brew install yarn**

2. clone代码  
```bash
git clone https://github.com/FrankQiu94/vue-cli3_multiple.git
cd vue-cli3_multiple
yarn install
```  
##使用  
* 开发:
	* 使用本地mock数据: `yarn dev`
	* 使用测试环境数据: `yarn test`  

	*已设置反向代理，在 `.env.development` 或 `.env.test` 文件中修改 `VUE_APP_HOSTAPI` value值为对应的接口HOST*
* 打包:
	* 输出html/css/js: `yarn test`  

	*打包直接输出静态页面，已完成背景图和img标签对于图片路径的处理，因为项目预计部署在Server的根路径，故未做`baseUrl`和`assertDir`的进一步处理*

##目录结构  
```bash
├─public
│	favicon.ico // icon/short-icon
├─src // 项目代码
│	├─api	// 项目的api接口声明，通过 import Api from '@api/api' 可直接调用
│		├─project1
│				project1.js
│		├─project2
│				project2.js
│		api.js // 接口export
│	├─common // 公用资源文件夹
│		├─actions
│			service.js // 根据axios针对做了一个初步二次封装
│		├─pages
│			index.html // 所有页面打包的基础html，可以对相应的部分页面做单独模版，具体在 vue.config.js 里做修改
│			title.js // 项目对应页面的title配置文件
│		├─styles
│			common.css // 基础css，处理一些浏览器自带的样式问题，后期可上传至cdn，直接在 index.html 文件里引入
│	├─components // 公用组件文件夹
│		HelloWorld.vue
│	├─pages
│		├─project1
│			├─components // 项目的私有vue文件
│				project1.vue
│			├─img // 项目的图片等静态资源
│				logo.png
│			App.vue // 项目主要内容
│			main.js // 文件名不建议修改，修改需要同步修改vue.config.js配置，防止打包 entry 出现错误，一般不做变更，但可根据自己需求在Vue上直接挂载相应的依赖
│		├─project2
│			├─components
│				header.vue
│				project2.vue
│			├─img
│				logo.png
│			App.vue
│			main.js
│			router.js // 多页面项目中嵌套SPA可配置路由
└─	vue.config,js // cli3打包配置文件
```  
防止页面项目出现其他业务的依赖包，本次打包对chunk文件并未做抽离处理，故可根据需求自行在 `App.vue` 文件中进行依赖包的引入  
```bash
config.optimization.delete('splitChunks')
```  
## 参考资料
[Vue CLI 3 官方文档](https://cli.vuejs.org/zh/)  
[lance-yi/vue-cli3-multipage](https://github.com/lance-yi/vue-cli3-multipage)   
[Plortinus/vue-multiple-pages](https://github.com/Plortinus/vue-multiple-pages)  