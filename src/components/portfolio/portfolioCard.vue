<template>
    <v-card
        outlined
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{portfolioData.name}}</v-list-item-title>
                <v-list-item-subtitle>Your Stock : {{portfolioData.quantity}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{'Rp. '+ currency(portfolioData.price) + '/stock'}}</v-list-item-subtitle>
                <v-text-field
                    class="mt-2"
                    v-model="formInput.quantity"
                    label="Quantity"
                    type="number"
                    required
                ></v-text-field>
            </v-list-item-content>
        </v-list-item>

        <v-card-actions>
        <v-btn @click="sell()" block color="error" :disabled="formInput.quantity == null || formInput.quantity == 0">Sell</v-btn>
        </v-card-actions>
  </v-card>
</template>

<script>
import numeral from 'numeral'
export default {
    props:[
        'portfolioData',
        'indexData'
    ],
    data(){
        return{
            formInput:{
                quantity: Number
            }
        }
    },
    methods:{
        currency(price){
            return numeral(price).format(0, 0);
        },
        sell(){
            let orderQuantity = this.formInput.quantity
            let portfolioQuantity = this.portfolioData.quantity
            
            if(orderQuantity != null || orderQuantity != 0){
                if(orderQuantity <= portfolioQuantity){
                    const order = {
                        index : this.indexData,
                        id : this.portfolioData.id,
                        price : this.portfolioData.price,
                        quantity : orderQuantity
                    }

                    this.$store.dispatch('sellPortfolio', order)
                    this.$emit('statusSnackbar', {
                        status: true,
                        text: 'Success Sell Portfolio',
                        color: 'success',
                    })
                }else{
                    this.$emit('statusSnackbar', {
                        status: true,
                        text: `Your portfolio quantity only ${portfolioQuantity}`,
                        color: 'error',
                    })
                }
            }
            this.formInput.quantity = Number
        }
    },
    mounted(){
        
    }
}
</script>

<style>

</style>