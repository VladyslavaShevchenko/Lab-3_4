<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn v-if="authorized" @click="goToAccaunt()">
        <div class="title">{{isOnAccauntPage?"Back":"My Cookbook"}}</div>
      </v-btn>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchByName"
        @input="handleSearchInput"
        style="margin:auto 5px;"
        label="Search"
        outlined
        clearable
      ></v-text-field>
      <v-select
        style="margin:auto 5px;"
        v-model="filterByCategory"
        :items="categories"
        color="blue darken-2"
        label="category"
        outlined
      ></v-select>
      <v-select
        style="margin:auto 5px;"
        v-model="sortByDate"
        :items="['ascending','descending']"
        color="blue darken-2"
        label="date sort"
        outlined
      ></v-select>

      <v-btn target="_blank" v-if="authorized" v-on:click="add()" text>
        <span class="mr-2">New recipy</span>
        <v-icon>mdi-plus-box</v-icon>
      </v-btn>

      <v-btn @click="dialog=true" text fab dark>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>

      <LogInDialog :opened="dialog" @close="dialog=false"></LogInDialog>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import LogInDialog from "./components/LogInDialog.vue";
export default {
  name: "App",

  components: { LogInDialog },
  computed: {
    authorized() {
      return this.$store.getters.authorized;
    },
    categories() {
      return [...this.$store.getters.categories, "any"];
    },
  },
  methods: {
    add: function() {
      this.$router.push({ path: "/add" });
    },

    handleSearchInput: function() {
      this.$store.dispatch("addFilter", {
        name: "searchByName",
        param: this.searchByName
      });
    },
    goToAccaunt:function(){
        if(!this.isOnAccauntPage){
            this.isOnAccauntPage = true;
            this.$router.push({ path: "/accaunt" });
        }else{
            this.isOnAccauntPage = false;
            this.$router.push({path:"/recipes"})
        }
    }
  },

  data() {
    let obj = {
      searchByName: "",
      filterByCategory: "",
      sortByDate: "",
      dialog: false,
      isOnAccauntPage:false,
    };
    const filters = JSON.parse(localStorage.getItem("filters"));
    if (filters != null) {
      Object.entries(filters).forEach(([name, param]) => {
        obj[name] = param;
      });
    }
    return obj;
  },
  watch: {
    filterByCategory: function() {
      this.$store.dispatch("addFilter", {
        name: "filterByCategory",
        param: this.filterByCategory
      });
    },
    sortByDate: function() {
      this.$store.dispatch("addFilter", {
        name: "sortByDate",
        param: this.sortByDate === "descending"
      });
    },
    $route:function(to){
        if(to.path=="/accaunt"){
            this.isOnAccauntPage = true;
        }else{
            this.isOnAccauntPage = false;
        }
    }
  },
  beforeMount: function() {
    this.$store.dispatch("fetchRecipes");
  }
};
</script>

<style >
.v-messages {
  display: none;
}
.v-input__slot {
  margin-bottom: 0 !important;
}
.v-label {
  min-height: 20px;
}
</style>
