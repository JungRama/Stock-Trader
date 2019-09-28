<template>
  <div>
    <userCard></userCard>
    <v-row>
      <v-col>
        <infoCard><b>Click Save & Load</b><br> To save your previous data</infoCard>
      </v-col>
      <v-col>
        <infoCard><b>Click End Day</b><br> To end the day and refresh stock market</infoCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const userCard = () => import('@/components/home/userCard')
const infoCard = () => import('@/components/home/InfoCard')
export default {
  metaInfo: {
    title: 'Stock Trader',
    titleTemplate: 'Home | %s'
  },
  components:{
    userCard,
    infoCard
  }
};
</script>
