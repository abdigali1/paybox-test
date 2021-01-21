<template lang="pug">
  div(class='failed')
    img(class='failed__icon' src='@/assets/img/failed.svg')
    h2(class='failed__title') Произошла ошибка
    p(class='failed__text') Попробуйте еще раз
    button(class='failed__button' @click='goToPayment()') Повторить
</template> 

<script>

export default {
  name: 'Failed',
  methods: {
    goToPayment() {
      this.$router.push({ name: 'payment' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.failed 
  padding 15px 80px 0 80px
  display flex
  flex-direction column
  align-items center
  font-family Roboto-Light
  font-weight 900
  color #818181
  &__title
    font-size 18px
    line-height 24px
    margin-bottom 5px
  &__text
    font-size 13px
    line-height 20px
  &__icon
    width 100px
    height 100px
    margin-bottom 20px
  &__button
    color #FCF2F5
    background-color #FF0048
    border 2px solid #FF0048
    margin-top 20px
    cursor pointer
    display flex
    align-items center
    justify-content center
    text-transform uppercase
    border-radius 20px
    padding 5px 0
    width 100%
    font-size 17px
    text-align center
    letter-spacing .5px
    outline none
</style>