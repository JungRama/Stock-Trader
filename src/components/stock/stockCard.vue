<template>
    <v-card
        outlined
    >
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{stockdata.name}}</v-list-item-title>
                <v-list-item-subtitle>{{'Rp. '+ currency(stockdata.price) + '/stock'}}</v-list-item-subtitle>
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
        <v-btn block color="success" @click="buy" :disabled="formInput.quantity == null || formInput.quantity == 0">Buy</v-btn>
        </v-card-actions>
  </v-card>
</template>

<script>
import numeral from 'numeral'
export default {
    props:[
        'stockdata'
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
        buy(){
            var orderQuantity = this.formInput.quantity
            var myFunds = this.$store.getters.getFunds;
            var totalPrice = this.stockdata.price * orderQuantity
            if(orderQuantity != null || orderQuantity != 0){
                if(myFunds >= totalPrice){
                    const order = {
                        id : this.stockdata.id,
                        price : this.stockdata.price,
                        quantity : orderQuantity
                    }

                    this.$store.dispatch('buyPortfolio', order)
                    this.$emit('statusSnackbar', {
                        status: true,
                        text: 'Success Buy Portfolio',
                        color: 'success',
                    })
                }else{
                    this.$emit('statusSnackbar', {
                        status: true,
                        text: `You need Rp.${numeral(totalPrice - myFunds).format(0, 0)} to buy this stock`,
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