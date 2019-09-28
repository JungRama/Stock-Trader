<template>
  <section>
    <transition-group class="row" appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOutDown">
        <v-col 
          cols="12" md="6"
          v-for="stock in stocks" :key="stock.id">
          <stockCard 
            :stockdata="stock"
            @statusSnackbar="updateSnackbar($event)"
          ></stockCard>
        </v-col>
    </transition-group>
    <snackbar :snackbar="snackbar">
    </snackbar>
  </section>
</template>

<script>
const stockCard = () => import('@/components/stock/stockCard.vue')
const snackbar = () => import('@/components/general/snackbar.vue')
export default {
  metaInfo: {
    title: 'Stock Trader',
    titleTemplate: 'Stock | %s'
  },
  components:{
    stockCard,
    snackbar
  },
  data(){
    return{
      snackbar:{
        status: false,
        text: 'Some Snackbar Info',
        color: 'success',
      },
    }
  },
  methods:{
    updateSnackbar(event){
      this.snackbar = event
    }
  },
  computed:{
    stocks(){
      return this.$store.getters.getStocks
    },
    getFunds(){
        return this.$store.getters.getFunds
    }
  }, 
  created(){
    this.$store.dispatch('initStocks')
  }
};
</script>
