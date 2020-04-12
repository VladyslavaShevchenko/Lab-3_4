import Vue from "vue";
import Vuex from "vuex";
import { Filters } from "./filters.js";
import { auth } from "./auth.js"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth
    },
    state: {
        recipes: [],
        filters: {},
        categories: ["desserts", "soups", "meat", "salads"],
        recipeToEditId: 0,
    },
    mutations: {
        FETCH_RECIPES(state, recipes) {
            Vue.set(state, "recipes", recipes);
        },
        ADD_RECIPE(state, recipe) {
            recipe.id = state.recipes.length;
            state.recipes.push(recipe);
        },
        EDIT_RECIPE(state, [recipeId, recipe]) {
            state.recipes[recipeId] = recipe;
        },
        REMOVE_RECIPE(state, recipeNum) {
            state.recipes.splice(recipeNum, 1);
        },
        SET_RECIPE_TO_EDIT_ID(state, recipeId) {
            state.recipeToEditId = recipeId;
        },
        ADD_FILTER(state, { name, param }) {
            Vue.set(state.filters, name, param);
            localStorage.setItem("filters", JSON.stringify(state.filters));
        },
        REMOVE_FILTER(state, name) {
            Vue.delete(state.filters, name);
            localStorage.setItem("filters", JSON.stringify(state.filters));
        },

    },
    actions: {
        fetchRecipes({ commit }) {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", process.env.VUE_APP_API_URL + "recipes", true);
            xmlHttp.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState !== 4) return;
                if (xmlHttp.status === 200) {
                    const response = JSON.parse(xmlHttp.responseText);
                    commit("FETCH_RECIPES", response);
                    console.log(response);
                } else {
                    alert("Internal server error")
                }
            };
        },
        addRecipe({ commit,getters }, recipe) {
            recipe.author = getters.login;
            recipe.createDate = Date.now();
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", process.env.VUE_APP_API_URL + "recipes/", true);
            xmlHttp.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );
            xmlHttp.send(JSON.stringify({login:getters.login,password:getters.password,recipe}));
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState !== 4) return;
                if (xmlHttp.status === 200) {
                    alert("Success");
                    commit("ADD_RECIPE", recipe)
                } else {
                    alert("Internal server error")
                }
            };
        },
        editRecipe({ commit,getters }, [recipeNum,recipeId, newRecipe]) {
            console.log(recipeId);
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("PATCH", process.env.VUE_APP_API_URL + "recipes/"+recipeId, true);
            xmlHttp.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );
            xmlHttp.send(JSON.stringify({login:getters.login,password:getters.password,recipe:newRecipe}));
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState !== 4) return;
                if (xmlHttp.status === 200) {
                    alert("Success");
                    commit("EDIT_RECIPE", [recipeNum, newRecipe]);
                } else {
                    alert("Internal server error")
                }
            };
        },
        removeRecipe({ commit,getters }, {recipeNum,recipeId}) {
            const xmlHttp = new XMLHttpRequest();
            xmlHttp.open("DELETE", process.env.VUE_APP_API_URL + "recipes/"+recipeId, true);
            xmlHttp.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );
            xmlHttp.send(JSON.stringify({login:getters.login,password:getters.password}));
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState !== 4) return;
                if (xmlHttp.status === 200) {
                    commit("REMOVE_RECIPE", recipeNum);
                } else {
                    alert("Internal server error")
                }
            };
        },
        setRecipeToEditId({ commit }, recipeId) {
            commit("SET_RECIPE_TO_EDIT_ID", recipeId);
        },
        addFilter({ commit }, { name, param }) {
            commit("ADD_FILTER", { name, param });
        },
        removeFilter({ commit }, name) {
            commit("REMOVE_FILTER", name);
        },

    },
    getters: {
        filters: state => {
            if (
                Object.keys(state.filters).length === 0 &&
                localStorage.getItem("filters") != null
            ) {
                return JSON.parse(localStorage.getItem("filters"));
            } else {
                return state.filters;
            }
        },
        recipes: (state, getters) => {
            let res = state.recipes;
            Object.entries(getters.filters).forEach(([name, param]) => {
                console.log(name);
                res = Filters[name](res, param);
            });
            return res;
        },
        recipe: state => id => state.recipes[id],
        categories: state => state.categories,
        recipeToEditId: state => state.recipeToEditId,
    },
});
