<template>
  <StripeElements
      v-if="stripeLoaded"
      v-slot="{ elements }"
  ref="elms"
  :stripe-key="stripeKey"
  >
  <StripeElement
      ref="card"
      :elements="elements"
      :options="cardOptions"
  />
  </StripeElements>
  <button type="button" @click="pay">Pay</button>
  <div id="checkout-container"></div>
</template>

<script lang="js">
import { StripeElements, StripeElement } from 'vue-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {defineComponent, ref, onBeforeMount, reactive} from 'vue'
import {creditCardPayment} from "@/services/parisjanitor/endpoints/payments";

export default defineComponent({
  name: 'CardOnly',

  components: {
    StripeElements,
    StripeElement,
  },

  setup() {
    const stripeKey = ref(process.env.VUE_APP_STRIPE_KEY) // test key
    const cardOptions = ref({
      // https://stripe.com/docs/stripe.js#element-options
      value: {
        postalCode: '92150',
      },
    })

    // eslint-disable-next-line no-unused-vars
    const state = reactive({
      stripeApi: null
    });
    const stripeLoaded = ref(false)
    const card = ref()
    const elms = ref()
    const stripePromise = loadStripe(stripeKey.value)

    onBeforeMount(() => {
      stripePromise.then((stripeRes) => {
        state.stripeApi = stripeRes
        stripeLoaded.value = true
      })
    })

    const pay = () => {
      // Get stripe element
      const cardElement = card.value.stripeElement

      // Access instance methods, e.g. createToken()
      elms.value.instance.createToken(cardElement).then(async (result) => {
        // Handle result.error or result.token
        const paymentRequest = {
          amount: 15000,
          product: "Booking",
          reference: "123456",
          recipientEmail: "sa.bennaceur@gmail.com",
          token: result.token.id
        }
        const res = await creditCardPayment(paymentRequest);
        await elms.value.instance.confirmCardPayment(res.data, {
          payment_method: {
            card: cardElement,
          },
        });
      })
    }

    return {
      stripeKey,
      stripeLoaded,
      cardOptions,
      card,
      elms,
      pay
    }
  }
})
</script>