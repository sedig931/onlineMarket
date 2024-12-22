<template>
  <section class="section--1">
    <div class="adds-view">
      <div
        v-for="(pro, i) in this.products"
        :key="pro.name"
        :id="i"
        @mouseenter="this.pauseAdd"
        @mouseleave="this.pauseAdd"
        :class="i === 2 ? 'outer-foucesed-add' : 'outer-add-div '"
      >
        <div :class="i === 2 ? 'img-container-div-focused' : ''">
          <img
            :class="i === 2 ? 'add-focus-img' : ''"
            class="one-add-img"
            :src="`https://serverprojectmarketing.netlify.app/uploads/market/${pro.img}`"
            alt="adds"
          />
        </div>
        <!-- :src="'http://localhost:301/uploads/' + pro.img" -->
        <div class="add-info" v-show="i === 2">
          <span class="pro-name">{{ pro.name }}</span>
          <div class="price-div">
            <span class="pro-price">${{ pro.price }}</span>
            <span class="price-discount">${{ pro.dicprice }}</span>
          </div>
        </div>

        <div class="arrow-div" v-show="this.showArrows">
          <img
            @click="this.prevProduct"
            class="left-right-arrow"
            src="../../icons/leftarrow.png"
            alt=""
            v-show="i === 2"
          />

          <div
            :id="pro.id"
            @click="this.addtocart"
            v-show="i === 2"
            :class="pro.carted ? 'added-to-cart-div' : 'add-to-cart-div'"
          >
            <img
              class="add-to-cart-img"
              src="../../icons/cart-icon.png"
              alt=""
            />
            <span class="add-to-cart-span">{{
              pro.carted ? "ADDED" : "ADD TO CART"
            }}</span>
          </div>
          <img
            class="left-right-arrow"
            src="../../icons/rightarrow-icon.png"
            alt=""
            v-show="i === 2"
            @click="this.nextProduct"
          />
        </div>
      </div>
    </div>
    <button @click="this.scrollto" class="see-all-btn">
      See All &DownArrow;
    </button>
  </section>
</template>

<script>
// :src="require(`@/icons/${pro.img}`)"
export default {
  props: ["offers"],
  data() {
    return {
      showArrows: false,
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
      movie: null,
    };
  },
  methods: {
    getAdssMove() {
      const secttion1 = document.querySelector(".section--1");
      const startAdds = function (entries) {
        const [entry] = entries;
        if (entry.isIntersecting) {
          clearInterval(this.movie);
          this.movie = setInterval(() => {
            let firs = this.products[0];
            this.products.forEach((num, i) => {
              if (i !== this.products.length - 1) {
                this.products[i] = this.products[i + 1];
              } else this.products[i] = firs;
            });
          }, 1000);
        } else clearInterval(this.movie);
      };
      const addsObserver = new IntersectionObserver(startAdds.bind(this), {
        root: null,
        threshold: 0,
        rootMargin: `-${50}px`,
      });
      addsObserver.observe(secttion1);
    },
    pauseAdd(e) {
      if (e.target.classList.contains("outer-foucesed-add")) {
        if (e.type === "mouseenter") {
          this.showArrows = true;
          document
            .querySelectorAll(".arrow-div")
            .forEach((el) => el.classList.remove("hidden"));
          clearInterval(this.movie);
        } else if (e.type === "mouseleave") {
          this.showArrows = false;
          document
            .querySelectorAll(".arrow-div")
            .forEach((el) => el.classList.add("hidden"));
          clearInterval(this.movie);
          this.getAdssMove();
        }
      }
    },
    nextProduct() {
      const first = this.products[0];
      for (let i = 0; i < this.products.length; i++) {
        if (i + 1 === this.products.length) this.products[i] = first;
        else this.products[i] = this.products[i + 1];
      }
    },
    prevProduct() {
      const last = this.products[this.products.length - 1];
      for (let i = this.products.length - 1; i >= 0; i--) {
        if (i === 0) this.products[i] = last;
        else this.products[i] = this.products[i - 1];
      }
    },
    addtocart(e) {
      if (e.currentTarget.classList.contains("add-to-cart-div")) {
        this.products.find(
          (pro) => pro.id === e.currentTarget.id
        ).carted = true;
        this.$emit(
          "pushToCart",
          this.products.find((pro) => pro.id === e.currentTarget.id)
        );
      } else {
        this.$emit("showCart");
      }
    },
    scrollto() {
      document
        .querySelector(".section--3")
        .scrollIntoView({ behavior: "smooth" });
    },
    async setOffersProducts() {
      this.products = this.offers;
    },
  },
  mounted() {
    this.getAdssMove();
    this.setOffersProducts();
  },
};
</script>

<style>
.hidden {
  opacity: 0;
  /* display: none; */
}
.section--1 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.adds-view {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.outer-add-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 80px;
  margin: 5px;
}

.outer-foucesed-add {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 300px;

  border: 1px solid white;
  border-radius: 15px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2),
    0px 0px 5px 3px rgba(3, 3, 3, 0.4);
  /* box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  margin: 0 10px 0 10px;
  padding: 10px;
}
.outer-foucesed-add:hover {
  width: 350px;
  height: 350px;
}

.one-add-img {
  height: 60px;
  border-radius: 15px;
}

.add-focus-img {
  height: 200px;
  max-width: 300px;
}
.img-container-div-focused {
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 60; */
  width: 100%;
}

.add-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.pro-name {
  font-family: "Tilt Warp";
  font-size: 20px;
}

.price-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.pro-price {
  padding: 3px 6px 3px 6px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: 1.5px line-through rgb(0, 0, 0);
  background-color: rgb(225, 60, 60);
  border-radius: 15px 0px 0px 15px;
  min-width: 60px;
  color: white;
}
.price-discount {
  padding: 3px 6px 3px 6px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  min-width: 60px;
  border-radius: 0px 15px 15px 0px;
  background-color: #31b731;
  color: white;
}

.arrow-div {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: inherit;
  /* background-color: #31b731; */
}

.left-right-arrow {
  height: 30px;
  border-radius: 25px;
  margin: 0px;
  cursor: pointer;
}
.left-right-arrow:hover {
  background-color: rgb(230, 230, 230);
}

.add-to-cart-div {
  display: flex;
  justify-content: center;
  /* height: 25px; */
  min-width: 90px;
  padding: 6px 14px 6px 14px;
  align-items: center;
  border: none;
  border-radius: 15px;
  background-color: rgb(225, 60, 60);
  cursor: pointer;
  color: white;
}
.add-to-cart-div:hover {
  background-color: rgb(248, 69, 69);
}

.add-to-cart-img {
  height: 20px;
}

.add-to-cart-span {
  margin-left: 5px;
  font-size: 11px;
  font-family: "Tilt Warp";
}
.added-to-cart-div {
  display: flex;
  justify-content: center;
  /* height: 25px; */
  min-width: 90px;
  padding: 6px 14px 6px 14px;
  align-items: center;
  border: none;
  border-radius: 15px;
  background-color: #31b731;
  cursor: pointer;
  color: white;
}

.see-all-btn {
  border: none;
  background-color: white;
  color: #14b614;
  cursor: pointer;
}
/* ---------------------------MOBILE SIZE---------------------------- */
/* ---------------------------MOBILE SIZE---------------------------- */
/* ---------------------------MOBILE SIZE---------------------------- */

@media (max-width: 720px) {
  .outer-add-div {
    display: none;
  }
  .hidden {
    opacity: 1;
  }
}
@media (max-width: 400px) {
  .outer-foucesed-add {
    width: 100%;
  }
  .outer-foucesed-add:hover {
    width: 100%;
    height: 300px;
  }
  .add-focus-img {
    max-width: 250px;
  }
}
</style>