<template>
  <v-container fluid class="account-form">
        <v-row align="center" class="mb-4">
      <v-col>
        <div class="d-flex align-center">
          <h1 class="text-h5 mr-3">Учетные записи</h1>
          <v-btn
            @click="accountStore.addAccount"
            icon="mdi-plus"
            size="small"
            variant="outlined"
            :style="{
                borderRadius: '8px',
                aspectRatio: '1',
              minWidth: '0'
            }"
          />
        </div>
      </v-col>
    </v-row>
    <v-alert 
      type="info" 
      variant="tonal" 
      density="compact" 
      class="mb-4"
    >
      Для указания нескольких меток используйте разделитель <strong>;</strong>
    </v-alert>

    <v-row v-if="accountStore.accounts.length > 0" class="d-none d-md-flex mb-2">
      <v-col cols="3" class="text-caption text-grey-darken-1">Метки</v-col>
      <v-col cols="2" class="text-caption text-grey-darken-1">Тип записи</v-col>
      <v-col cols="3" class="text-caption text-grey-darken-1">Логин</v-col>
      <v-col cols="3" class="text-caption text-grey-darken-1">Пароль</v-col>
      <v-col cols="1"></v-col>
    </v-row>

    <div v-if="accountStore.accounts.length === 0" class="text-center py-8">
      <v-icon size="48" color="grey-lighten-2">mdi-account-plus</v-icon>
      <p class="text-grey mt-2">Нажмите кнопку "+" чтобы добавить первую запись</p>
    </div>

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

<style scoped>
.account-form {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
}
</style>