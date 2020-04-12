<template>
  <div style="height:100%;width:100%">
    <v-tabs v-model="tabs" fixed-tabs>
      <v-tab href="#tab-1">Owned</v-tab>
      <v-tab href="#tab-2">Liked</v-tab>
    </v-tabs>
    <Recipes :filter="filter"></Recipes>
  </div>
</template>
<script>
import Recipes from "./Recipes.vue";
export default {
  computed: {
    login: function() {
      return this.$store.getters.login;
    },
    liked: function() {
      return this.$store.getters.liked;
    },
    authorized:function(){
        return this.$store.getters.authorized;
    }
  },
  watch: {
    tabs() {
      if (this.tabs === "tab-1") {
        this.filter = recipes =>
          recipes.filter(recipe => {console.log(this.login);return recipe.author === this.login});
      } else {
        this.filter = recipes =>
          recipes.filter(recipe => this.liked.includes(recipe._id));
      }
    }
  },
  components: {
    Recipes
  },
  data() {
    return {
      tabs: "tab-1",
      filter: recipes =>
        recipes.filter(recipe => {console.log(this.login);return recipe.author === this.login})
    };
  },
  beforeMount(){
      if(!this.authorized){
          this.$router.go(-1);
      }
  }
};
</script>