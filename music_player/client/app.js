(function (global) {

  const serverUrl = 'http://127.0.0.1:2080/api'

  /**
   * 加载模版内容
   * @param  {string} id 模版ID
   * @return {string}    模版内容
   */
  const loadTemplate = id => document.getElementById(id + '_tmpl').innerHTML

  const pad = (num, n) => (Array(n).join(0) + num).slice(-n)

  const convertDuration = duration => {
    const h = Math.floor(duration / 3600)
    const m = Math.floor(duration % 3600 / 60)
    const s = Math.floor(duration % 60)
    return h ? `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}` : `${pad(m, 2)}:${pad(s, 2)}`
  }

  /**
   * 整个应用程序模块
   * @type {Vue}
   */
  const App = global.Vue.extend({})
  App.audio = new Audio()

  /**
   * 首页组件
   * @type {Vue}
   */
  const Home = global.Vue.extend({
    template: loadTemplate('home')
  })

  /**
   * 歌曲列表组件
   * @type {Vue}
   */
  const Songs = global.Vue.extend({
    template: loadTemplate('list'),
    data () {
      this.$http.jsonp(`${serverUrl}/music`)
        .then(res => {
          this.list = res.data
        })
      return { list: [] }
    },
    methods: {
      pad: pad
    }
  })

  /**
   * 播放器组件
   * @type {Vue}
   */
  const Player = global.Vue.extend({
    template: loadTemplate('item'),
    data() {
      return {
        item: {},
        count:0
      }
    },
    route: {
      data(transition) {
        const id = parseInt(transition.to.params.id, 10);
        if (!id) return router.go({ name: 'list' });
        this.$http.jsonp(`${serverUrl}/music/${id}`).then(res => {
            if (!res.ok) return router.go({ name: 'list' });
            if(App.audio.id==id){
              this.item = { playing: !App.audio.paused, random: false,current:App.audio.currentTime};
              Object.assign(this.item, res.data);
              this.item.duration = App.audio.duration;
            }else{
              this.item ={current: 0, playing: false, random: false }
              Object.assign(this.item, {current: 0, playing: false, random: false } ,res.data);
              for(key in this.item){
                console.log(key+':'+this.item[key]);
              }
              App.audio.src = this.item.music;
              App.audio.id = id;
              App.audio.autoplay = true;
            }
              App.audio.onloadedmetadata= () => {
                this.item.duration = App.audio.duration
              };
              App.audio.ontimeupdate= () => {
                this.item.current = App.audio.currentTime;
                this.count++;
              };
              App.audio.onplay=() => {
                this.item.playing = true;
              };
              App.audio.onpause=() => {
                this.item.playing = false;
              };
          //    //this.$el.appendChild( App.audio);
          })
          .catch(error => router.go({ name: 'list' }))
        return { item: {} }
      }
    },
    methods: {
      convert: convertDuration,
      play() {
        if (this.item.playing) {
          App.audio.pause()
        } else {
          App.audio.play()
        }
        this.item.playing = !this.item.playing
      },
      progress() {
        App.audio.currentTime = this.item.current
      },
      next() {
        this.$http.jsonp(`${serverUrl}/music`).then(res => {
          const ids = res.data.map(s => s.id)
          let targetIndex = ids.indexOf(this.item.id) + 1
          if (targetIndex >= ids.length) {
            targetIndex = 0
          }
          router.go({ name: 'item', params: { id: ids[targetIndex] } })
        })
      },
      prev() {
        this.$http.jsonp(`${serverUrl}/music`).then(res => {
          const ids = res.data.map(s => s.id)
          let targetIndex = ids.indexOf(this.item.id) - 1
          if (targetIndex < 0) {
            targetIndex = ids.length - 1
          }
          router.go({ name: 'item', params: { id: ids[targetIndex] } })
        })
      }
    },
  })

  /**
   * 路由器用来分发每一次请求到不同的组件
   * @type {VueRouter}
   */
  const router = new global.VueRouter()

  router.map({
    '/home': {
      name: 'home',
      component: Home
    },
    '/songs': {
      name: 'list',
      component: Songs
    },
    '/songs/:id': {
      name: 'item',
      component: Player
    },
  })

  router.redirect({ '*': '/home' })

  router.start(App, 'body')

})(this)
