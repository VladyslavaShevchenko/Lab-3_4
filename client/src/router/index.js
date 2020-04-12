import VueRouter from "vue-router";
import Recipes from "../views/Recipes.vue";
import Recipe from "../views/Recipe.vue";
import Add from "../views/Add.vue";
import Edit from "../views/Edit.vue";
import Accaunt from "../views/Accaunt.vue";

const routes = [
  {
    path: "/recipes",
    name: "recipes",
    component: Recipes
  },
  {
    path: "/",
    name: "recipes",
    redirect: "/recipes"
  },
  {
    path: "/recipes/:id",
    props: true,
    name: "recipe",
    component: Recipe
  },
  {
    path: "/add",
    name: "add",
    component: Add
  },
  {
    path: "/edit",
    props: true,
    name: "edit",
    component: Edit
  },
  {
    path: "/accaunt",
    props: true,
    name: "accaunt",
    component: Accaunt
},
];
console.log(process.env.BASE_URL);
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
