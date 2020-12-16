<template>
  <!-- Single Product -->
  <div class="product_details">
    <div class="product_header block">
      <div class="thumbs">
        <div class="thumbs_wrapper">
          <img :src="image.url" :alt="image.name" class="image_content" />
        </div>
      </div>
      <ul class="header_details">
        <li class="title">{{ item.name }}</li>
        <li class="price">
          <span>{{ Number(item.price).toFixed(2) }}</span>
          <span class="price_symbol">€</span>
        </li>
        <li class="region">{{ item.region }}</li>
        <li class="country">{{ item.country }}</li>
        <li class="type">{{ item.type }}</li>
        <li class="year">{{ item.year }}</li>
      </ul>
    </div>

    <ul class="product_table block">
      <li class="alchool" v-if="item.alchool">
        <div class="title">
          <i class="fas fa-percentage"></i>
          <h4>Teor Álcool</h4>
        </div>

        <span>{{ item.alchool }}</span>
      </li>
      <li class="producer" v-if="item.cellar">
        <div class="title">
          <i class="fas fa-wine-bottle"></i>
          <h4>Adega</h4>
        </div>
        <span>{{ item.cellar }}</span>
      </li>
      <li class="varieties" v-if="item.varieties">
        <div class="title">
          <i class="fab fa-envira"></i>
          <h4>Castas</h4>
        </div>
        <span>{{ item.varieties }}</span>
      </li>
      <li class="enologist" v-if="item.enologist">
        <div class="title">
          <i class="fas fa-wine-glass"></i>
          <h4>Enólogos</h4>
        </div>
        <span>{{ item.enologist }}</span>
      </li>
    </ul>
    <ul class="product_text block" v-if="item.taste_note">
      <li class="taste_note">
        <div class="title">
          <i class="fas fa-clipboard"></i>
          <h4>Notas de Prova</h4>
        </div>
        <div v-html="item.taste_note"></div>
      </li>
      <li class="more_info" v-if="item.info">
        <div class="title">
          <i class="fas fa-file-alt"></i>
          <h4>Informações Adicionais</h4>
        </div>
        <div v-html="item.info"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['topics'],
  data: () => {
    return {}
  },
  computed: {
    item() {
      return this.topics.single
    },
    image() {
      let item = this.item
      return item.image_bottle.url ? item.image_bottle : item.image
    },
    header_image() {
      let item = this.item
      return item.image.url ? item.image : item.image_bottle
    }
  },
  created() {
    this.$emit('update')
    this.set_size(this.header_image.url)
  },
  methods: {
    set_size(url) {
      let img = new Image()
      img.onload = () => {
        let margin = 150
        let size = this.get_aspect_ratio(img.width, img.height, window.innerWidth, window.innerHeight - margin)
        this.$emit('resize', size)
      }
      img.src = url
    },
    get_aspect_ratio(srcWidth, srcHeight, maxWidth, maxHeight) {
      let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
      return { width: srcWidth * ratio, height: srcHeight * ratio }
    }
  }
}
</script>

<style lang="scss" scoped>
.product_details {
  .block {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    &:last-child {
      padding-bottom: 5px;
      margin-bottom: 5px;
      border-bottom: none;
    }
  }
  .product_header {
    display: flex;
    /*  flex-direction: column; */
    max-width: 100%;
    width: auto;
    .thumbs {
      width: 30%;
      position: relative;
      min-height: 185px;
      .thumbs_wrapper {
        width: 65px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .header_details {
      width: 70%;
      position: relative;
      padding-left: 25px;
      & > * {
        margin-bottom: 3px;
      }
      .title {
        font-size: 1.4rem;
        margin-bottom: 10px;
        font-weight: 500;
      }
      .price {
        margin-bottom: 10px;
      }
      .region {
        font-size: 1rem;
        font-weight: 500;
        margin-bottom: 2px;
      }
      .country {
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 8px;
      }
      .year {
        font-size: 0.9rem;
        font-weight: 500;
        color: rgb(143, 143, 143);
      }
      .type {
        font-size: 0.9rem;
        font-weight: 500;
        color: rgb(143, 143, 143);
      }
    }
  }
  .product_table {
    display: flex;
    flex-wrap: wrap;
    & > li {
      width: 50%;
      text-align: left;
      padding: 0 10px;
      margin-bottom: 15px;
      font-size: 0.9rem;
      &:nth-child(odd) {
        padding-left: 0px;
      }
      &:nth-child(even) {
        padding-right: 0px;
      }
      &:nth-last-child(2),
      &:last-child {
        margin-bottom: 0px;
      }
    }
    .title {
      display: flex;
      font-size: 0.75rem;
      margin-bottom: 5px;
      i {
        margin-right: 5px;
        color: rgb(145, 47, 47);
      }
      h4 {
        font-family: 'Rubik';
        margin: 0;
        font-weight: 400;
        text-transform: uppercase;
      }
    }
  }
  .product_text {
    & > li {
      font-size: 0.9rem;
      margin-bottom: 15px;
    }
    .title {
      display: flex;
      font-size: 0.75rem;
      margin-bottom: 5px;
      i {
        margin-right: 5px;
        color: rgb(145, 47, 47);
      }
      h4 {
        font-family: 'Rubik';
        margin: 0;
        font-weight: 400;
        text-transform: uppercase;
      }
    }
  }
  .price {
    font-family: 'Prata';
    font-weight: 400;
    color: #000;
    padding-right: 10px;
    padding-top: 5px;
    font-size: 1.15rem;
    .price_symbol {
      font-size: 0.7rem;
      margin-left: 2px;
    }
  }
}

.modal_item {
  .modal_image {
    display: block;
    width: 100%;
  }
}
</style>

<style lang="scss">
.slick-list {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

  .slick-track {
    display: flex;
    align-items: center;

    .slick-slide {
      display: block;
    }
  }
}
</style>
