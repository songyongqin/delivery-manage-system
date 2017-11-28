# 安天捕风蜜罐系统

## 环境依赖:
Node.js (NPM)  https://nodejs.org/en/
git 
## 快速开始

1.clone仓库到本地 
```
git clone [仓库地址] -b [分支]
```


2.进入代码所在的根目录，使用npm安装依赖(国外镜像速度较慢，推荐使用cnpm http://npm.taobao.org/)
```
npm install
```


3.运行
```
npm start
```
成功启动后 在 http://127.0.0.1:8000 预览

## 如何部署

执行`npm run build` 等待构建完毕后，所有静态资源均会在根目录下dist文件夹内生成，复制文件夹内容部署到服务器上即可（具体文件结构可自行调整，调整后需改动index.html的文件资源引用路径）


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


