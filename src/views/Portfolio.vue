<template>
  <section>
    <v-container v-if="portfolios.length<=0">
      <v-row>
        <v-col cols="12" 
          :align="'center'"
          :justify="'center'"
          >
          <img width="50%" src="https://uploads-ssl.webflow.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg" alt="Zero Portfolio">
        </v-col>
        <v-col cols="12" 
          :align="'center'"
          :justify="'center'"
          >
          <h2>You not have any portfolio</h2>
          <v-btn color="primary" class="mt-2"
           @click="$router.push({name: 'stock'})" 
          >Buy Portfolio</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <transition-group class="row" appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOutDown">
      <v-col 
        cols="12" md="6"
        v-for="(portfolio, index) in portfolios" :key="portfolio.id">
          <portfolioCard 
          :portfolioData="portfolio"
          :indexData="index"
          @statusSnackbar="updateSnackbar($event)"
         ></portfolioCard>
      </v-col>
    </transition-group>
    <snackbar :snackbar="snackbar">
    </snackbar>
  </section>
</template>

<script>
const portfolioCard = () => import('@/components/portfolio/portfolioCard.vue')
const snackbar = () => import('@/components/general/snackbar.vue')
export default {
  metaInfo: {
    title: 'Stock Trader',
    titleTemplate: 'Portfolio | %s'
  },
  components:{
    portfolioCard,
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
    },
  },
  computed:{
    portfolios(){
      return this.$store.getters.stockPortfolio
    }
  }, 
};
</script>
