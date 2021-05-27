module.exports = [
    // 流程图插件
    // ['flowchart'],
    // 标签加强
    ["vuepress-plugin-boxx"],
    // 代码展示加强版
    ["@vuepress-reco/extract-code"],
    // 百度自动推送
    ["vuepress-plugin-baidu-autopush"],
    // 更新刷新插件
    // ['@vuepress/pwa', {
    //     serviceWorker: true,
    //     updatePopup: {
    //         message: "发现新内容可用",
    //         buttonText: "刷新"
    //     }
    // }],
    // 弹窗公告插件
    // [
    //   "@vuepress-yard/vuepress-plugin-window"
    // ], 
    // 动态标题
    // ["dynamic-title",
    //     {
    //         showIcon: "vuepress/smile.ico",
    //         showText: "(/≧▽≦/)欢迎帅哥美女！",
    //         hideIcon: "vuepress/cry.ico",
    //         hideText: "(●—●)呜呜，不要走嘛！！",
    //         recoverTime: 2000
    //     }
    // ],
    // 代码复制弹窗插件
    // ["vuepress-plugin-nuggets-style-copy", {
    //   copyText: "复制代码",
    //   tip: {
    //       content: "复制成功!"
    //   }
    // }],
    // 音乐插件
    // ['meting', {
    //     //metingApi: "https://meting.sigure.xyz/api/music",
    //     meting: {
    //       // 网易
    //       server: "netease",
    //       // 读取歌单
    //       type: "playlist",
    //       mid: "696441716",
    //     },          
    //     // 不配置该项的话不会出现全局播放器
    //     aplayer: {
    //       // 吸底模式
    //       fixed: true,
    //       mini: true,
    //       // 自动播放
    //       autoplay: true,
    //       // 歌曲栏折叠
    //       listFolded:true,
    //       // 颜色
    //       theme: '#f9bcdd',
    //       // 播放顺序为随机
    //       order: 'random',
    //       // 初始音量
    //       volume: 0.1,
    //       // 关闭歌词显示
    //       lrcType: 0
    //     },
    //     mobile :{
    //       // 手机端去掉cover图
    //       cover: false,
    //     }
    //   }]

    /* 音乐插件   
    ["@vuepress-reco/vuepress-plugin-bgm-player",
          {
            audios: [
              // 网络文件示例
              {
                name: '年轮',
                artist: '张碧晨',
                url: 'https://cdn.jsdelivr.net/gh/fudalijunyi/cdn/MP3/年轮.mp3',
                cover: 'https://cdn.jsdelivr.net/gh/fudalijunyi/picture-bed/img/20200715154924.png'
              }
            ] ,
            // 自动缩小
            autoShrink:true ,
            // 悬浮窗模式，吸边
            shrinkMode: 'float' ,
            // 悬浮窗位置
            floatStyle:{ bottom: '10px', 'z-index': '999999' },

          }],*/
]