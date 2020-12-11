<template>
  <div>
    <!-- Single Product -->
    <div class="product_details">
      <div class="product_header block">
        <div class="thumbs">
          <div class="thumbs_wrapper">
            <img :src="main_image.url" :alt="main_image.name" class="image_content" />
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
        <li class="alchool">
          <div class="title">
            <i class="fas fa-percentage"></i>
            <h4>Teor Álcool</h4>
          </div>

          <span>{{ item.alchool }}</span>
        </li>
        <li class="sizes">
          <div class="title">
            <i class="fas fa-wine-bottle"></i>
            <h4>Capacidades</h4>
          </div>
          <span>{{ item.sizes }}</span>
        </li>
        <li class="varieties">
          <div class="title">
            <i class="fab fa-envira"></i>
            <h4>Castas</h4>
          </div>
          <span>{{ item.varieties }}</span>
        </li>
        <li class="enologist">
          <div class="title">
            <i class="fas fa-wine-glass"></i>
            <h4>Enólogos</h4>
          </div>
          <span>{{ item.enologist }}</span>
        </li>
      </ul>
      <ul class="product_text block">
        <li class="taste_note">
          <div class="title">
            <i class="fas fa-clipboard"></i>
            <h4>Notas de Prova</h4>
          </div>
          <span>{{ item.taste_note }}</span>
        </li>
        <li class="more_info">
          <div class="title">
            <i class="fas fa-file-alt"></i>
            <h4>Informações Adicionais</h4>
          </div>
          <span>{{ item.info }}</span>
        </li>
      </ul>
    </div>

    <!-- START Modal -->
    <!--
    <modal
      v-if="modal.display"
      @close="modal.display = false"
      class="modal_item"
    >
      <slick-carousel slot="item" v-bind="carousel.settings">
        <div>
          <img
            v-if="item.image"
            :src="item.image.url"
            :alt="item.name"
            class="modal_image"
          />
        </div>
        <div v-for="(image, index) in item.gallery" :key="index">
          <img
            v-if="image"
            :src="image.url"
            :alt="image.alt"
            class="modal_image"
          />
        </div>
      </slick-carousel>
    </modal>
    -->
    <!-- END Modal -->
  </div>
</template>

<script>
export default {
  props: ['topics'],
  data: () => {
    return {
      modal: {
        display: false
      },
      carousel: {
        settings: {
          dots: true,
          fade: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
          edgeFriction: 0.35
        }
      },
      image: {
        width: '',
        height: '',
        loaded: false
      }
    }
  },
  computed: {
    item: function() {
      return this.topics.single
    },
    main_image: function() {
      let item = this.item
      return item.image_bottle.url ? item.image_bottle : item.image
    }
  },
  created() {
    this.$emit('update')
    this.set_image_meta(this.topics.single.image.url)
  },
  methods: {
    display_modal(item) {
      if (item.image.url || item.gallery.length > 0) {
        this.modal.display = true
        this.item = item
      }
    },
    set_image_meta(url) {
      let img = new Image()
      img.onload = () => {
        this.image.width = img.width
        this.image.height = img.height
        this.image.loaded = true
        this.resize()
      }
      img.src = url
    },
    resize() {
      let size = this.calculateAspectRatioFit(this.image.width, this.image.height, window.innerWidth, window.innerHeight - 150)
      this.$emit('resize', size)
    },
    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
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
      .thumbs_wrapper {
        width: 50px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
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
