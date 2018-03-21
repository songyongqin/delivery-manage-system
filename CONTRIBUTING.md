# 开发指南

## 开发语言与环境
* NodeJS 6.11.1
* Typescript \^2.6.2
* Less  \^1.7.0
* JSX(TSX) React \^16.0.0

详情信息请查看 [package.json](./package.json)


## 提交原则则

*  **开发新的feature 请先同步 remote 最新的 dev 分支**
*  **尽量保持较小粒度的提交，每次最多提交一个模块的代码**
*  **请完成每个模块后，尽快发起PR**
*  **多个 commit 信息，请先在本地使用 rebase 合并**


## 分支说明

本仓库使用git flow 方案来管理代码

* **master** 最近发布到生产环境的代码，只能从其他文件合并，禁止直接在该分支进行修改

* **dev** 主要开发分支 包含所有要发布到下一个Release的代码，用于与其他feature分支合并

* **release** 该分支基于Develop分支创建，创建完后，在该分支上进行测试，修复BUG ( 注意：一旦打了 release 分支之后不要从dev分支上合并新的改动到 release分支) ,发布时，合并改分支到 master 和 dev 分支，同时给 master 分支打 tag 标记 release 版本号，然后删除release分支

* **feature-xxx**  该类命名方式的分支，用于开发一个新的功能，开发完成后，合并到dev分支（合并后可删除该feature分支）

* **hot-fix-xxx**  生产环境发现新的bug时，需要创建一个该类命名方式的分支，进行bug修复,完成后合并到 master 和 dev 分支

* **fix-xxx**  dev 发现 bug 时，可以创建一个该类命名方式的分支，进行bug修复

## 命名风格建议

* 注意单复数 

* 常量

```
//常量全部大写 单词间用 下划线 _ 连接
const MAIN_NAMESPACE="main"
``` 
* 变量 与 函数名

```
//使用小驼峰命名 （第一个单词以小写字母开始，第二个单词的首字母大写）
let firstName="antiy"

//缩略词 若缩略词为第一个单词 则缩略词全小写
let vmData=[]

//若缩略词不为第一个单词 则保留全大写
const getVMData=()=>{}

```

* 构造函数

```
//构造函数 首字母大写 包括React的无状态组件等
class List extends React.Component{
  
}

const TableCell = ({children})={
  return <td>{children}</td>
}

```

* 文件及文件夹

除少数说明文件（README.md等）外，建议遵守变量与函数名的命名规则

唯一性质较强的文件或文件夹（如React组件，modules的子文件夹等）可以首字母大写