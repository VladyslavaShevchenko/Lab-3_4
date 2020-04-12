<template>
<v-card flat style="display:flex;justify-content:center;">
    <v-form ref="form" style="max-width:600px" @submit.prevent="submit">
    <v-container fluid>
        <v-row>
        <v-col cols="12" sm="6">
            <v-text-field
            v-model="name"
            color="blue darken-2"
            label="Name"
            outlined
            clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
            <v-text-field
            v-model="shortDesc"
            color="blue darken-2"
            label="Short descritpion"
            outlined
            clearable
            ></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-textarea
            style="resize: none;"
            v-model="longDesc"
            color="blue darken-2"
            >
            <template v-slot:label>
                <div>
                Long descritpion
                </div>
            </template>
            </v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
            <v-select
            v-model="category"
            :items="categories"
            color="blue darken-2"
            label="category"
            outlined
            ></v-select>
        </v-col>
        </v-row>
    </v-container>
    <v-card-actions>
        <v-btn text @click="handleCancel">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn 
        color="primary"
        @click="handleSubmit"
        >Create</v-btn>
    </v-card-actions>
    </v-form>
</v-card>
</template>
<script>
export default {
    computed:{
        categories(){
            return this.$store.getters.categories;
        }
    },
    methods:{
        handleCancel:function(){
            this.$router.go(-1);
        },
        handleSubmit:function(){
            this.$store.dispatch('addRecipe',{name:this.name,category:this.category,shortDesc:this.shortDesc,longDesc:this.longDesc});
            this.$router.go(-1);
        }
    },
    data(){
        return{
            name:"",
            category:"",
            shortDesc:"",
            longDesc:""
        }
    }
}
</script>