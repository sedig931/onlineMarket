<template>
  <div @click="this.hideFromOverlay" class="overlay-div">
    <!-- <div class="new-outer-container"> -->
    <div class="cart-view-outercontainer">
      <img
        v-show="!this.showPayContainer"
        @click="this.$emit('showHideCart')"
        class="hide-icon"
        src="../../icons/white-hide-icon.png"
        alt=""
      />
      <div
        v-show="!this.showPayContainer"
        class="cart-view-innercontainer add-scroll"
      >
        <div class="cart-header-div">
          <span class="txt-header">Photo</span>
          <span class="txt-header">Name</span>
          <span class="txt-header">Price</span>
          <span class="txt-header">Amount</span>
          <span class="txt-header">Total</span>
        </div>
        <div
          v-for="(item, i) in this.cart"
          :key="item.name"
          :id="item.id"
          class="cart-item-div"
          :class="
            i === this.cart.length - 1 &&
            this.popProducts.find((id) => id === item.id)
              ? 'red-back '
              : i !== this.cart.length - 1 &&
                this.popProducts.find((id) => id === item.id)
              ? 'cart-item-not-Last red-back'
              : i !== this.cart.length - 1
              ? 'cart-item-not-Last'
              : ''
          "
          @click="this.popProduct"
        >
          <img
            v-show="this.popProducts.find((id) => id === item.id)"
            class="delete-icon"
            src="../../icons/delete-icon.webp"
            alt=""
          />
          <img
            class="item-img"
            :src="`https://serverprojectmarketing.netlify.app/uploads/market/${item.img}`"
          />
          <span class="item-name txt">{{ item.name }}</span>
          <span class="item-price txt">{{ "$ " + `${item.price - 5}` }}</span>
          <input
            class="item-amount"
            :id="item.id"
            type="number"
            :value="item.amount"
            @change="this.decAmount"
          />
          <span class="item-total txt">{{
            "$ " + item.price * item.amount
          }}</span>
        </div>
      </div>
      <div v-show="!this.showPayContainer" class="confirm-cancel-cart-div">
        <button
          @click="this.dropCancelCart"
          :class="
            this.popProducts.length > 0
              ? 'drop-product btn-cancel'
              : 'btn-cancel'
          "
          :name="this.popProducts.length > 0 ? 'drop' : 'cancel all'"
        >
          {{ this.popProducts.length > 0 ? "drop" : "cancel all" }}
        </button>
        <span class="total">{{
          "$ " +
          this.cart.reduce(
            (sum, pro) => (sum += pro.amount * pro.price),
            (sum = 0)
          )
        }}</span>
        <button @click="this.confirmCart" class="btn-confirm">confirm</button>
      </div>
      <Payment
        v-if="this.showPayContainer"
        :hideShowPayCont="showPayContainer"
        :totalAmount="
          this.cart.reduce(
            (sum, pro) => (sum += pro.amount * pro.price),
            (sum = 0)
          )
        "
        @backtocart="this.showPayContainer = false"
        @submitCart="this.submitPayment"
      />
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import Payment from "./payContainer.vue";
import { addDeleveryCart } from "../../composables/modal.js";
export default {
  props: ["cart"],
  components: {
    Payment,
  },
  data() {
    return {
      popProducts: [],
      showPayContainer: false,
      cartTotalAmount: 0,
    };
  },
  methods: {
    hideFromOverlay(e) {
      if (e.target.classList.contains("overlay-div")) {
        this.$emit("showHideCart");
      }
    },
    decAmount(e) {
      if (e.target.value < 1) {
        e.target.value = 1;
        return;
      }
      this.cart.find((pro) => pro.id === e.target.id).amount = parseInt(
        e.target.value
      );
      this.$emit("updateCart", this.cart);
    },
    popProduct(e) {
      if (e.target.classList.contains("item-amount")) return;
      if (this.popProducts.find((id) => id === e.currentTarget.id)) {
        this.popProducts = this.popProducts.filter(
          (id) => id !== e.currentTarget.id
        );
      } else {
        this.popProducts.push(e.currentTarget.id);
      }
      // e.stopPropagation();
    },
    dropCancelCart(e) {
      if (e.target.name === "drop") {
        const cart2 = [];
        this.cart.forEach((pro) => {
          if (!this.popProducts.find((id) => id === pro.id)) {
            cart2.push(pro);
          } else {
            pro.carted = false;
          }
        });
        this.popProducts = [];
        this.$emit("updateCart", cart2);
      } else {
        this.cart.forEach((pro) => this.popProducts.push(pro.id));
        if (this.popProducts.length === 0) return;
        this.cart.forEach((pro) => (pro.carted = false));
        this.$emit("updateCart", []);
        this.popProducts = [];
      }
    },
    confirmCart() {
      this.showPayContainer = true;
      // got to pay window
      // save to database untill recth customoer.
    },
    submitPayment(paymentValues) {
      if (this.cart.length < 1) return;
      const cart = {
        phone: paymentValues.phone,
        products: [],
        location: [1231, 231],
        deleveredNumber: Math.floor(Math.random() * 1000),
      };
      this.cart.forEach((pro) =>
        cart.products.push({ id: pro.id, amount: pro.amount })
      );

      this.showPayContainer = false;
      this.$emit("showHideCart");
      this.cart.forEach((pro) => (pro.carted = false));
      this.$emit("updateCart", []);

      // commint this when you don't use server, just save in session..
      // this.addCartToDel(cart);
      this.$emit("pushDelevering", cart);
      // try {
      // console.log("here");
      // await addDeleveryCart(cart);
      // } catch (err) {
      // console.log(err.message);
      // }
    },
    async addCartToDel(cart) {
      try {
        // commint this when you don't use server, just save in session..
        // await addDeleveryCart(cart);
      } catch (err) {
        console.log(err.message);
      }
    },
  },
};
</script>

<style scoped>
.overlay-div {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(0.9px);
  z-index: 1;
}
.red-back {
  background-color: rgb(139, 67, 67);
}
.new-outer-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
.cart-view-outercontainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 400px;
  border: 0.5px solid white;
  border-radius: 15px;
  /* background-color: #39b385; */
  background-image: var(--gradient-primary-back);
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2),
    0px 0px 5px 3px rgba(3, 3, 3, 0.4);
}

.cart-view-innercontainer {
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  width: inherit;
  height: 350px;
  min-height: 250px;
  border: 1px solid white;
}

.add-scroll {
  overflow: scroll;
  scrollbar-color: #567272 #e0e0e0;
  scrollbar-width: thin;
  overflow-x: hidden;
  overflow-y: auto;
}
/* cart-view-innercontainer::-webkit-scrollbar {
  width: 10px;
}
.cart-view-innercontainer::-webkit-scrollbar-track {
  background-color: darkgrey;
} */

.hide-icon {
  /* position: relative; */
  top: 5px;
  height: 20px;
  margin: 5px;
  cursor: pointer;
}

.cart-header-div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* min-width: 280px; */
  /* margin: 3px; */
  width: inherit;
  height: 16px;
  border-bottom: 1.5px solid white;
}

.txt-header {
  /* width: 50px; */
  font-size: 14px;
  text-align: center;
  /* margin-left: 7px; */
  /* font-weight: bold; */
  color: white;
}

.cart-item-div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 280px;
  /* margin: 3px; */
  /* border-radius: 0px 0px 10px 10px; */
  padding: 4.5px;
  cursor: pointer;
}
.cart-item-div:hover {
  background-color: #95b3b3;
  /* border-left: 1.5px solid rgb(240, 235, 235); */
  /* border-radius: 10px; */
}
.cart-item-not-Last {
  border-bottom: 1.5px solid white;
  /* border-radius: 10px 10px 0px 0px; */

  /* border-bottom-width: 2px; */
}

.item-img {
  height: 35px;
  width: 35px;
  border: 0.5px solid white;
  border-radius: 17.5px;
}
.item-name {
  min-width: 76px;
  text-align: center;
}
.item-price {
  min-width: 40px;
  text-align: center;
}
.item-total {
  min-width: 40px;
  text-align: center;
}
.item-amount {
  max-width: 40px;
  font-size: 12px;
  border: none;
  border-radius: 5px;
  text-align: center;
}

.delete-icon {
  height: 13px;
}
.confirm-cancel-cart-div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* background-color: black; */
  width: inherit;
  margin: 15px;
}

.btn-cancel {
  padding: 5px 15px 5px 15px;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  background-color: rgb(200, 50, 50);
  font-size: 13px;
  font-family: "AR One Sans";
  cursor: pointer;
  width: 91px;
}

.btn-cancel:hover {
  background-color: rgb(227, 81, 81);
}

.drop-product {
  background-color: rgb(213, 139, 0);
}
.drop-product:hover {
  background-color: rgb(209, 158, 62);
}

.btn-confirm {
  padding: 5px 15px 5px 15px;
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  background-color: rgb(70, 150, 70);
  font-size: 13px;
  font-family: "AR One Sans";
  width: 91px;

  cursor: pointer;
}

.btn-confirm:hover {
  background-color: rgb(70, 200, 70);
}

.total {
  font-size: 20px;
  color: white;
}
.txt {
  font-size: 13px;
  color: white;
  /* width: 30px; */
}
span {
  font-family: "AR One Sans";
}
</style>