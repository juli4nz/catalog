<template>
  <div id="app" :class="$mqAliases">
    <!--<transition name="fade">-->
    <router-view />
    <!--</transition>-->
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
@import url('https://fonts.googleapis.com/css?family=Prata:400');
@import url('https://fonts.googleapis.com/css?family=Rubik:300,500,700');
@import url('./assets/fonts/foods/foods.css');

/** Basic Styles */
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

ul {
  padding: 0;
}

ul li {
  list-style: none;
  padding: 0;
}

h1,
h2,
h3,
h4,
h4,
h6 {
  font-family: 'Prata';
  font-weight: 400;
}

body,
p {
  font-family: 'Rubik';
  font-weight: 300;
}

p {
  margin: 0;
}

button {
  cursor: pointer;
}

/** Transitions */

.slide-fade-up-enter-active,
.slide-fade-down-enter-active,
.slide-fade-left-enter-active,
.slide-fade-right-enter-active,
.fade-enter-active,
.slide-fade-up-leave-active,
.slide-fade-down-leave-active,
.slide-fade-left-leave-active,
.slide-fade-right-leave-active,
.fade-leave-active {
  transition: all 0.3s ease-out;
}
/** fade up */
.slide-fade-up-enter,
.slide-fade-up-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}
/** fade down */
.slide-fade-down-enter,
.slide-fade-down-leave-to {
  transform: translateY(50px);
  opacity: 0;
}
/** fade left */
.slide-fade-left-enter,
.slide-fade-left-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
/** fade right */
.slide-fade-right-enter,
.slide-fade-right-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
/** fade */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
