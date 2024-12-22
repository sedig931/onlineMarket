<template>
  <div v-show="this.hideShowPayCont" class="outer-payment-div">
    <div class="back-arrow-div">
      <img
        v-show="!this.showPayContainer"
        @click="this.$emit('backtocart')"
        class="back-arrow-icon"
        src="../../icons/wleftarrow.png"
        alt=""
      />
    </div>
    <div class="make-pay-to-div">
      <span class="make-pay-to-span">Make a payment to</span>
      <span class="company-name-span">Unown compny Co.</span>
    </div>
    <form class="payment-form" @submit.prevent="this.sentPaymentValues">
      <label class="phone-lbl" for="phone">Phone Number</label>
      <input
        v-model="this.paymentValues.phone"
        name="phone"
        class="input phone-input"
        type="text"
        required
      />

      <label class="amount-lbl" for="amount">Amount to Pay</label>
      <input
        class="input amount-input"
        type="text"
        :value="'$' + this.totalAmount"
      />
      <label class="name-on-card-lbl" for="name-oncard">Name on Card</label>
      <input class="input name-on-card-input" type="text" />

      <div class="inner-row-form">
        <div class="inner-div">
          <label class="card-number-lbl" for="card-number">Card Number</label>
          <label class="expiry-lbl" for="expiry">Expiry</label>
          <label class="cvc-lbl" for="cvc">CVC</label>
        </div>
        <div class="inner-div">
          <input
            name="input card-number"
            class="input card-number-input"
            type="password"
          />
          <input name=" expiry" class="input expiry-input" type="text" />
          <input name=" cvc" class="input cvc-input" type="text" />
        </div>
      </div>
      <label class="email-lbl" for="email">Email</label>
      <input class="input email-input" type="email" />
      <button class="submit-btn">pay now</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["hideShowPayCont", "totalAmount"],
  data() {
    return {
      paymentValues: {},
      // paymentValues: {
      //   phone: null,
      //   nameOnCart: null,
      //   CardNumber: null,
      //   expiry: null,
      //   cvc: null,
      //   email: null,
      // },
    };
  },
  methods: {
    sentPaymentValues() {
      this.$emit("submitCart", this.paymentValues);
      //set paymentsValues to null;
      this.paymentValues = {};
    },
  },
};
</script>

<style>
.outer-payment-div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  color: white;
  margin: 12px 0px 12px 0px;
  font-family: "AR One Sans";
  /* padding: 10px; */
}
.back-arrow-div {
  width: 200px;
}
.back-arrow-icon {
  cursor: pointer;
  height: 20px;
  margin-left: -5px;
}

label {
  width: 200px;
  text-align: start;
  font-size: 12px;
}
.make-pay-to-div {
  display: flex;
  flex-direction: column;
  width: 200px;
}
.make-pay-to-span {
  font-size: 12px;
  color: rgb(203, 203, 203);
}
.payment-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: 100%;
}

.input {
  height: 20px;
  width: 200px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  margin-top: 3px;
}

.inner-row-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 10px 0px 10px 0px;
  width: 200px;
}

.inner-div {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
}

.card-number-lbl {
  margin-right: 5px;
  width: 125px;
}

.expiry-lbl {
  margin: 0px 3px 0px 12px;
  width: 37px;
}
.cvc-lbl {
  width: 37px;
  margin-left: 4px;
}

.card-number-input {
  width: 118px;
}

.expiry-input {
  margin: 3px 3px 10px 3px;
  width: 35px;
}

.cvc-input {
  width: 30px;
}

.submit-btn {
  width: 204px;
  border: none;
  /* height: 20px; */
  padding: 4px;
  border-radius: 5px;
  background-color: rgb(70, 150, 70);
  color: white;
  cursor: pointer;
  border: 1px solid white;
}

.submit-btn:hover {
  background-color: rgb(70, 200, 70);
}
</style>