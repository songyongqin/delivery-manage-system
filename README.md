# 安天捕风蜜罐系统

## 环境依赖:
Node.js (NPM) 版本：^6.9.2  https://nodejs.org/en/ 

Git   https://git-scm.com/

## 快速开始

1.clone仓库到本地 

主分支
```
git clone https://git.antiy.org.cn/chenxinzhou/Attack-Capture-System.git -b master
```
或开发分支
```
git clone https://git.antiy.org.cn/chenxinzhou/Attack-Capture-System.git -b dev
```

2.进入代码所在的根目录，
```
cd Attack-Capture-System
```
使用npm安装依赖(国外镜像速度较慢，推荐使用cnpm http://npm.taobao.org/)
```
npm install 或 cnpm install
```


3.运行
```
npm start
```
成功启动后 在 http://127.0.0.1:8000 预览

## 如何部署

执行`npm run build` 等待构建完毕后，所有静态资源均会在根目录下dist文件夹内生成，复制文件夹内容部署到服务器上即可（具体文件结构可自行调整，调整后需改动index.html的文件资源引用路径）

## DEBUG模式和临时改变加密密钥和偏移量说明

提供 **快捷窗口修改** 和 **手动改动代码** 两种模式

### 快捷键呼出窗口

```javascript
//DEBUG模式开启
Ctrl+Alt+B  //Windows
Command+Alt+B // Mac

//临时修改加密key和iv
Ctrl+Alt+K  //Windows
Command+Alt+K // Mac
```


### 手动改变值
在index.html中`<title></title>`标签后 添加以下代码

```javascript
<script>
    //如需要关闭数据传输的加密和解密 可在sessionstorage中设置`@@__DEBUG__@@`值
    sessionStorage.setItem("@@__DEBUG__@@", "@@__DEBUG__@@")

    //需要临时改变secertKey 可在sessionStorage中设置`@@__SECRET_KEY__@@`值
    sessionStorage.setItem("@@__SECRET_KEY__@@", "长度建议为16位")

    //需要临时改变iv的值 可在sessionStorage中设置`@@__IV__@@`值
    sessionStorage.setItem("@@__IV__@@", "长度建议为16位")
</script>
```



## package.json 说明

```
{
  ...,
  "engines": {
    "install-node": "6.9.2"//依赖的node版本
  },
  "dependencies": {
    "antd": "^2.12.7",//antd组件组
    "classnames": "^2.2.5",//classname处理工具
    "dva": "^1.2.1",//dva https://github.com/dvajs/dva
    "dva-loading": "^0.2.1",// loading插件，用于获取effect的loading状态
    "echarts": "^3.7.2",//图表
    "echarts-for-react": "^2.0.0",//基于react封装的echarts
    "jquery": "^3.2.1",
    "moment": "^2.18.1",//moment 处理时间转换和格式等问题
    "ramda": "^0.25.0",//工具函数库
    "rc-queue-anim": "^1.2.2",//react队列动画库
    "react": "^15.6.1",//react
    "react-copy-to-clipboard": "^5.0.0",//剪切板插件
    "react-countup": "^2.2.0",//动态计数器
    "react-dom": "^15.4.0",
  },

  //开发环境依赖 webpack的loader等等，该部分所有的依赖均不会打包进入生产环境
  "devDependencies": {
    "babel-eslint": "^7.1.1",
    "babel-runtime": "^6.9.2",
    "babel-plugin-dva-hmr": "^0.3.2",
    "babel-plugin-import": "^1.3.1",
    "babel-plugin-dynamic-import-webpack": "^1.0.1",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-plugin-transform-runtime": "^6.9.0",
    "eslint": "^3.12.2",
    "eslint-config-airbnb": "^13.0.0",
    "eslint-plugin-import": "^2.2.0",
    "eslint-plugin-jsx-a11y": "^2.2.3",
    "eslint-plugin-react": "^6.8.0",
    "expect": "^1.20.2",
    "husky": "^0.12.0",
    "redbox-react": "^1.3.2",
    "roadhog": "^0.5.2"
  }
}
```

## git 仓库分支说明
本仓库使用git flow 方案来管理代码
* **master** 最近发布到生产环境的代码，只能从其他文件合并，禁止直接在该分支进行修改
* **dev** 主要开发分支 包含所有要发布到下一个Release的代码，用于与其他feature分支合并
* **release** 该分支基于Develop分支创建，创建完后，在该分支上进行测试，修复BUG ( 注意：一旦打了Release分支之后不要从dev分支上合并新的改动到release分支) ,发布时，合并改分支到master和dev分支，同时给master分支打tag标记release版本号，然后删除release分支
* **feature-xxx**  该类命名方式的分支，用于开发一个新的功能，开发完成后，合并到dev分支（合并后可删除该feature分支）
* **Hotfix-xxx**  生产环境发现新的bug时，需要创建一个该类命名方式的分支，进行bug修复,完成后合并到master和dev分支
* **fix-xxx**  dev发现bug时，可以创建一个该类命名方式的分支，进行bug修复

## 项目文件结构说明

```
├── /dist/           # 项目构建输出目录
├── /public/         # 公共文件，构建时copy至dist目录
├── /src/            # 项目源码目录
│ ├── /modules/      # 按照业务模块（页面）划分的代码 
│ ├── /components/   # UI组件及UI相关方法
│ ├── /domainComponents/ #业务相关的UI组件及UI相关方法
│ ├── /models/       # 公共数据模型
│ ├── /styles/       # 公共的样式相关
│ ├── /utils/        # 工具函数
│ ├── /configs/      # 项目相关的配置,API接口，路由相关
│ ├── router.js      # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
├── .gitignore       # git忽略文件配置
└── .roadhogrc.js    # roadhog配置

实际代码中存在部分实验性的内容 及尚未重新划分的部分
```


## .roadhogrc.js配置文件使用说明

开发环境下，为了避免代码入侵问题，将http接口返回数据依赖于外界，
可改动target为目标服务器，可按照自己需求切换mock服务和真实的服务器
```
{
  ...,
  proxy:{
    "/": {
      "target": "服务器ip地址",
      "changeOrigin": true
    }
  }
}
```