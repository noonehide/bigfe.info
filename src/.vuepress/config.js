const sidebar = require('./config/sidebar.js')
const nav = require('./config/nav.js')
const valineConfig = require('./config/valineConfig.js')
const plugins = require('./config/plugins.js')

module.exports = {
  plugins,
  "title": "bigfe",
  "description": "jjjh的博客",
  "dest": "public",
  "theme": 'reco',
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
    ['script', { type: 'text/javascript', src: '/js/push.js' }],
  ],
  "themeConfig": {
    valineConfig,
    sidebar,
    nav,
    // 自动形成侧边导航
    "subSidebar": "auto",
    "sidebarDepth": 4,
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 3,
        "text": "分类"
      },
      "tag": {
        "location": 4,
        "text": "标签"
      }
    },
    "friendLink": [
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "上次更新",
    "author": "jjjh",
    "authorAvatar": "/avatar.jpeg",
    "record": "",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  }
}