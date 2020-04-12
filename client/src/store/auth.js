import Vue from "vue";

export const auth = {
    state: { login: "", password: "", authorized: false, liked: [] },
    mutations: {
        LOGIN(state, { login, password }) {
            console.log("authorized");
            Vue.set(state, "login", login);
            Vue.set(state, "password", password);
            Vue.set(state, "authorized", true);
        },
        FETCH_LIKED(state, liked) {
            Vue.set(state, "liked", liked);
        },
        SET_LIKE(state,likedId){
            if(state.liked.includes(likedId)){
                Vue.delete(state.liked,state.liked.indexOf(likedId));
            }else{
                state.liked.push(likedId);
            }
        }
    },
    actions: {
        signIn({ commit }, { login, password }) {
            return new Promise((res, rej) => {
                const xmlHttp = new XMLHttpRequest();
                xmlHttp.open("POST", process.env.VUE_APP_API_URL + "users", true);
                xmlHttp.setRequestHeader(
                    "Content-Type",
                    "application/json;charset=UTF-8"
                );
                xmlHttp.send(JSON.stringify({ login, password }));
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState !== 4) return;
                    if (xmlHttp.status === 200) {
                        commit("LOGIN", { login, password });
                        const user = JSON.parse(xmlHttp.responseText);
                        commit("FETCH_LIKED", user.liked)
                        res();
                    } else {
                        rej();
                    }
                };
            });

        },
        signUp({ commit }, { login, password }) {
            return new Promise((res, rej) => {
                const xmlHttp = new XMLHttpRequest();
                xmlHttp.open("PUT", process.env.VUE_APP_API_URL + "users", true);
                xmlHttp.setRequestHeader(
                    "Content-Type",
                    "application/json;charset=UTF-8"
                );
                xmlHttp.send(JSON.stringify({ login, password }));
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState !== 4) return;
                    if (xmlHttp.status === 200) {
                        commit("LOGIN", { login, password });
                        res();
                    } else {
                        rej();
                    }
                };
            });
        },
        setLike({commit,getters},recipeId){
            return new Promise((res, rej) => {
                const xmlHttp = new XMLHttpRequest();
                xmlHttp.open("PUT", process.env.VUE_APP_API_URL + "users/liked", true);
                xmlHttp.setRequestHeader(
                    "Content-Type",
                    "application/json;charset=UTF-8"
                );
                xmlHttp.send(JSON.stringify({ login:getters.login, password:getters.password,recipeId }));
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState !== 4) return;
                    if (xmlHttp.status === 200) {
                        commit("SET_LIKE", recipeId);
                        res();
                    } else {
                        rej();
                    }
                };
            });
        }
    },
    getters: {
        authorized: state => state.authorized,
        login: state => state.login,
        password:state=>state.password,
        liked:state=>state.liked
    }
}