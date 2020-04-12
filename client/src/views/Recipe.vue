<template>
<v-container>
    <v-row dense>
        <v-col cols="12" >
        <v-card color="white">
            <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="display-3">{{recipe.name}}</v-card-title>
                <v-card-subtitle>{{new Date(recipe.createDate).toLocaleString()}}</v-card-subtitle>
                <v-card-text class="headline">
                    <div v-for="(text, index) in recipe.longDesc.split('\n')" :key="index">{{ text }}</div>
                </v-card-text>
            </div>    
            </div>
        </v-card>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
export default {
    props:['id'],
    computed:{
        recipe(){
            return this.$store.getters.recipe(this.id);
        }
    }
}
</script>