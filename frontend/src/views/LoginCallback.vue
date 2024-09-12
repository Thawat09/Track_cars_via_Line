<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <p v-else>Logging in...</p>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "LoginCallback",
  data() {
    return {
      error: null,
    };
  },
  created() {
    this.handleLoginCallback();
  },
  methods: {
    async handleLoginCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (state !== sessionStorage.getItem("oauth_state")) {
        this.error = "State mismatch";
        return;
      }

      try {
        // ส่ง code ไปยัง backend
        const response = await axios.post(
          "http://localhost:3000/api/v1/test/test",
          { code, state }, // ส่งข้อมูล code และ state ในรูปแบบ JSON
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = response.data;
        console.log(data);

        if (data.token) {
          // เก็บ token ใน localStorage
          localStorage.setItem("jwt_token", data.token);
          this.$router.push("/about"); // เปลี่ยนเส้นทางไปยังหน้า profile
        } else {
          this.error = "Login failed";
        }
      } catch (err) {
        this.error = "An error occurred: " + err.message;
      }
    },
  },
};
</script>