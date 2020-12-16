<template>
  <div id="catalog" class="wrapper">
    <!--- START header -->
    <div class="section_header">
      <!--- START controls -->
      <div class="section_controls">
        <!-- back button -->
        <transition name="fade">
          <button v-if="!is_home" class="back_btn" @click="go_back">
            <i class="fas fa-arrow-left"></i>
          </button>
        </transition>
        <!-- language switcher -->
        <transition name="fade">
          <LanguageSwitcher v-if="loaded && is_home" :languages="languages" @switch_language="set_language()" />
        </transition>
        <!-- intro video -->
        <transition name="fade">
          <button v-if="loaded && is_home" class="video_btn" @click="display_video_modal()">
            <i class="fas fa-play-circle"></i>
          </button>
        </transition>
      </div>
      <!--- END controls -->

      <!-- header image -->
      <transition name="slide-fade-up">
        <HeaderImage v-if="loaded" :styles="styles.header" />
      </transition>
    </div>
    <!--- END header -->

    <!-- START content -->
    <div class="section_content" :style="styles.content">
      <transition name="slide-fade-down" mode="out-in">
        <div v-if="loaded" class="body" :key="$route.fullPath" :style="styles.body">
          <!-- START content view -->
          <router-view :restaurant="restaurant" :topics="topics" :notes="notes" @update="filter_data" @resize="resize_itens" />
          <!-- END content view -->
        </div>
      </transition>
      <transition name="slide-fade-down">
        <div v-if="!loaded" class="loading">
          <i class="fas fa-spinner fa-pulse"></i>
        </div>
      </transition>
      <!-- END loader -->
    </div>
    <!-- END content -->

    <!-- START Modal -->
    <modal v-if="modal.display" class="modal_item" :class="modal.fullscreen" @close="hide_video_modal()">
      <!-- START notice element -->
      <div class="notice" slot="notice" v-if="modal.notice">
        <h3 class="title">Tem mais de 18 anos?</h3>
        <ul class="buttons">
          <li>
            <button @click="hide_notice_modal()"><span>Entrar </span></button>
          </li>
        </ul>
      </div>
      <!-- END notice element -->
      <!-- START video element -->
      <vue-plyr v-if="!modal.notice" ref="plyr" slot="item" :options="video.options" :style="video.style">
        <video controls playsinline :data-poster="video.poster">
          <source v-for="(file, index) in video.files" :key="index" :size="file.height" :src="file.url" :type="file.mime_type" />
        </video>
      </vue-plyr>
      <!-- END video element -->
    </modal>
    <!-- END Modal -->
  </div>
</template>

<script>
import HeaderImage from './HeaderImage.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import axios from 'axios'

export default {
  components: {
    HeaderImage,
    LanguageSwitcher
  },
  data: () => {
    return {
      //api_url: 'http://app.ementa.web/wp-json/wp/v2/catalogs',
      //lang_api_url: 'http://app.ementa.web/wp-json/pll/v1/languages',
      api_url: 'http://catalogo.agencydima.com/main/wp-json/wp/v2/catalogs',
      lang_api_url: 'http://catalogo.agencydima.com/main/wp-json/pll/v1/languages',
      post: {
        id: '',
        slug: ''
      },
      restaurant: {
        title: '',
        name: '',
        location: '',
        image: '',
        style: ''
      },
      topics: {
        all: [],
        selected: [],
        selected_slugs: [],
        single: {}
      },
      notes: '',
      languages: {
        all: {},
        current: '',
        translations: []
      },
      styles: {
        header: {
          height: '',
          image: ''
        },
        content: {},
        body: {}
      },
      modal: {
        display: false,
        fullscreen: '',
        notice: true
      },
      video: {
        player: '',
        options: {
          controls: ['play-large', 'fullscreen', 'mute'],
          //autoplay: true,
          fullscreen: { container: '.modal_item' }
        },
        poster: '',
        files: {},
        style: '--plyr-color-main: rgb(175, 55, 95);'
      },
      loaded: false,
      once: false
    }
  },
  computed: {
    level() {
      //if (this.$route.name === "chef") return 1;
      if (this.$route.params.c_slug) return 3
      if (this.$route.params.b_slug) return 2
      if (this.$route.params.a_slug) return 1
      return 0
    },
    current_slug() {
      if (this.$route.params.c_slug) return this.$route.params.c_slug
      if (this.$route.params.b_slug) return this.$route.params.b_slug
      if (this.$route.params.a_slug) return this.$route.params.a_slug
      return ''
    },
    is_home() {
      return this.level == 0 ? true : false
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === 'catalog' && from.name === 'catalog') {
        this.loaded = false
        this.reset()
        this.fetch_data()
      }
    }
  },
  updated() {
    if (this.modal.display && !this.modal.notice) {
      this.video.player = this.$refs.plyr.player
    }
  },
  created() {
    this.reset()
    this.fetch_data()
  },
  methods: {
    reset() {
      this.topics.all = []
      this.topics.selected = []
      this.topics.selected_slugs = []
      this.topics.single = {}

      this.languages.current = ''
      this.languages.translations = []
    },
    fetch_data() {
      // Get List of Languages
      axios
        .get(this.lang_api_url)
        .then(resp => {
          let langs = resp.data
          langs.forEach(lang => {
            this.languages.all[lang.slug] = lang
          })
        })
        .catch(err => {
          console.log(err)
        })

      // Get Data
      axios
        .get(this.api_url + '/' + this.$route.params.id)
        .then(resp => {
          let data = resp.data
          let acf = data.acf

          // Restaurant Info
          this.restaurant.name = acf.restaurant.name
          this.restaurant.location = acf.restaurant.location
          this.restaurant.image = acf.restaurant.image

          // Topics
          let topics = acf.topics
          if (topics) {
            topics.forEach(topic => {
              this.topics.all.push(topic)
            })
          }

          // Intro video
          let intro_vid = acf.intro_video
          if (intro_vid) {
            if (intro_vid.mp4) this.video.files.mp4 = intro_vid.mp4
            if (intro_vid.webm) this.video.files.webm = intro_vid.webm
            if (intro_vid.poster) this.video.poster = intro_vid.poster
          }

          // Info
          if (acf.infos) this.notes = acf.infos

          //id
          this.post.id = data.id

          //slug
          this.post.slug = data.slug

          //current translation
          this.languages.current = {
            locale: this.languages.all[data.lang].locale,
            language_code: this.languages.all[data.lang].slug,
            native_name: this.languages.all[data.lang].name,
            country_flag_url: this.languages.all[data.lang].flag_url
          }

          //available translations
          Object.entries(data.translations).forEach(([key, val]) => {
            if (key !== this.languages.current.language_code) {
              this.languages.translations.push({
                locale: this.languages.all[key].locale,
                language_code: this.languages.all[key].slug,
                native_name: this.languages.all[key].name,
                country_flag_url: this.languages.all[key].flag_url,
                id: val
              })
            }
          })

          this.filter_data()
          this.loaded = true
          if (this.is_home) this.display_notice_modal()
        })
        .catch(err => {
          console.log(err)
          if (err.response.status === 404) {
            this.$router.push({
              name: 'not_found',
              params: { 0: '' }
            })
          }
        })
    },
    filter_data() {
      this.topics.selected = []
      this.topics.selected_slugs = []

      switch (this.level) {
        // Level 0
        case 0:
          {
            // Info
            this.set_header_image(this.restaurant.image)
            this.restaurant.title = 'Catálogo de Vinhos'

            // Topics
            this.topics.all.forEach(topic => {
              this.topics.selected.push(topic)
              this.topics.selected_slugs.push(this.sanitize(topic.name))
            })
          }
          break
        // Level 1
        case 1:
          {
            let index = this.topics.all.findIndex(topic => this.sanitize(topic.name) === this.current_slug)

            // Info
            let sub_topic = this.topics.all[index]
            this.set_header_image(sub_topic.image)
            this.restaurant.title = sub_topic.name

            // Topics or products
            let itens = sub_topic.has_topics ? sub_topic.topics : sub_topic.products

            // Topic or products List
            itens.forEach(item => {
              this.topics.selected.push(item)
              this.topics.selected_slugs.push(this.sanitize(item.name))
            })
          }
          break
        // Level 2
        case 2:
          {
            let index = this.topics.all.findIndex(topic => this.sanitize(topic.name) === this.$route.params.a_slug)

            // Topics or products
            let sub_topic = this.topics.all[index]
            let itens = sub_topic.has_topics ? sub_topic.topics : sub_topic.products

            let index2 = itens.findIndex(topic => this.sanitize(topic.name) === this.current_slug)

            // Info
            let sub_item = itens[index2]
            this.set_header_image(sub_item.image)
            this.restaurant.title = sub_item.name

            // Topics or products or single product
            itens = sub_item.has_topics ? sub_item.topics : this.is_array(sub_item.products) ? sub_item.products : null

            // Topic or products List
            if (itens) {
              itens.forEach(item => {
                this.topics.selected.push(item)
                this.topics.selected_slugs.push(this.sanitize(item.name))
              })
            } else {
              this.topics.single = sub_item
            }
          }
          break
        // Level 3
        case 3:
          {
            let index = this.topics.all.findIndex(topic => this.sanitize(topic.name) === this.$route.params.a_slug)

            // Topics or products
            let sub_topic = this.topics.all[index]
            let itens = sub_topic.has_topics ? sub_topic.topics : sub_topic.products

            let index2 = itens.findIndex(topic => this.sanitize(topic.name) === this.$route.params.b_slug)

            // Info
            let sub_item = itens[index2]
            itens = sub_item.has_topics ? sub_item.topics : sub_item.products

            let index3 = itens.findIndex(topic => this.sanitize(topic.name) === this.current_slug)

            sub_item = itens[index3]
            this.set_header_image(sub_item.image)
            this.restaurant.title = sub_item.name

            // Topics or products or single product
            let sub_itens = this.is_array(sub_item.products) ? sub_item.products : null

            // Topic or products List
            if (sub_itens) {
              sub_itens.forEach(item => {
                this.topics.selected.push(item)
                this.topics.selected_slugs.push(this.sanitize(item.name))
              })
            } else {
              this.topics.single = sub_item
            }
          }
          break
      }
    },
    resize_itens(size) {
      let def_height = 180
      let height = size ? size.height : def_height
      this.styles.header.height = height
      this.styles.content = { marginTop: `${height - 40}px` }
      this.styles.body = { minHeight: `calc(100vh - ${height}px)` }
    },
    set_header_image(image) {
      this.styles.header.image = image.url ? image.url : image
    },
    set_language(id) {
      this.$router.push({
        name: 'catalog',
        params: {
          id: id,
          slug: this.post.slug
        }
      })
    },
    go_back() {
      this.$router.go(-1)
    },
    sanitize(title) {
      let slug = ''
      let titleLower = title.toLowerCase()
      slug = titleLower.trim()
      slug = slug.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
      slug = slug.replace(/i|í|ì|ï|î|ı/gi, 'i')
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
      slug = slug.replace(/đ/gi, 'd')
      slug = slug.replace(/ç/gi, 'c')
      slug = slug.replace(/ñ/gi, 'n')
      slug = slug.replace(/\/+/g, ' ') //forward slash convert to space
      slug = slug.replace(/-+/g, ' ') //single or multiple dashes
      slug = slug.replace(/\.+/g, ' ') //single or multiple dots
      slug = slug.replace(/\s+/g, '-') //single or multiple white spaces, tabs, line breaks

      return slug
    },
    exists(obj) {
      return typeof obj !== 'undefined' || !obj
    },
    is_array(arr) {
      return this.exists(arr) && Array.isArray(arr) && arr.length
    },
    display_video_modal() {
      this.modal.display = true
      this.modal.notice = false
      this.add_player_events()
      this.$nextTick(() => {
        let player = this.video.player
        player.play()
        player.fullscreen.enter()
      })
    },
    hide_video_modal() {
      this.modal.display = false
      this.remove_player_events()
      let player = this.video.player
      player.stop()
      if (player.fullscreen.active) {
        player.fullscreen.exit()
      }
    },
    display_notice_modal() {
      this.modal.display = true
      this.modal.notice = true
    },
    hide_notice_modal() {
      this.modal.display = false
      this.modal.notice = false

      this.display_video_modal()
    },
    add_player_events() {
      this.$nextTick(() => {
        let player = this.video.player
        player.on('enterfullscreen', () => {
          this.modal.fullscreen = 'fullscreen'
        })
        player.on('exitfullscreen', () => {
          this.modal.fullscreen = ''
        })
        player.on('ended', () => {
          this.hide_video_modal()
        })
      })
    },
    remove_player_events() {
      this.$nextTick(() => {
        let player = this.video.player
        player.off('enterfullscreen')
        player.off('exitfullscreen')
        player.off('ended')
      })
    }
  }
}
</script>

<style scoped lang="scss">
$bg-img: url('../assets/bg.png');
.tablet.landscape,
.laptop.landscape,
.desktop.portrait {
  .wrapper {
    .section_content {
      margin-top: 0 !important;
      .body {
        position: relative;
        width: 75%;
        min-height: calc(100vh - 20px) !important;
        float: right;
      }
    }
  }
}
.desktop.landscape {
  .wrapper {
    .section_content {
      margin-top: 0 !important;
      .body {
        position: relative;
        width: 60%;
        min-height: calc(100vh - 20px) !important;
        float: right;
      }
    }
  }
}
.laptop.portrait {
  .wrapper {
    padding: 20px;
  }
}
.wrapper {
  padding: 10px;
  font-size: 1rem;
  min-height: calc(100vh);
  z-index: -1;
  background-image: $bg-img;
  background-attachment: fixed;
  .section_header {
    position: relative;
    .section_controls {
      position: fixed;
      top: 15px;
      left: 15px;
      right: 15px;
      z-index: 1;
      .video_btn {
        float: right;
        background: #fff;
        border-radius: 4px;
        color: #000;
        padding: 5px 10px;
        outline: none;
        border: 1px solid #ddd;
        margin-right: 10px;
        i {
          font-size: 1rem;
          color: #000;
        }
      }
      .lang_btn {
        float: right;
      }
      .back_btn {
        float: left;
        outline: none;
        border: none;
        border-radius: 4px;
        background: rgba($color: #000000, $alpha: 0.5);
        padding: 8px 15px;
        z-index: 1;
        cursor: pointer;
        i {
          font-size: 1rem;
          color: #efefef;
        }
      }
    }
  }
  .section_content {
    margin-top: 160px;
    transition: all 0.5s;
    scroll-behavior: smooth;
    .loading {
      position: absolute;
      font-size: 4rem;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
    .body {
      position: relative;
      background-color: #fff;
      width: 100%;
      min-height: calc(100vh - 185px);
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  }
}

.notice {
  text-align: center;
  color: #fff;
  ul {
    display: flex;
    justify-content: center;
    button {
      background: #fff;
      border-radius: 5px;
      outline: none;
      border: none;
      padding: 10px 25px;
      font-weight: 700;
      text-transform: uppercase;
      color: #fff;
      font-family: 'Rubik';
      transition: all 0.5s;
      background: rgb(175, 55, 95);
      & span {
        display: inline-block;
        position: relative;
        transition: 0.5s;
        &:after {
          content: '\f72f';
          position: absolute;
          opacity: 0;
          top: 0;
          right: -20px;
          transition: 0.5s;
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
        }
      }
      &:hover span,
      &:active span {
        padding-right: 25px;
        &:after {
          opacity: 1;
          right: 0;
        }
      }
    }
  }
}
</style>
