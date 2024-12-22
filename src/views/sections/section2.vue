<template>
  <section class="section--2">
    <div class="outer-div">
      <div class="display-products-div">
        <div
          class="display-product-div"
          v-for="pro in this.products"
          :key="pro.name"
          @mouseenter="this.showAddToCartFun"
          @mouseleave="this.showAddToCartFun"
          @click="this.showAddToCartFun"
          :id="pro.id"
        >
          <div
            :class="
              pro.carted
                ? 'add-to-cart-div-sec2 added-to-cart-div-sec2'
                : 'add-to-cart-div-sec2 add-hidden'
            "
            :id="pro.id"
          >
            <img
              class="add-to-cart-img-sec2"
              src="../../icons/cart-icon.png"
              alt=""
            />
            <span class="add-to-cart-span-sec2">{{
              pro.carted ? "CARTED" : "ADD TO CART"
            }}</span>
            <!-- <span class="add-to-cart-span-sec2">CARTED</span> -->
          </div>
          <img
            class="product-img"
            :src="`https://serverprojectmarketing.netlify.app/uploads/market/${pro.img}`"
            alt="adds"
          />
          <div class="add-info-sec2">
            <span class="pro-name-sec2">{{ pro.name }}</span>
            <div class="pro-price-div">
              <span class="pro-price-sec2">${{ pro.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getProducts } from "../../composables/modal.js";

export default {
  data() {
    return {
      showAddToCart: false,
      products: [
        // {
        //   id: "164512ssldfsf",
        //   name: "nuttela",
        //   price: 30,
        //   dicprice: 25,
        //   img: "whatsapp-icon.png",
        //   amount: 1,
        //   carted: false,
        // },
      ],
    };
  },
  methods: {
    showAddToCartFun(e) {
      if (e.type === "click") {
        if (this.products.find((pro) => pro.id === e.currentTarget.id).carted) {
          // console.log("here");
          this.$emit("showCart");
        } else {
          this.products.find(
            (pro) => pro.id === e.currentTarget.id
          ).carted = true;
          this.$emit(
            "pushToCart",
            this.products.find((pro) => pro.id === e.currentTarget.id)
          );
        }
      } else {
        if (e.currentTarget.firstChild.id === e.currentTarget.id)
          if (this.products.find((pro) => pro.id === e.currentTarget.id).carted)
            return;
          else e.target.firstChild.classList.toggle("add-hidden");
      }
    },
    async setProducts() {
      this.products = await getProducts();
    },
    // showAddToCartFun2() {
    //   if (e.type === "click") {
    //     console.log("click");
    //   } else {
    //     if (e.target.firstChild.id === e.target.id)
    //       e.target.firstChild.classList.toggle("add-hidden");
    //   }
    // },
  },
  mounted() {
    this.setProducts();
  },
};
</script>

<style scoped>
.outer-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background-color: rgb(112, 112, 216); */
}

.display-products-div {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  width: inherit;
  max-height: 100%;

  margin: 5px;
  border: 1px solid rgb(202, 202, 202);
  border-radius: 15px;

  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  /* background-color: rgb(232, 87, 87); */
}

.display-product-div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100px;
  height: 120px;
  border-radius: 15px;
  box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.2),
    1px 1px 3px 2px rgba(0, 0, 0, 0.19);
  cursor: pointer;
  margin: 10px;
  padding: 10px;
}
.display-product-div:hover {
  /* background-color: rgb(244, 240, 240); */
  background-color: rgb(172, 172, 172);
}
.product-img {
  border-radius: 10px;
  height: 60px;
}

.add-info-sec2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 0px;
}

.pro-name-sec2 {
  font-family: "Tilt Warp";
  font-size: 16px;
  margin-bottom: 5px;
}
.pro-price-div {
  color: white;
  border-radius: 15px;
  padding: 2px 5px 2px 5px;
  background-color: #31b731;
}
.pro-price-sec2 {
  font-size: 15px;
  font-weight: bold;
  /* text-decoration: line-through; */
  /* color: rgb(53, 50, 50); */
}

.add-to-cart-div-sec2 {
  display: flex;
  justify-content: center;
  height: 25px;
  padding: 0px 6px 0px 6px;
  margin: 0px 0px 2px 0px;
  align-items: center;
  border: none;
  border-radius: 15px;
  background-color: rgb(248, 69, 69);
  color: white;
  cursor: pointer;
}
.added-to-cart-div-sec2 {
  background-color: #31b731;
}
.add-to-cart-span-sec2 {
  margin-left: 5px;
  font-size: 10px;
  font-family: "Tilt Warp";
}

.add-to-cart-img-sec2 {
  height: 15px;
}

.add-hidden {
  opacity: 0;
}
@media (max-width: 460px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 460px) and (max-width: 690px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 690px) and (max-width: 849px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
}
@media (min-width: 850px) and (max-width: 999px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}

@media (min-width: 1000px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
</style>