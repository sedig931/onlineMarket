<template>
  <section class="layout-div section--4">
    <div class="layout-div top-div">
      <span class="title-sec4">don't limit your enjoy !</span>
      <button class="getAcount-btn">Open free account now</button>
    </div>

    <div class="layout-div bottom-div">
      <div class="lbls-div" @click="this.showHideDetails">
        <span id="0" class="lbls-shifts lbls-active">About</span>
        <span id="1" class="lbls-shifts">Terms of Use</span>
        <span id="2" class="lbls-shifts">Privacy Policy</span>
        <span id="3" class="lbls-shifts">Contact Us</span>
      </div>
      <div class="lbls-contents-div">
        <div v-show="this.detailsSwitch[0]" class="acount-content">
          <p>
            Your about page summarizes your history, values, and mission — all
            in one place.<br />
            That’s a tall order for just a few paragraphs.<br />
            If you’re feeling stuck, turn to these about-page examples for
            inspiration
          </p>
        </div>
        <div v-show="this.detailsSwitch[1]" class="acount-content terms">
          <p>
            This website is operated by siddig.The use of our website is subject
            to the following terms and conditions of use,
            <br />
            as amended from time to time (the “Terms”). The Terms are to be read
            together by you with any terms, <br />conditions or disclaimers
            provided in the pages of our website. Please review the Terms
            carefully.
          </p>
        </div>
        <div v-show="this.detailsSwitch[2]" class="acount-content">
          <p>
            We are committed to maintaining the accuracy, confidentiality, and
            security of your personally identifiable information
            <br />
            As part of this commitment, our privacy policy governs our actions
            as they relate to the collection, use and disclosure of Personal
            Information
            <br />
          </p>
        </div>
        <div v-show="this.detailsSwitch[3]" class="acount-content">
          E-mail : <a class="link" href="sedig931@gmail.com">@sedig931</a>
        </div>
      </div>
      <!-- <span class="copy-right">copyright</span> -->
    </div>
    <footer class="copy-right">
      &copy; 2024Copyright by
      <a class="link" href="https://www.facebook.com/siddig.alhareith">siddig</a
      >.Don't claim as your own product.
    </footer>
  </section>
</template>

<script>
export default {
  data() {
    return {
      detailsSwitch: [true, false, false, false],
    };
  },
  methods: {
    showHideDetails(e) {
      if (e.target.classList.contains("lbls-div")) return;
      this.detailsSwitch = this.detailsSwitch.map((el) => (el = false));
      this.detailsSwitch[e.target.id] = true;

      document
        .querySelectorAll(".lbls-shifts")
        .forEach((el) => el.classList.remove("lbls-active"));

      e.target.classList.add("lbls-active");
    },
  },
};
</script>

<style scoped>
.section--4 {
  height: 100vh;
  background-image: var(--gradient-primary-back);
}

.layout-div {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.top-div {
  border-bottom: 1px solid white;
  width: 100%;
  height: 65vh;
}

.title-sec4 {
  display: block;
  font-size: 50px;
  color: white;
  font-family: "Ubuntu";
  text-align: center;
  /* background-color: blue; */
}

.getAcount-btn {
  border: none;
  font-size: 30px;
  font-family: "Ubuntu";
  padding: 5px 30px 5px 30px;
  border-radius: 20px;
  cursor: pointer;

  color: var(--gradient-primary-back);
}
.bottom-div {
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 5px;
  width: 100%;
  height: 35vh;
}

.lbls-div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.lbls-shifts {
  font-family: "Ubuntu";
  font-size: 15px;
  color: white;
  cursor: pointer;
  margin: 10px;
}

.lbls-active {
  color: #f8b61a;
  border-bottom: 1.5px solid;
  /* text-shadow: 0px 0px 5px #444141; */
}

.acount-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Ubuntu";
  font-size: 13px;
  color: rgb(190, 182, 182);
  height: 100px;
  margin: 10px;
}
a {
  color: rgb(190, 182, 182);
}
.copy-right {
  font-family: "AR One Sans";
  font-size: 10px;
  color: rgb(190, 182, 182);
  margin-bottom: 5px;
  text-align: center;
}
.link {
  /* font-size: 11px; */
  text-decoration: none;
}
.add-hidden {
  opacity: 0;
}

@media (min-width: 415px) and (max-width: 720px) {
  .title-sec4 {
    font-size: 40px;
  }
  .getAcount-btn {
    font-size: 25px;
  }
}
@media (max-width: 415px) {
  .title-sec4 {
    font-size: 32px;
  }
  .getAcount-btn {
    font-size: 20px;
  }
  .lbls-shifts {
    font-size: 13px;
  }
  .acount-content {
    font-size: 11.5px;
  }
  .copy-right {
    font-size: 9px;
  }
}
</style>

<style>
</style>