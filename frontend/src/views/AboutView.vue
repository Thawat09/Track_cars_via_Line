<template>
  <div class="about">
    <h1>This is an about page</h1>
    <!-- <h1>Profile</h1>
    <p v-if="profile">Hello, {{ profile.displayName }}</p>
    <p v-else>Loading...</p> -->
  </div>
</template>

<script>
export default {
  name: "AboutView",
  // data() {
  //   return {
  //     profile: null,
  //   };
  // },
  // created() {
  //   this.handleLoginResponse();
  // },
  // methods: {
  //   async handleLoginResponse() {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const code = urlParams.get('code');
  //     const state = urlParams.get('state');

  //     // ตรวจสอบ state กับค่าใน sessionStorage
  //     if (state !== sessionStorage.getItem("oauth_state")) {
  //       console.error("State mismatch");
  //       return;
  //     }

  //     // ดึง access_token จาก Line
  //     const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: new URLSearchParams({
  //         grant_type: 'authorization_code',
  //         code: code,
  //         redirect_uri: 'https://117f-183-88-236-137.ngrok-free.app/about',
  //         client_id: '2006308257',
  //         client_secret: 'c37fd3ced55af315d145e728fe7c85b6',
  //       }),
  //     });
  //     const tokenData = await tokenResponse.json();
  //     const accessToken = tokenData.access_token;

  //     // ดึงข้อมูลโปรไฟล์จาก Line
  //     const profileResponse = await fetch('https://api.line.me/v2/profile', {
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`,
  //       },
  //     });
  //     this.profile = await profileResponse.json();
  //   },
  // },
};
</script>