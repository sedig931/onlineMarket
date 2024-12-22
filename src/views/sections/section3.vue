<template>
  <section class="section--3">
    <div class="outer-div">
      <div class="discounts-div">
        <span class="d-span discounts">D</span>
        <span class="i-span discounts">I</span>
        <span class="s-span discounts">S</span>
        <span class="c-span discounts">C</span>
        <span class="o-span discounts">O</span>
        <span class="u-span discounts">U</span>
        <span class="n-span discounts">N</span>
        <span class="T-span discounts">T</span>
        <span class="s-span discounts">S</span>
      </div>
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

          <div class="add-info-sec3">
            <span class="pro-name-sec3">{{ pro.name }}</span>
            <div class="price-div-sec3">
              <span class="pro-price-sec3">${{ pro.price }}</span>
              <span class="price-discount-sec3">${{ pro.dicprice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["offers"],
  data() {
    return {
      showAddToCart: false,
      products: [
        // {
        //   id: "16aonsdfsf",
        //   name: "salsa",
        //   price: 10,
        //   dicprice: 5,
        //   img: "blackcart-icon.png",
        //   carted: false,
        //   amount: 1,
        // },
      ],
    };
  },
  methods: {
    showAddToCartFun(e) {
      if (e.type === "click") {
        if (this.products.find((pro) => pro.id === e.currentTarget.id).carted) {
          console.log("here");
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
      this.products = this.offers;
    },
  },
  mounted() {
    this.setProducts();
    const discounts = document.querySelectorAll(".discounts");
    const randomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);
    const randomColor = () =>
      `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
    const colorsfull = setInterval(() => {
      discounts.forEach((discount) => (discount.style.color = randomColor()));
    }, 100);
  },
};
</script>

<style scoped>
.discounts {
  font-size: 50px;
  font-family: "Audiowide";
  text-shadow: 2px 2px 2px #1e1e1e;
}
.outer-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* background-color: rgb(112, 112, 216); */
}

.display-products-div {
  display: grid;
  /* justify-content: center; */
  align-items: center;
  /* grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr 1fr;
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
  justify-content: center;
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
  background-color: rgb(172, 172, 172);
  /* background-color: rgb(244, 240, 240); */
}
.product-img {
  height: 60px;
  border-radius: 10px;
}
/* 
.add-info-sec2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 0px;
} */
.add-info-sec3 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 0px;
}

.pro-name-sec3 {
  font-family: "Tilt Warp";
  font-size: 16px;
  margin-bottom: 5px;
}

.price-div-sec3 {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.pro-price-sec3 {
  padding: 2px 4px 2px 4px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  text-decoration: 1.5px line-through rgb(0, 0, 0);
  background-color: rgb(225, 60, 60);
  border-radius: 15px 0px 0px 15px;
  min-width: 30px;
  color: white;
}
.price-discount-sec3 {
  padding: 2px 4px 2px 4px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  min-width: 30px;
  border-radius: 0px 15px 15px 0px;
  background-color: #31b731;
  color: white;
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
  .discounts {
    font-size: 40px;
  }
}
@media (min-width: 460px) and (max-width: 690px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 690px) and (max-width: 849px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media (min-width: 850px) and (max-width: 999px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (min-width: 1000px) {
  .display-products-div {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>