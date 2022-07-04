<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="userInfo.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="userInfo.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="userInfo.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="userInfo.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="userInfo.password"
                />
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;
import { updateUser } from "@/api/user";

export default {
  name: "settings",
  middleware: "authenticated",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    const { ...user } = this.user;
    this.userInfo = user;
  },
  methods: {
    ...mapMutations(["setUser"]),
    logout() {
      Cookie.remove("user");
      this.setUser({});
      this.$router.push("/");
    },
    async onSubmit() {
      const { data } = await updateUser({ user: this.userInfo });
      this.setUser(data.user);
      this.$router.push({
        path: "/profile",
        query: { username: this.userInfo.username },
      });
    },
  },
};
</script>

<style>
</style>