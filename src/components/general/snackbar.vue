<template>
    <v-snackbar
        v-model="snackbar.status"
        :color="snackbar.color"
        :bottom="Boolean(true)"
        :right="Boolean(true)"
    >
        {{ snackbar.text }}
        <v-btn
        color="default"
        text
        @click="snackbar.status = false"
        >
        Close
        </v-btn>
    </v-snackbar>
</template>

<script>
export default {
    props:[
        'snackbar',
    ]
}
</script>

<style>

</style>