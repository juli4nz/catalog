<template>
  <div id="home" class="wrapper">
    <!-- background -->
    <div class="section_bg" :style="bg_style"></div>
    <div class="section_main">
      <img :src="logo_url" alt="Ementa Digital" />
      <h1>404</h1>
      <h2>Ementa Não Encontrada</h2>
      <p>
        Pedimos desculpa pelo incómodo. Por favor entre em contacto com a equipa
        <a href="https://ementa.info">Ementa Digital</a>.
      </p>
    </div>
  </div>
</template>
<script>
import bg_image_url from '@/assets/bg.png'
import logo_url from '@/assets/ementa_digital_color.png'
export default {
  data: () => {
    return {
      bg_image_url: bg_image_url,
      logo_url: logo_url
    }
  },
  computed: {
    bg_style() {
      return { backgroundImage: 'url(' + this.bg_image_url + ')' }
    }
  }
}
</script>
<style scoped lang="scss">
.wrapper {
  padding: 10px;
  font-size: 1rem;
  .section_bg {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    min-height: calc(100vh - 20px);
    z-index: -1;
  }
  .section_main {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 250px;
    h1 {
      margin-bottom: 5px;
      font-weight: 600;
    }
    h2 {
      margin-top: 5px;
    }
    img {
      max-width: 200px;
    }
    a {
      color: #ea5836;
      text-decoration: none;
      font-weight: 500;
    }
  }
}
</style>
