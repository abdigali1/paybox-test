<template lang="pug">
  div(class='payment')
    input(Class='payment__price-input' type='number' placeholder='Сумма платежа' v-model='price' :readonly='getSpinnerValue')
    div(class='payment__text-block')
      p(class='payment__label') Комиссия:
      div(class='payment__price-block')
        p {{ calculateComission }}
        span ₸
    div(class='payment__text-block')
      p(class='payment__label') Итоговая сумма:
      div(class='payment__price-block')
        p {{ calculateTotal }}
        span ₸
    button(class='payment__button' :disabled='getSpinnerValue' @click='pay()') 
      p Оплатить
      div(class="loader" v-if='getSpinnerValue')
    div(class='payment__privacy')
      input(type='checkbox' v-model='privacyPolicy' :disabled='getSpinnerValue' id='privacy')
      label(for='privacy') Я ознакомлен и присоединяюсь
        span  к договору
    div(class='payment__info-text') 
      p Комиссия может быть удержана 
        br 
        | банком эмитентом карты
        br
        | отправителя
    div(v-if='errors.length' :class='{ animate: animate }' class='payment__error')
      ul
        li(v-for="error in errors") {{ error }}
</template> 

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Payment',
  data() {
    return {
      price: '',
      privacyPolicy: false,
      errors: [],
      animate: false,
    }
  },
  methods: {
    ...mapMutations({
      setSpinner: 'SET_SPINNER',
    }),
    validateForm() {
      const form = { ...this.getFormValue }
      if(form.year && form.month && form.ccv.length === 3 
      && form.num1.length === 4 && form.num2.length === 4 
      && form.num3.length === 4 && form.num4.length === 4
      && form.name) {
        return true
      } 
      return false
    },
    pay() {
      console.log('valid form', this.validateForm());
      if(this.price >= 500 && this.privacyPolicy && this.validateForm()) {
        this.setSpinner(true)
        setTimeout(() => {
          if(Math.round(Math.random()) == 1) this.$router.push({ name: 'success' })
          else this.$router.push({ name: 'failed' })
          this.setSpinner(false)
        }, 5000)
      }
      this.errors = [];
      this.animate = !this.animate
      if(!this.validateForm()) {
        this.errors.push('Данные карты не корректны.')
      }
      if (this.price < 500) {
        this.errors.push('Сумма платежа не должна быть менее 500тг.')
      }
      if (!this.privacyPolicy) {
        this.errors.push('Подтвердите, что вы ознакомлены и присоединяетесь к договору.')
      }
    }
  },
  computed: {
    ...mapGetters({
      getFormValue: 'getFormValue',
      getSpinnerValue: 'getSpinnerValue'
    }),
    calculateComission() {
      return this.price ? +this.price/100 : 0
    },
    calculateTotal() {
      return this.price ? +this.price/100 + +this.price : 0
    }
  }
}
</script>

<style lang="stylus" scoped>
.payment 
  max-width 245px
  margin 0 auto
  display flex
  flex-direction column
  align-items center
  &__price-input, &__button
    text-transform uppercase
    border-radius 20px
    padding 8px 0
    width 100%
    font-size 17px
    text-align center
    letter-spacing .5px
    outline none
  &__price-input
    color #4D4D4D
    background-color white
    border 2px solid #4D4D4D
    margin-bottom 25px
  &__price-input::placeholder
    color #B2B2B2
  &__button
    color #FCF2F5
    background-color #ED4855
    border 2px solid #ED4855
    margin-bottom 15px
    cursor pointer
    display flex
    align-items center
    justify-content center
    transition all 0.3s ease
  &__button:hover
    transform scale(1.02)
    opacity .95
    transition all 0.3s ease
  &__button:focus
    background-color #d5404c
  &__button div
    margin-left 10px
  &__text-block
    display flex
    align-items center
    justify-content space-between
    width 100%
    font-size 13px
    color #848484
    margin-bottom 15px
    font-family Roboto-Light
    font-weight 900
  &__price-block 
    display flex
    align-items flex-end
    & span 
      font-size 12px
      line-height 12px
  &__privacy
    display flex
    text-align center
    font-size 13px
    color #848484
    margin-bottom 10px
    font-family Roboto-Light
    font-weight 900
    & span 
      color #EE5365
  &__info-text 
    font-size 13px
    color #848484
    text-align center
    font-family Roboto-Light
    font-weight 900
    margin-bottom 20px
  &__error
    font-size 13px
    color #ED4855
    text-align center
    font-family Roboto-Light
    font-weight 900
  &__error ul 
    list-style none
  &__error li
    margin-bottom 10px
  &__error li:last-child
    margin-bottom 0

.animate
  animation: shake 0.2s ease;
@keyframes shake
  0%, 100%, 30%, 70%
    transform translate(0, 0)
  10%
    transform translate(1px, 1px)
  50%
    transform translate(-1px, -1px)
  90%
    transform translate(1px, 1px)

.loader
  border 4px solid transparent
  border-top 4px solid #FCF2F5
  border-radius 50%
  width 20px
  height 20px
  animation spin 1s linear infinite

@keyframes spin
  0% 
    transform rotate(0deg)
  100% 
    transform rotate(360deg)
</style>