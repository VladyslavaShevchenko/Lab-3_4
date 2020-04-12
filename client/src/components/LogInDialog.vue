<template>
  <v-dialog v-model="opened" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">Log In</v-card-title>
      <v-card-text>
        <v-tabs fixed-tabs v-model="tabs">
          <v-tab href="#tab-1">Log In</v-tab>
          <v-tab href="#tab-2">Sign Up</v-tab>
        </v-tabs>
        <v-tabs-items style="margin-top:5px" v-model="tabs">
          <v-tab-item value="tab-1">
            <v-text-field color="blue darken-2" label="Login" outlined clearable v-model="login"></v-text-field>
            <v-text-field
              color="blue darken-2"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              outlined
              v-model="password"
            ></v-text-field>
          </v-tab-item>
          <v-tab-item value="tab-2">
            <v-text-field color="blue darken-2" label="Login" outlined clearable v-model="login"></v-text-field>
            <v-text-field
              color="blue darken-2"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              outlined
              v-model="password"
            ></v-text-field>
            <v-text-field
              color="blue darken-2"
              label="Confirm Password"
              outlined
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              v-model="confirmPassword"
            ></v-text-field>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="handleCloseDialog()">Close</v-btn>
        <v-btn color="green darken-1" text @click="handleSubmit()">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["opened"],
  methods: {
    handleSubmit: function() {
      if (this.tabs === "tab-1") {
        this.$store
          .dispatch("signIn", { login: this.login, password: this.password })
          .then(() => this.$emit("close"))
          .catch(() => alert("wrong login and/or password"));
      } else {
        if (this.password === this.confirmPassword) {
          this.$store
            .dispatch("signUp", { login: this.login, password: this.password })
            .then(() => this.$emit("close"))
            .catch(() => alert("User already exist"));
        } else {
          alert("Passwords are different");
        }
      }
    },
    handleCloseDialog: function() {
      this.$emit("close");
    }
  },
  data() {
    return {
      tabs: "tab-1",
      login: "",
      password: "",
      confirmPassword: "",
      showPassword: false
    };
  }
};
</script>

<style>
</style>