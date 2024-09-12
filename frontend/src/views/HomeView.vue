<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="loginWithLine">Login with Line</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  methods: {
    // สร้างฟังก์ชันเพื่อสร้างข้อความสุ่ม
    generateState() {
      return Math.random().toString(36).substring(2, 15);
    },

    loginWithLine() {
      const clientId = "2006308257"; // เปลี่ยนเป็น Channel ID ของคุณ
      const redirectUri = encodeURIComponent(
        "https://117f-183-88-236-137.ngrok-free.app/callback"
      ); // URL สำหรับ callback
      const state = this.generateState(); // สร้างข้อความสุ่ม
      sessionStorage.setItem("oauth_state", state);

      const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=profile%20openid`;

      window.location.href = url;
    },
  },
};
</script>