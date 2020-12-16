<template>
  <div class="section_image" :style="section_styles">
    <transition name="fade" mode="in-out">
      <img :src="styles.image" alt="" :key="styles.image" />
    </transition>
    <div class="fx"></div>
  </div>
</template>
<script>
export default {
  props: ['styles'],
  data: () => {
    return {
      opacity: 1,
      height: 180 //default
    }
  },
  computed: {
    section_styles() {
      return {
        ...{ height: this.styles.height + 'px' },
        ...{ opacity: this.opacity }
      }
    }
  },
  created() {
    this.handle_resize()
    window.addEventListener('resize', this.handle_resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handle_resize)
    window.removeEventListener('scroll', this.handle_scroll)
  },
  methods: {
    handle_scroll() {
      let scroll_pos = window.pageYOffset || document.documentElement.scrollTop
      let offset = this.styles.height - 40
      let margin = 50
      if (scroll_pos < 0) return
      let opacity = 1 - (scroll_pos - (offset - margin)) / margin // gradual by entire image use [1 - scroll_pos / offset]
      this.opacity = opacity > 1 ? 1 : opacity < 0 ? 0 : opacity // concatenate values between 0 and 1
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
    .fx {
      right: 0px;
      left: auto;
      width: 35px;
      height: 100vh;
      background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
    }
  }
}
.desktop.landscape {
  .section_image {
    height: 100vh !important;
    width: 42%;
    .fx {
      right: 0px;
      left: auto;
      width: 35px;
      height: 100vh;
      background: linear-gradient(270deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
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
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }
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
</style>
