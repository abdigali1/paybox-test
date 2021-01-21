<template lang="pug">
  div(class='success')
    img(class='success__icon' src='@/assets/img/success.svg')
    h2(class='success__title') Перевод совершен
    p(class='success__text') Отправитель:
    p(class='success__text') Сумма:
    p(class='success__text') Комиссия:
    button(class='success__button' @click='goToPayment()') ОК
</template> 

<script>

export default {
  name: 'Success',
  methods: {
    goToPayment() {
      this.$router.push({ name: 'payment' })
    }
  }
}
</script>

<style lang="stylus" scoped>
.success 
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