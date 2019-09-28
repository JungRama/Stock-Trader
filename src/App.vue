<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              @click="takeAction(child)"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else-if="item.routeName"
            :key="item.text"
            @click="takeAction(item)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Stock Trader</span>
      </v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="endDay()">
            <v-icon>restore</v-icon>
          </v-btn>
        </template>
        <span>End Day</span>
      </v-tooltip>
      <v-btn color="success">
        RP. {{getFunds}}
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container
      >
        <router-view></router-view>
      </v-container>
    </v-content>
    <snackbar :snackbar="snackbar">
    </snackbar>
  </v-app>
</template>

<style lang="scss" scoped>
.v-list-group__header{
  >.v-list-item{
    padding-left: 0px;
  }
}
#nprogress .bar {
  background: #fff;
}

#nprogress .spinner-icon {
  border-top-color: #fff;
  border-left-color: #fff;
}
</style>


<script>
  import numeral from 'numeral'
  const snackbar = () => import('@/components/general/snackbar.vue')
  export default {
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'home', text: 'Home', routeName: 'home'},
        { icon: 'ballot', text: 'My Portfolio', routeName: 'portfolio' },
        { icon: 'insert_chart', text: 'Stock', routeName: 'stock' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Save', action:'save' },
            { text: 'Load', action:'load'},
          ],
        },
      ],
      snackbar:{
        status: false,
        text: 'Some Snackbar Info',
        color: 'success',
      },
    }),
    components:{
      snackbar
    },
    computed:{
      getFunds(){
        return numeral(this.$store.getters.getFunds).format(0, 0);
      }
    },
    methods:{
      takeAction(item){
        if(item.routeName){
          this.$router.push({ name: item.routeName})
        }else{
          this[item.action]()
        }
      },
      save(){
        const dataToSave = {
          funds: this.$store.getters.getFunds,
          stockPortfolio: this.$store.getters.stockPortfolio,
          stocks: this.$store.getters.getStocks
        }
        localStorage.setItem('savedData', JSON.stringify(dataToSave))
        this.snackbar.status = true
        this.snackbar.text = 'Success Save Data'
      },
      load(){
        const data = JSON.parse(localStorage.getItem("savedData"))
        this.$store.dispatch('LoadData', data)
        this.snackbar.status = true
        this.snackbar.text = 'Success Loaded Previous Data'
      },
      endDay(){
        this.$store.dispatch('randomPrice')
        this.snackbar.status = true
        this.snackbar.text = 'Date Ended'
      }
    }
  }
</script>
