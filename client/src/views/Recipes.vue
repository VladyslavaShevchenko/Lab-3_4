<template>
  <v-container>
    <v-row dense>
      <v-col v-for="(item, i) in recipes" :key="i" :cols="gridSize">
        <v-card color="#26c6da" dark>
          <div>
            <v-skeleton-loader type="image" min-width="250" min-height="250px"></v-skeleton-loader>
            <div style="display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <v-card-title class="headline">
                  <div>{{item.name}}</div>
                </v-card-title>
                <v-card-subtitle>
                  <div class="subtitle-1">{{new Date(item.createDate).toLocaleString()}}</div>
                  <div class="subtitle-1">{{item.category}}</div>
                </v-card-subtitle>

                <v-card-text>{{item.shortDesc}}</v-card-text>
              </div>

              <v-card-actions style="justify-content:space-between;">
                <div>
                  <v-btn v-on:click="openRecipe(i)" text>Open</v-btn>
                  <v-btn v-if="login===item.author" @click="editRecipe(i)" text>Edit</v-btn>
                  <v-btn v-if="login===item.author" @click="deleteRecipe(i,item._id)" text>Delete</v-btn>
                </div>
                <v-btn v-if="authorized" @click="setLike(item._id)" text fab dark>
                  <v-icon v-if="liked.includes(item._id)">mdi-thumb-up</v-icon>
                  <v-icon v-else>mdi-thumb-up-outline</v-icon>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: ["filter"],
  computed: {
    recipes() {
      if (this.filter != null) {
        console.log(this.filter(this.$store.getters.recipes));
      }
      return this.filter != null
        ? this.filter(this.$store.getters.recipes)
        : this.$store.getters.recipes;
    },
    login() {
      return this.$store.getters.login;
    },
    gridSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "lg":
          return 4;
        default:
          return 12;
      }
    },
    liked() {
      return this.$store.getters.liked;
    },
    authorized() {
      return this.$store.getters.authorized;
    }
  },
  methods: {
    openRecipe: function(recipeId) {
      this.$router.push({ path: `/recipes/${recipeId}` });
    },
    editRecipe: function(recipeId) {
      this.$store.dispatch("setRecipeToEditId", recipeId);
      this.$router.push({ path: "/edit" });
    },
    deleteRecipe: function(recipeNum, recipeId) {
      this.$store.dispatch("removeRecipe", { recipeNum, recipeId });
    },
    setLike: function(recipeId) {
      this.$store.dispatch("setLike", recipeId);
    }
  }
};
</script>
<style>
.v-skeleton-loader__image {
  height: 250px !important;
}
.v-card__text {
  min-height: 146px;
}
.v-card__title {
  min-height: 64px;
}
.subtitle-1 {
  min-height: 28px;
}
</style>