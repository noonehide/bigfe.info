module.exports = {
  "title": "bigfe",
  "description": "前端博客",
  "dest": "public",
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
    ]
  ],
  "themeConfig": {
    "nav": [
      {
        "text": "主页",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "时间轴",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "文档",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/web/js/"
          }
        ]
      },
      {
        "text": "联系我",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/noonehide",
            "icon": "reco-github"
          }, {
            "text": "Email",
            "link": "mailto:noonehide@163.com",
            "icon": "reco-email"
          }
        ]
      }
    ],
    // 自动形成侧边导航
    "subSidebar": "auto",
    "sidebarDepth": 4,
    "sidebar": {
      "/docs/web/js/": [{
        "title": "JS", 
        "collapsable": true,
        "children": [
          '',
          'closure',
          'this',
          'promise',
          'event-loop',
          'practice',
        ]
      }],
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "分类"
      },
      "tag": {
        "location": 3,
        "text": "标签"
      }
    },
    "friendLink": [
    ],
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "上次更新",
    "author": "jianghui",
    "authorAvatar": "/avatar.jpeg",
    "record": "",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  }
}