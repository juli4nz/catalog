<template>
  <div class="section_image" :style="section_styles">
    <div class="header_image" :style="header_styles">
      <div class="fx"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['styles'],
  data: () => {
    return {
      opacity: 1
    }
  },
  computed: {
    header_styles() {
      return {
        ...{ backgroundImage: 'url(' + this.styles.image + ')' },
        ...{ opacity: this.opacity }
      }
    },
    section_styles() {
      return {
        ...{ height: this.styles.size.height + 'px' }
      }
    }
  },
  created() {
    this.handle_scroll()
    window.addEventListener('resize', this.handle_resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handle_resize)
    window.removeEventListener('scroll', this.handle_scroll)
  },
  methods: {
    handle_scroll() {
      let scroll_pos = window.pageYOffset || document.documentElement.scrollTop
      let offset = this.styles.size.height - 40
      let scroll_rel = scroll_pos / offset
      let opacity = 1 - scroll_rel

      if (scroll_pos < 0) return

      this.opacity = opacity
    },
    handle_resize() {
      if (((this.$mqAliases['tablet'] || this.$mqAliases['laptop']) && this.$mqAliases['landscape']) || this.$mqAliases['desktop']) {
        window.removeEventListener('scroll', this.handle_scroll)
      } else {
        window.addEventListener('scroll', this.handle_scroll)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tablet.landscape,
.laptop.landscape,
.desktop.portrait {
  .section_image {
    height: 100vh !important;
    width: 29%;
    .header_image {
      .fx {
        right: 0px;
        left: auto;
        width: 35px;
        height: 100vh;
        background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
      }
    }
  }
}
.desktop.landscape {
  .section_image {
    height: 100vh !important;
    width: 42%;
    .header_image {
      .fx {
        right: 0px;
        left: auto;
        width: 35px;
        height: 100vh;
        background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
      }
    }
  }
}
.section_image {
  position: fixed;
  height: 200px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  .header_image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    .fx {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 35px;
      width: 100%;
      background: rgb(255, 255, 255);
      background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    }
  }
}
</style>
