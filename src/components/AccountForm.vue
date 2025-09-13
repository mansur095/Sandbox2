<template>
  <v-container fluid>
    <h1 class="text-h5 mr-3">Учетные записи</h1>
    <v-btn @click="accountStore.addAccount" icon="mdi-plus" size="small" />

    <AccountItem
      v-for="account in accountStore.accounts"
      :key="account.id"
      :account="account"
    />
  </v-container>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/useAccountStore'
import AccountItem from './AccountItem.vue'

const accountStore = useAccountStore()
</script>