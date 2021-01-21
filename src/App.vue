<template lang="pug">
  div(class='app') 
    div(class='container')
      div(class='app__content')
        div(class='app__header')
          img(src='@/assets/img/bank.svg')
          h1(class='app__title') Карта отправителя
        div(class='app__row')
          div(class='app__col')
            div(class='app__card card')
              div(class='card__row card__row_flex-end')
                div(class='card__logo')
                  img(src='@/assets/img/visa.png')
                div(class='card__logo')
                  img(src='@/assets/img/mastercard.png')
                div(class='card__logo')
                  img(src='@/assets/img/mastercard.png')
              div(class='card__row')
                div(class='card__input-block input-block')
                  label(class='input-block__label') номер карты
                  div(class='input-block__row')
                    input(class='input-block__input input-block__input_large' :readonly='getSpinnerValue' ref='num1' type='number' v-model='form.num1')
                    input(class='input-block__input input-block__input_large' :readonly='getSpinnerValue' ref='num2' type='number' v-model='form.num2')
                    input(class='input-block__input input-block__input_large' :readonly='getSpinnerValue' ref='num3' type='number' v-model='form.num3')
                    input(class='input-block__input input-block__input_large' :readonly='getSpinnerValue' ref='num4' type='number' v-model='form.num4')
              div(class='card__row')  
                div(class='card__input-block input-block')
                  label(class='input-block__label') имя на карте
                  input(class='input-block__input' ref='name' :readonly='getSpinnerValue' type='text' v-model='form.name')
                div(class='card__input-block input-block')
                  label(class='input-block__label input-block__label_text-end') срок действия
                  div(class='input-block__row')
                    select(class='input-block__input' :disabled='getSpinnerValue' ref='month' v-model='form.month')
                      option(v-for='n in 12' :value="n") {{ n }}
                    span /
                    select(class='input-block__input' :disabled='getSpinnerValue' ref='year' v-model='form.year')
                      template(v-for='n in 31')
                        option(v-if='n > 20' :value="n") {{ n }}
            div(class='app__card card card_back-side')
              div(class='card__line')
              div(class='card__input-block input-block input-block_horizontal')
                label(class='input-block__label input-block__label_text-end') сcv/cvc
                input(class='input-block__input' ref='ccv' type='password' :readonly='getSpinnerValue' v-model='form.ccv')
          div(class='app__col')
            router-view
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'Main',
  data() {
    return {
      form: {
        num1: null,
        num2: null,
        num3: null,
        num4: null,
        name: null,
        month: null,
        year: null,
        ccv: ''
      }
    }
  },
  methods: {
    ...mapMutations({
      setForm: 'SET_FORM',
    })
  },
  computed: {
    ...mapGetters({
      getSpinnerValue: 'getSpinnerValue'
    }),
  },
  watch: {
    'form.num1': {
      handler(newValue, oldValue) {
        this.setForm({num1: newValue})
        if(newValue.length === 4) {
          this.$refs.num2.focus()
        } else if (newValue.length > 4) this.form.num1 = oldValue
      }
    },
    'form.num2': {
      handler(newValue, oldValue) {
        this.setForm({num2: newValue})
        if(newValue.length === 4) {
          this.$refs.num3.focus()
        } else if (newValue.length > 4) this.form.num2 = oldValue
      }
    },
    'form.num3': {
      handler(newValue, oldValue) {
        this.setForm({num3: newValue})
        if(newValue.length === 4) {
          this.$refs.num4.focus()
        } else if (newValue.length > 4) this.form.num3 = oldValue
      }
    },
    'form.num4': {
      handler(newValue, oldValue) {
        this.setForm({num4: newValue})
        if(newValue.length === 4) {
          this.$refs.name.focus()
        } else if (newValue.length > 4) this.form.num4 = oldValue
      }
    },
    'form.name': {
      handler(newValue, oldValue) {
        this.setForm({name: newValue})
        if(newValue.length === 21) {
          this.$refs.month.focus()
        } else if (newValue.length > 21) this.form.name = oldValue
      }
    },
    'form.month': {
      handler(newValue, oldValue) {
        this.setForm({month: newValue})
        if(newValue) {
          this.$refs.year.focus()
        }
      }
    },
    'form.year': {
      handler(newValue, oldValue) {
        this.setForm({year: newValue})
        if(newValue) {
          this.$refs.ccv.focus()
        }
      }
    },
    'form.ccv': {
      handler(newValue, oldValue) {
        this.setForm({ccv: newValue})
        if (newValue.length > 3) this.form.ccv = oldValue
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.app 
  font-family Roboto-Regular
  &__title 
    font-size 20px
    line-height 22px
    color #727272 
    font-weight 500
  &__row
    display flex
    align-items flex-start
  &__col:first-child 
    width 55%
    height 330px
    position relative
  &__col:last-child 
    width 45%
  &__header 
    display flex
    align-items center
    margin 20px 0 10px 0
    & img 
      width 20px
      height 20px
      margin-right 13px

.card 
  box-shadow: 0px 0px 14px -5px #000000;
  position relative
  border-radius 12px
  height 250px
  width 470px
  padding 20px 24px 24px
  background rgb(237,74,102)
  background linear-gradient(150deg, rgba(237,74,102,1) 0%, rgba(237,72,80,1) 50%, rgba(237,72,58,1) 100%)
  border 1px solid #C33B54
  z-index 5
  &_back-side 
    z-index 4
    position absolute
    right 0
    bottom 0
    height 250px
    width 470px
    border-color #929090
    display flex
    flex-direction column
    justify-content space-between
    background: rgb(184,181,181);
    background: linear-gradient(52deg, rgba(184,181,181,1) 0%, rgba(161,160,160,1) 50%, rgba(136,135,135,1) 100%);
  &__line 
    margin-top 5%
    width calc(100% + 48px)
    height 40px
    background-color #2A2A2A
    align-self center
  &__row 
    display flex
    align-items center
    &_flex-end 
      justify-content flex-end
      margin-bottom 15px
  &__row:nth-child(2)
    margin-bottom 15px
  &__row:last-child
    justify-content space-between
    .input-block:first-child
      width 65%
    .input-block:last-child  
      width 31%
  &__logo 
    height 40px
    margin-right 13px
    &:last-child 
      margin-right 0
    &:first-child img
      width 80px
      height 70%
    &:first-child
      display flex
      align-items center
      justify-content center
    & img 
      height 100%
      width 55px

.input-block 
  display flex
  flex-direction column
  width 100%
  &__row 
    display flex
    align-items center
    justify-content space-between
    span 
      font-size 25px
      margin 0 3px
      color #FCF2F5
      font-family Roboto-Light
  &_horizontal
    align-items center
    flex-direction unset
    justify-content flex-end
    & input 
      background-color #735C5C
      width 66px
      margin-left 10px
  &__label 
    font-family Roboto-Light
    font-weight 900
    font-size 16px
    line-height 20px
    color #FCF2F5
    font-weight 100
    text-transform uppercase
    margin-bottom 5px
    &_text-end 
      text-align end
  &__input:disabled, input:read-only
    opacity .8
  &__input 
    width 100%
    height 40px
    border-radius 5px
    background-color #963241
    border none
    font-family Roboto-Light
    font-weight 900
    font-size 22px
    line-height 28px
    color #FCF2F5
    font-weight 100
    padding 0 5px
    letter-spacing 0px
    text-align center
    text-transform uppercase
    &_large 
      height 45px
      width 22%

@media screen and (max-width: 960px)
  .app 
    font-family Roboto-Regular
    &__row
      display flex
      flex-direction column
      align-items center
      justify-content center
    &__col:first-child 
      width 100%
      height 330px
      width 500px
      position relative
      margin-bottom 20px
    &__col:last-child
      width 100%
</style>
<style lang="stylus">
* 
  margin 0
  padding 0
  box-sizing border-box
@font-face
   font-family Roboto-Light
   font-style small
   src url('~@/assets/font/Roboto-Light.ttf')
@font-face
   font-family Roboto-Regular
   font-style normal
   src url('~@/assets/font/Roboto-Regular.ttf')
.container 
  max-width 960px
  padding-right 30px;
  padding-left 30px;
  margin 0 auto
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button
  -webkit-appearance none
  margin 0
input[type=number]
  -moz-appearance textfield
select::-ms-expand
  display none
select
  -webkit-appearance none
  appearance none
</style>