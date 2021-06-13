---
title: react ssr
date: 2020-5-30
tags:
 - 框架
categories:
 -  框架
---

## react ssr

> 服务端渲染，全称: server-side-rending, 当用户或爬虫程序访问页面 URL时，将组件或页面通过服务器生成 HTML 字符串.React官方目前并没有完整的解决方案，不过有些开源的项目也很不错，如Next.js

### 优缺点


### 官方api

> ReactDOMServer 对象允许你将组件渲染成静态标记。通常，它被使用在 Node 服务端上：

```js
// ES modules
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');

// 渲染的时候带有 data-reactId ，这样就会增加流量，不过在客户端对比就会重新渲染
ReactDOMServer.renderToString()

// 纯静态页面使用该api,渲染的时候不带 data-reactId ，节省流量，在客户端会重新刷新，出现闪屏
ReactDOMServer.renderToStaticMarkup()
```

### 简易版本的SSR

```js
const React = require('react');
const { renderToString } = require('react-dom/server');
const http = require('http');
//组件
class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    // 不会运行，因为没有在浏览器运行js，绑定事件
    handlerClick(){
        alert('一起来玩 react ssr 啊');
    }

    render () {
        return <h1 onClick={this.handlerClick}>click here!</h1>
    }
}

//服务
http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const data = fetch;
        const html = renderToString(<Index />);
        res.end(html);
    }
}).listen(8080);

```

### 事件监听

- 浏览器既然需要运行js，首先对React页面进行打包
- 在返回给浏览器的html中，插入js文件

```js
    const html = renderToString(<Index />);

    ctx.body = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>my react ssr</title>
                </head>
                <body>
                    <div id="root">${html}</div>
                </body>
                </html>
                <!-- 插入组件编译后的代码，绑定事件 -->
                <script type="text/javascript"  src="/index.js"></script>`;
    return next();
```

### 路由

> 官方路由react-router提供了客户端和服务端渲染的组件

- 客户端路由有BrowserRoute: 基于浏览器 History api 来达到浏览器地址和 UI 同步的能力
- 服务端路由有StaticRoute: 根据path，查找组件的能力

```js
    // 服务端
    const html = renderToString(<StaticRouter location={path} context={context}><App routeList={routeList}></App></StaticRouter>);

    ctx.body = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>my react ssr</title>
                </head>
                <body>
                    <div id="root">${html}</div>
                </body>
                </html>
                <script type="text/javascript"  src="/index.js"></script>`;
    return next();

    // 客户端

    ReactDom.hydrate(<BrowserRouter>
        <App routeList={routeList} /></BrowserRouter>
    , document.getElementById('root'))
```

### css等资源处理
> 由于引入组件的时候，如果组件引入了css等文件，node不能解析，会直接报错.可以添加babel插件，忽略这些后缀的文件.css也需要和js一样跟html直出

- 删除css
```js
/**
 * 删除代码中导入的非js文件
 */
module.exports = function ({ types: babelTypes }) {
    return {
        name: "no-require",
        visitor: {
            ImportDeclaration(path, state) {
                let importFile = path.node.source.value;
                if(importFile.indexOf('.js')<=-1){
                    path.remove();
                }
            }
        }
    };
};

```

- css加入到html

```js
    ctx.body=`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>my react ssr</title>
                    <link rel="stylesheet" type="text/css" href="/main.css" />
                </head>
                <body>
                    <div id="root">${html}</div>
                </body>
                </html>
                <script type="text/javascript"  src="/index.js"></script>`;
```



### 数据同构

> 客户端通常在componentDidMount生命周期内执行数据请求方法从接口拿到数据.在服务端渲染组件的时候要想在直出的组件内容也包含数据，那就需要提前得到数据，然后将数据作为属性传递给组件，在constructor内对组件 state 进行初始化

- 浏览器自带的ajax，或者fetch不支持node请求。通常采用三方方案: isomorphic-fetch，axios等

- 约定数据请求的方法(getInitialProps), 请求数据后作为参数传给组件

```js
// 客户端
export default class Index extends React.Component {
    constructor(props) {
        super(props);   
        //得到初始化数据
        initialData = props.staticContext.initialData||{};
        this.state=initialData;
    }

    //静态方法  数据预取方法
    static async  getInitialProps() {
        //模拟数据请求方法
        const fetchData=()=>{
            return new Promise(resolve=>{
                setTimeout(() => {
                    resolve({
                        code:0,
                        data: tempData
                    })
                }, 100);
            })
        }

        let res = await fetchData();

        return res;
    }

    handlerClick(){
        alert('一起来玩 react 服务端渲染');
    }

    render() {
        return <div onClick={this.handlerClick}>hello world。</div>
    }
}

// 服务端

export default  async (ctx,next)=>{

    const path = ctx.request.path;

    //查找到的目标路由对象
    let targetRoute = matchRoute(path,routeList);

    //数据预取 -> fetchResult
    let fetchDataFn = targetRoute.component.getInitialProps;
    let fetchResult = {};
    if(fetchDataFn){
        fetchResult = await fetchDataFn();
    }

     //将预取数据在这里传递过去 组内通过props.staticContext获取
    const context = {
        initialData: fetchResult
    };

    html = renderToString(<StaticRouter location={path} context={context}>
        <App routeList={routeList}></App>
    </StaticRouter>);
    //....
    ctx.body=`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>my react ssr</title>
                    <link rel="stylesheet" type="text/css" href="/main.css" />
                </head>
                <body>
                    <div id="root">${html}</div>
                </body>
                </html>
                <script>
                    window.initialData = ${fetchResult}
                </script>
                <script type="text/javascript"  src="/index.js"></script>`;
}

```

- 但是由于服务端直出的数据，和客户端组件的数据不同，react会进行双端对比，采用客户端数据，所以需要客户端也得到服务端数据

```js

function clientRender() {
    //初始数据
    let initialData = window.initialData

    //查找路由
    let route = matchRoute(document.location.pathname,routeList);

    //设置组件初始化数据 [关键点]
    route.initialData =initialData;

    //渲染index
    ReactDom.hydrate(<BrowserRouter>
            <App routeList={routeList}/>
    </BrowserRouter>
        , document.getElementById('root'))

}
//渲染入口
clientRender();


function App({routeList}) {
    return (
            <Layout> 
               <Switch>
                {
                    routeList.map(item=>{
                        //判断是否有初始数据
                        return item.initialData ? <Route key={item.path} exact={item.exact} path={item.path}  render={(props)=>{
                            props.initialData = item.initialData;
                            return <item.component {...props}></item.component>
                        }}></Route> : <Route key={item.path} {...item}></Route>
                    })
                }
                <Route to="*" component={Page404}></Route>
            </Switch>
            </Layout>
    );
}
```