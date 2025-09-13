<template>
  <v-row class="account-item mb-3 align-center">
    <v-col cols="3">
      <v-text-field label="Метки" :model-value="account.tags.map(t => t.text).join('; ')" />
    </v-col>
    <v-col cols="2">
      <v-select label="Тип записи" :items="ACCOUNT_TYPE_OPTIONS" :model-value="account.type" />
    </v-col>
    <v-col cols="3">
      <v-text-field label="Логин" :model-value="account.login" />
    </v-col>
    <v-col cols="3">
      <v-text-field label="Пароль" :model-value="account.password" />
    </v-col>
    <v-col cols="1">
      <v-btn @click="accountStore.deleteAccount(account.id)" icon="mdi-delete" variant="text" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/useAccountStore'
import type { Account } from '../types/account'
import { ACCOUNT_TYPE_OPTIONS } from '../types/account'

defineProps<{
  account: Account
}>()

const accountStore = useAccountStore()
</script>

<style scoped>
.account-item { padding: 8px; }
</style>