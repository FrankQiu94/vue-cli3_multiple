# 基于vue-cli3脚手架搭建多页面应用  

## 开发  

### 初始化  

*建议使用yarn替代npm，常用的命令区别如下表：*   
| 命令 | yarn | npm |  
| :---: | --- | --- |  
| 安装依赖 | npm install | yarn |  
| --- | npm install --save [package] | yarn add [package]  |  
| --- | npm install --save-dev [package] | yarn add [package] [--dev/-D] |  
| --- | npm install --global [package] | yarn global add [package] |  
| --- | npm install [package]@[version] | yarn add [package]@[version] |  
| 卸载依赖 | npm uninstall --save [package] | yarn remove [package] |  
| --- | npm uninstall --save-dev [package] | yarn remove [package] [--dev/-D] |  
| 更新依赖 | rm -rf node_modules && npm install | yarn upgrade |  

1. 安装yarn
>  **npm install -g yarn**  或  **brew install yarn**  

2. clone代码  
```bash
git clone https://github.com/FrankQiu94/vue-cli3_multiple.git

cd vue-cli3_multiple

yarn install
```  
  
## 使用  

 1.  `src/common/config/title.js` 配置对应项目的title；`src/common/config/dependence.js` 抽离对应项目过大的依赖，防止app.js文件过大；  
 2.  `src/api/` 配置项目所需的接口；  
 3.  `src/components/` 放置公用的组件；  
 4. **`src/pages` 项目目录，建立与 `title.js` 对应的项目文件夹名，并新建 `main.js` （因为打包规则，名字不可变更）作为入口文件；**  
 5. tips  
   * 使用本地mock数据: `yarn dev` 或 `npm run dev`；  
   * 使用后端环境数据: `yarn test` 或 `npm run test`；  
   * 本地代理可任意选用easymock等代理平台，所有相关接口请在此处设置；  
   * 后端环境自行于 `.env.test` 文件中修改 `VUE_APP_HOSTAPI` 为对应的接口HOST+PORT。  
 6. 具体可参考现有项目结构。

* 打包:
	* 输出html/css/js: `yarn test`  

	*打包直接输出静态页面，已完成背景图和img标签对于图片路径的处理，因为项目预计部署在Server的根路径，故未做`baseUrl`和`assertDir`的进一步处理*  

因为本项目并未暴露根路径下 `index.html`，默认端口号 `8181`  ，所以开发环境下请自行在url后输入相应的项目文件夹名，打开 `project1` 项目（例）：  
```
http://localhost:8181/project1
```   

- 开发环境下使用手机调试，可将 `127.0.0.1` 替换为本地ip，即可在局域网环境下通过手机调试；  
 - 可将替换后的链接通过 [草料二维码](https://cli.im/) 直接生成二维码，扫码调试～  

## 目录结构  
```bash
|-- vue.config.js // 打包配置文件
|-- public
|   |-- favicon.ico // icon/short-icon
|-- src // 项目代码
    |-- api // 项目的api接口声明，通过 import Api from '@api/api' 可直接调用
    |   |-- api.js // 接口export
    |   |-- project
    |   |   |-- project.js
    |-- common // 公用资源文件夹
    |   |-- actions
    |   |   |-- fitWap.js
    |   |   |-- service.js // 根据axios针对做了一个初步二次封装
    |   |   |-- utils.js // 封装的公共方法库
    |   |   |-- ...
    |   |-- config
    |   |   |-- title.js // 项目对应页面的title配置文件
    |   |   |-- dependence.js // 项目对应页面的需要抽离过大的依赖文件
    |   |-- pages
    |   |   |-- index.html // 所有页面打包的基础html，可以对相应的部分页面做单独模版，具体在 vue.config.js 里做修改
    |   |-- styles
    |       |-- common.css // 基础css，处理一些浏览器自带的样式问题，后期可上传至cdn，直接在 index.html 文件里引入
    |       |-- normalize.css
    |-- components // 公用组件文件夹
    |   |-- HelloWorld.vue
    |   |-- ...
    |-- pages // 项目代码
        |-- project1 // 项目一
        |   |-- App.vue // 项目根vue文件
        |   |-- main.js // 文件名不建议修改，修改需要同步修改vue.config.js配置，防止打包 entry 出现错误，一般不做变更，但可根据自己需求在Vue上直接挂载相应的依赖
        |   |-- component // 项目的组件
        |   |   |-- project1.vue
        |   |-- img // 项目的图片等静态资源
        |       |-- logo.png
        |-- project2 // 项目二
            |-- App.vue
            |-- main.js
            |-- router.js // 多页面项目中嵌套SPA可配置路由
            |-- component
            |   |-- home.vue
            |   |-- project2.vue
            |-- img
                |-- logo.png
```  
  
## 参考资料  

[Vue CLI 3 官方文档](https://cli.vuejs.org/zh/)  
[lance-yi/vue-cli3-multipage](https://github.com/lance-yi/vue-cli3-multipage)   
[Plortinus/vue-multiple-pages](https://github.com/Plortinus/vue-multiple-pages)  