<template>
  <header class="header">
    <nav class="nav-div blur-div">
      <div class="left-div-nav">
        <div
          class="delever-div"
          :class="this.deleveringCart.length > 0 ? 'delevering-div' : ''"
          @click="this.viewDeleveringCarts"
        >
          <!-- </div> ---------------------------------------------- -->

          <div v-show="this.deleveringCart.length > 0" class="count-div">
            <span class="count">{{ this.deleveringCart.length }}</span>
          </div>
          <img
            v-show="this.deleveringCart.length < 1"
            class="cart-icon"
            src="../icons/delevery-icon.png"
          />
          <img
            v-show="this.deleveringCart.length > 0"
            class="cart-icon"
            src="../icons/ydelevery-icon.png"
          />
        </div>
        <div
          class="dcart-view-innercontainer add-scroll"
          v-show="this.showDeleveringCart"
        >
          <div v-if="this.deleveringCart.length < 1" class="no-cart-div">
            <span>
              {{ this.checkForCartHeader }}
            </span>
            <form
              @submit.prevent="this.checkForDelCart"
              class="flex-column checkdelCart-form"
            >
              <input
                placeholder="Phone number"
                type="text"
                class="checkDelCart-input"
                v-model="this.phoneCheck"
              />
              <button class="checkDelCart-btn">check</button>
            </form>
          </div>

          <div
            v-for="(cart, index) in this.deleveringCart"
            :key="cart.deleveredNumber"
            class="onedelcart-div"
            :class="
              index + 1 === this.deleveringCart.length ? '' : 'middle-div'
            "
            :id="index"
            @click="this.showDelCartsDetails"
          >
            <div class="del-status-div row-flex-display">
              <span class="del-status-span">delevering..</span>
              <img src="../icons/wait-icon.png" alt="" class="wait-icon" />
            </div>

            <div v-if="cart.viewDet" class="one-cart-det">
              <div class="cart-details-header-div row-flex-display">
                <span class="header-txt">pro</span>
                <span class="header-txt">$</span>
                <span class="header-txt">q</span>
                <span class="header-txt">tot</span>
              </div>
              <div class="one-cart-det one-cart-det-scroll add-scroll">
                <div
                  v-for="pro in cart.products"
                  :key="pro.id"
                  class="cart-details-one-el-div row-flex-display middle-div"
                >
                  <span class="pro-txt">{{
                    pro.name[0] + pro.name[1] + pro.name[2]
                  }}</span>
                  <span class="pro-txt">{{ "$ " + pro.price }}</span>
                  <span class="pro-txt">{{ pro.amount }}</span>
                  <span class="pro-txt">
                    {{ "$ " + pro.amount * pro.price }}
                  </span>
                </div>
              </div>
            </div>

            <div class="outer-delnumber-total-div row-flex-display">
              <div
                class="del-number-div row-flex-display delnumber-deltotal-div"
              >
                {{ cart.deleveredNumber }}
              </div>
              <div
                class="del-total-amount-div row-flex-display delnumber-deltotal-div"
              >
                {{
                  "$ " +
                  cart.products.reduce(
                    (sum, pro) => (sum += pro.price * pro.amount),
                    (sum = 0)
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-input-div">
        <input class="search-input-element" type="input" placeholder="Search" />

        <img class="search-icon" src="../icons/search-icon.png" />
      </div>
      <div class="right-div">
        <div
          class="cart-div"
          :class="this.cart.length >= 1 ? 'carted-div' : ''"
          @click="viewCart"
        >
          <div v-show="this.cart.length >= 1" class="count-div">
            <span class="count">{{ this.cart.length }}</span>
          </div>
          <img
            v-show="this.cart.length < 1"
            class="cart-icon"
            src="../icons/cart-icon.png"
          />
          <img
            v-show="this.cart.length >= 1"
            class="cart-icon"
            src="../icons/yallowcart-icon.png"
          />
        </div>
      </div>
    </nav>
    <div class="header--1">
      <div class="left-div-header">
        <div class="titles-div">
          <span class="span-welcome-to span-welcome-company">Welcome to</span>
          <div class="hilight-div">
            <h1>
              <span class="highlight">UNKNOWN</span>
            </h1>
          </div>
          <span class="span-company span-welcome-company">Company</span>
        </div>
        <!-- <img class="welcome-img" src="../icons/shopcar-icon.jpg" /> -->
      </div>
      <div class="adds-div">
        <img class="welcome-img" src="../icons/cart-icon.png" />
      </div>
    </div>
    <div class="contact-us">
      <a href="#">
        <img
          class="socials-contacts facebook-icon"
          src="../icons/email-icon.png"
        />
      </a>
      <a href="#">
        <img
          class="socials-contacts facebook-icon"
          src="../icons/facebook-icon.png"
        />
      </a>
      <a href="#">
        <img
          class="socials-contacts facebook-icon"
          src="../icons/insta-icon.png"
        />
      </a>
    </div>
  </header>
  <CartView
    v-if="this.showcart"
    :cart="this.cart"
    @updateCart="this.updateCart"
    @showHideCart="this.viewCart"
    @pushDelevering="this.pushToDelevering"
  />
  <SectionOne
    @pushToCart="this.pushToCart"
    @showCart="this.showcart = true"
    :offers="this.offersProducts"
  />
  <SectionTow @pushToCart="this.pushToCart" @showCart="this.showcart = true" />
  <SectionThree
    @pushToCart="this.pushToCart"
    @showCart="this.showcart = true"
    :offers="this.offersProducts"
  />
  <SectionFour />
</template>

<script>
import SectionOne from "./sections/section1.vue";
import SectionTow from "./sections/section2.vue";
import SectionThree from "./sections/section3.vue";
import SectionFour from "./sections/section4.vue";
import CartView from "./cart/cart.vue";
import {
  getOffersProducts,
  getSingleProduct,
  getCustomerDcarts,
} from "../composables/modal.js";
export default {
  components: {
    SectionOne,
    SectionTow,
    SectionThree,
    CartView,
    SectionFour,
  },
  data() {
    return {
      cart: [],
      showcart: false,
      showDeleveringCart: false,
      showCartDetails: false,
      offersProducts: [],
      deleveringCart: [],
      phoneCheck: "",
      checkForCartHeader: "check for cart",
    };
  },
  methods: {
    getNavSticky() {
      // console.log(document.documentElement.clientHeight);
      //   document.documentElement.clientHeight);
      const header = document.querySelector(".header");
      const nav = document.querySelector(".nav-div");
      const navHeight = document
        .querySelector(".nav-div")
        .getBoundingClientRect().height;
      const stickyNav = function (entries) {
        const [entry] = entries;
        if (entry.isIntersecting) nav.classList.remove("sticky");
        else nav.classList.add("sticky");
      };
      const headerObserver = new IntersectionObserver(stickyNav, {
        root: null,
        threshold: 0,
        rootMargin: `-${navHeight}px`,
      });
      headerObserver.observe(header);
    },
    pushToCart(product) {
      this.cart.push(product);
    },
    viewCart() {
      this.showcart = !this.showcart;
    },
    updateCart(newCart) {
      this.cart = newCart;
    },
    async pushToDelevering(cart) {
      for (let i = 0; i < cart.products.length; i++) {
        const proDet = await getSingleProduct(cart.products[i].id);
        cart.products[i].name = proDet.name;
        cart.products[i].price = proDet.price;
      }
      this.deleveringCart.push(cart);
      localStorage.setItem(
        "customer-carts",
        JSON.stringify(this.deleveringCart)
      );
      sessionStorage.setItem(
        "customer-carts",
        JSON.stringify(this.deleveringCart)
      );
      // commint this when you don't use server, just save in session..
      // commint this when you don't use server, just save in session..
      // commint this when you don't use server, just save in session..

      // let newcarts = await getCustomerDcarts(cart.phone);
      // if (newcarts.length === 1) {
      //   this.deleveringCart.push(newcarts[0]);
      //   this.getDelProductsDetials(this.deleveringCart.length - 1);
      //   return;
      // } else {
      //   if (this.deleveringCart.length === 0) {
      //     newcarts.forEach((cart) => {
      //       this.deleveringCart.push(cart);
      //       this.getDelProductsDetials(this.deleveringCart.length - 1);
      //     });
      //     return;
      //   }
      //   const forPush = newcarts.find((cart) => {
      //     let searchingfor = null;
      //     this.deleveringCart.forEach((cart1) => {
      //       if (cart1._id !== cart._id) searchingfor = cart;
      //     });
      //     return searchingfor;
      //   });
      //   newcarts = newcarts.filter((cart) => forPush._id === cart._id);
      //   this.deleveringCart.push(newcarts[0]);
      //   this.getDelProductsDetials(this.deleveringCart.length - 1);
      //   sessionStorage.setItem(
      //     "customer-cart",
      //     JSON.stringify(this.deleveringCart.map((cart) => cart.phone))
      //   );
      // }

      // commint this when you don't use server, just save in session..
      // commint this when you don't use server, just save in session..
      // commint this when you don't use server, just save in session..
    },
    async setOffersProducts() {
      try {
        const offers = await getOffersProducts();
        offers.forEach((pro) => this.offersProducts.push(pro));
      } catch (err) {
        console.log(err.message);
      }
    },
    viewDeleveringCarts(e) {
      if (
        e.target.classList.contains("checkDelCart-input") ||
        e.target.classList.contains("checkDelCart-btn")
      )
        return;
      this.showDeleveringCart = !this.showDeleveringCart;
    },

    async getDelProductsDetials(index) {
      this.deleveringCart[index].products.forEach(async (pro) => {
        const proDet = await getSingleProduct(pro.id);
        pro.name = proDet.name;
        pro.price = proDet.price;
      });
    },
    showDelCartsDetails(e) {
      this.showCartDetails = !this.showCartDetails;
      this.deleveringCart[e.currentTarget.id].viewDet === true
        ? (this.deleveringCart[e.currentTarget.id].viewDet = false)
        : (this.deleveringCart[e.currentTarget.id].viewDet = true);
      e.stopPropagation();
    },

    async checkForDelCart() {
      try {
        if (JSON.parse(localStorage.getItem("customer-carts"))) {
          if (
            JSON.parse(localStorage.getItem("customer-carts")).find(
              (cart) => cart.phone === this.phoneCheck
            )
          ) {
            this.deleveringCart.push(
              JSON.parse(localStorage.getItem("customer-carts")).find(
                (cart) => cart.phone === this.phoneCheck
              )
            );
            sessionStorage.setItem(
              "customer-carts",
              JSON.stringify(this.deleveringCart)
            );
          }
        }
        // commint this when you don't use server, just save in session..
        // commint this when you don't use server, just save in session..
        // commint this when you don't use server, just save in session..
        // const customerCart = await getCustomerDcarts(this.phoneCheck);
        // if (customerCart.length > 0) {
        //   this.deleveringCart = customerCart;
        //   this.deleveringCart.forEach(async (cart, i) =>
        //     this.getDelProductsDetials(i)
        //   );
        //   sessionStorage.setItem(
        //     "customer-cart",
        //     JSON.stringify(this.deleveringCart.map((cart) => cart.phone))
        //   );
        // } else {
        //   this.checkForCartHeader = "sorry, not found";
        // }
        // commint this when you don't use server, just save in session..
        // commint this when you don't use server, just save in session..
        // commint this when you don't use server, just save in session..
      } catch (err) {
        console.log(err.message);
      }
    },
    async initDeleveringCart() {
      if (JSON.parse(sessionStorage.getItem("customer-carts"))) {
        this.deleveringCart = JSON.parse(
          localStorage.getItem("customer-carts")
        );
      }
      //   const cartPhone = JSON.parse(sessionStorage.getItem("customer-cart"));
      //   if (cartPhone) {
      //     cartPhone.forEach(async (phone) => {
      //       await fetch(
      //         `http://localhost:301/customer/get/customer/dcarts/${phone}`,
      //         {
      //           method: "GET",
      //           headers: {
      //             "Content-Type": "application/json",
      //           },
      //         }
      //       )
      //         .then((res) => res.json())
      //         .then((data) => {
      //           data.forEach((singlecart) => {
      //             this.deleveringCart.push(singlecart);
      //             this.getDelProductsDetials(this.deleveringCart.length - 1);
      //           });
      //           return data;
      //         });
      //     });
      //   }
    },
  },
  mounted() {
    this.setOffersProducts();
    this.getNavSticky();
    this.initDeleveringCart();
  },
};
</script>

<style>
:root {
  /* --gradient-primary-gl: linear-gradient(to top left, #26e335, #1ed71e); */
  /* --gradient-primary-cart: linear-gradient(to top left, #fc7a7a, #fc7979); */
  --gradient-primary-input: linear-gradient(to top left, #f8b61a, #f2c874);
  --gradient-primary-dcart: linear-gradient(to top left, #e9a914, #dab56a);
  --gradient-primary-cart: linear-gradient(to top left, #ffc02c, #ffc02c);
  --gradient-primary-txt: linear-gradient(to top left, #ffb300, #fdb817);
  --gradient-primary-carted: linear-gradient(to top left, #f0f0f0, #f6f6f6);
  --gradient-primary-back: linear-gradient(to top left, #374646, #567272);
  --color-primary-title: #ffc02c;
}
body {
  margin: 0;
}
/* --------------------nav------------ */

.nav-div {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 70px;
  z-index: 2;
}
.blur-div {
  backdrop-filter: blur(2px);
}

.sticky {
  position: fixed;
  /* background-color: rgba(255, 255, 255, 0.95); */
}
/* --------------------------------------left navv ----------------------- */
/* --------------------------------------left navv ----------------------- */
/* --------------------------------------left navv ----------------------- */
.left-div-nav {
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-cart-div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  color: #f4f4f4;
  text-shadow: 0px 0px 5px #000000;
  font-weight: bold;
  font-size: 15px;
  width: 100%;
  height: 100%;
}
.checkdelCart-form {
  margin-top: 10px;
  height: 100%;
  width: 100%;
}
.checkDelCart-input {
  height: 20px;
  width: 80%;
  border: 1px solid white;
  border-radius: 7px;
  padding: 0 5px 0 5px;
  margin: 0 0 5px 0;
  background-color: #e4e4e4;
}
.checkDelCart-input::placeholder {
  color: rgb(96, 96, 96);
}
.checkDelCart-btn {
  height: 23px;
  width: 60%;
  border: 1px solid white;
  border-radius: 7px;
  color: rgb(54, 54, 54);
  font-weight: bold;
  color: white;
  background-color: #39b385;
  cursor: pointer;
}
.delever-div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 45px;
  width: 45px;

  border: 0.5px solid white;
  border-radius: 22.5px;
  background-image: var(--gradient-primary-cart);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.delevering-div {
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  background-image: var(--gradient-primary-carted);
}

.add-scroll {
  overflow: scroll;
  scrollbar-color: #567272 #e0e0e0;
  scrollbar-width: thin;
  overflow-x: hidden;
  overflow-y: auto;
}

.dcart-view-innercontainer {
  position: absolute;
  top: 52px;

  display: flex;
  flex-direction: column;
  align-items: center;

  max-height: 303px;
  width: 60%;
  min-width: 150px;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2),
    0px 0px 5px 3px rgba(3, 3, 3, 0.4);
  background-image: var(--gradient-primary-dcart);
}

.onedelcart-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* font-family: "Exo+2"; */
  font-weight: bold;
  font-size: 14px;
  width: 100%;
}
/* .first-div {
  border-radius: 10px 10px 0px 0px;
} */
.middle-div {
  border-bottom: 1px solid rgb(96, 96, 96);
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.row-flex-display {
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
}

.del-status-div {
  font-family: "ABeeZee";
  color: rgb(54, 54, 54);
  height: 30px;
}
.wait-icon {
  margin-left: 5px;
  height: 13px;
}

.one-cart-det {
  font-family: "ABeeZee";
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.one-cart-det-scroll {
  max-height: 100px;
}
.cart-details-header-div {
  justify-content: space-evenly;
  border: 1px solid rgb(96, 96, 96);
  color: rgb(54, 54, 54);
}
.cart-details-one-el-div {
  justify-content: space-evenly;
  color: rgb(54, 54, 54);
}

.pro-txt {
  text-align: center;
  /* min-width: 55px; */
  font-size: 10px;
}
.header-txt {
  text-align: center;
  /* min-width: 55px; */
}

.outer-delnumber-total-div {
  height: 70px;
  /* background-color: #f2c874; */
}

.delnumber-deltotal-div {
  font-family: "ABeeZee";
  font-size: 15px;
  text-align: center;
  height: 50px;
  width: 50px;
  border: 0.5px solid rgb(212, 212, 212);
  border-radius: 50%;
  /* color: rgb(54, 54, 54); */
  color: white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.del-number-div {
  background-color: rgb(225, 60, 60);
}
.del-total-amount-div {
  margin-left: 40px;
  background-color: #31b731;
}
/* ---------------------------left nav---------------------------------------------- */
/* --------------------------------leftnav----------------------------------------- */
/* ---------------------------------------leftnav---------------------------------- */
.search-input-div {
  flex: 1;

  /* width: 300px; */

  display: flex;
  justify-content: center;
  align-items: center;

  height: 45px;

  border: 0.5px solid white;
  border-radius: 25px;
  background-image: var(--gradient-primary-input);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /* opacity: 0.8; */
}

.search-input-element {
  flex: 1;

  height: 32px;
  width: 100px;
  font-size: 15px;
  margin-left: 10px;
  border: none;
  border-radius: 15px;
  color: rgb(54, 54, 54);
  font-weight: bold;
  background-image: var(--gradient-primary-input);
}

input:focus,
inpit.form.control.focus {
  outline: none !important;
  box-shadow: none;
  -moz-box-shadow: none;
  -webkit-box-shadow: none;
}

.search-input-element::placeholder {
  font-size: 15px;
  color: rgb(54, 54, 54);
  /* font-weight: bold; */
}

.search-icon {
  height: 25px;
  margin-right: 10px;
  cursor: pointer;
}

.right-div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-div {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 45px;
  width: 45px;

  border: 0.5px solid white;
  border-radius: 22.5px;
  /* margin-left: 20px; */

  background-image: var(--gradient-primary-cart);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);

  cursor: pointer;
}

.cart-div:hover {
  margin-bottom: 5px;
  width: 47px;
  height: 47px;
  border-radius: 23.5px;
}

.carted-div {
  border: 0.5px solid rgba(0, 0, 0, 0.2);
  background-image: var(--gradient-primary-carted);
}

.cart-icon {
  height: 39px;
  cursor: pointer;
}

.count-div {
  position: absolute;
  top: -7px;
  right: -1px;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 20px;
  width: 20px;

  border: none;
  border-radius: 10px;
  background-color: rgb(236, 12, 12);
  color: white;
}

.count {
  font-size: 15px;
}

/* ----------------------SECTION1----------------------------- */
/* ----------------------SECTION1----------------------------- */
/* ----------------------SECTION1----------------------------- */

.header--1 {
  /* position: relative; */
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100vh;
  background-color: #39b385;
  /* background-color: #8074ec; */
}

.left-div-header {
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.titles-div {
  /* display: grid;
  flex: 1;
  grid-template-columns: 3fr;

  row-gap: 5px;
  column-gap: 5px;

  align-content: center; */
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.contact-us {
  position: absolute;
  bottom: 5px;
  left: 5px;
  display: flex;
  height: 70px;
  align-items: center;
  width: inherit;
}

.socials-contacts {
  margin-left: 10px;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: solid 0.5px white;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
}

.socials-contacts:hover {
  transform: translateY(-3px);
}

.adds-div {
  flex: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  transform: translateX(0rem);
  /* font-size: 3.5rem; */
  /* line-height: 1.35; */
}

h4 {
  /* transform: translateX(5rem); */
  color: #39b385;
}

.welcome-img {
  height: 350px;
}

.span-welcome-company {
  width: 80%;
  font-size: 50px;
  font-family: "Tilt Warp";
  text-shadow: 0px 0px 5px #000000;
  color: white;
}
.span-company {
  display: flex;
  justify-content: end;
}

.highlight {
  position: relative;
  font-size: 60px;
  font-family: "Tilt Warp";
  color: rgb(255, 255, 255);
}

.highlight::after {
  display: block;
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  opacity: 0.8;
  transform: scale(1.07, 1.05) skewX(-15deg);
  background-image: var(--gradient-primary-txt);
}

/* body {
    background-color: red;
    background-color: rgb(190, 190, 190);
} */
/* ---------------------------MOBILE SIZE---------------------------- */
/* ---------------------------MOBILE SIZE---------------------------- */
/* ---------------------------MOBILE SIZE---------------------------- */
@media (min-width: 660px) and (max-width: 1200px) {
  .span-welcome-company {
    font-size: 30px;
  }
  .highlight {
    font-size: 40px;
  }
  .welcome-img {
    height: 250px;
  }
}

@media (max-width: 660px) {
  .header--1 {
    flex-direction: column;
  }
  .span-welcome-company {
    font-size: 30px;
  }
  .highlight {
    font-size: 40px;
  }
  .welcome-img {
    height: 250px;
  }
  .titles-div {
    align-content: end;
  }
  .adds-div {
    align-items: start;
  }
  .contact-us {
    height: 50px;
  }
  .socials-contacts {
    margin-left: 6px;
    height: 35px;
    width: 35px;
  }
}
@media (max-width: 1000px) {
  .delnumber-deltotal-div {
    font-family: "ABeeZee";
    font-size: 12px;
    height: 35px;
    width: 35px;
  }
}
@media (max-width: 480px) {
  .dcart-view-innercontainer {
    left: 1px;
    margin: 0 0px 0 10px;
  }
}
</style>