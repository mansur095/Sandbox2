<template>
  <v-row class="account-item mb-3">
    <v-col cols="12" md="3">
      <v-text-field 
        v-model="tagsString" 
        @blur="handleTagsBlur" 
        placeholder="Метки через ;" 
        :maxlength="VALIDATION_RULES.MAX_TAG_LENGTH" 
      />
    </v-col>
    <v-col cols="12" md="2">
      <v-select
        :model-value="account.type"
        @update:model-value="updateType"
        :items="ACCOUNT_TYPE_OPTIONS"
        :error="showTypeError"
      />
    </v-col>
    <v-col cols="12" :md="account.type === 'LDAP' ? 6 : 3">
      <v-text-field
        v-model="localLogin"
        @blur="handleLoginBlur"
        placeholder="Логин"
        :maxlength="VALIDATION_RULES.MAX_LOGIN_LENGTH"
        :error="showLoginError"
      />
    </v-col>
    <v-col v-if="account.type !== 'LDAP'" cols="12" md="3">
      <v-text-field
        v-model="localPassword"
        @blur="handlePasswordBlur"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Пароль"
        :maxlength="VALIDATION_RULES.MAX_PASSWORD_LENGTH"
        :error="showPasswordError"
        :disabled="!account.type"
      >
  <template #append-inner>
    <v-btn
      v-if="localPassword && account.type === 'Локальная'"
      @click="showPassword = !showPassword"
      :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      variant="text" 
      size="x-small" 
      density="compact"
    />
  </template>
</v-text-field>
    </v-col>
    <v-col cols="12" md="1" class="d-flex align-center justify-center">
      <v-btn 
        @click="accountStore.deleteAccount(account.id)" 
        icon="mdi-delete" 
        size="small" 
        variant="text" 
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAccountStore } from '../stores/useAccountStore'
import type { Account, AccountType } from '../types/account'
import { ACCOUNT_TYPE_OPTIONS, VALIDATION_RULES } from '../types/account'

const props = defineProps<{ account: Account }>()
const accountStore = useAccountStore()

const tagsString = ref(accountStore.getTagsAsString(props.account.tags))
const localLogin = ref(props.account.login)
const localPassword = ref(props.account.password || '')
const showPassword = ref(false)

watch(() => props.account.tags, (newTags) => { tagsString.value = accountStore.getTagsAsString(newTags) })
watch(() => props.account.login, (newLogin) => { localLogin.value = newLogin })
watch(() => props.account.password, (newPassword) => { localPassword.value = newPassword || '' })

const errors = computed(() => accountStore.getValidationErrors(props.account))

const showLoginError = computed(() => 
  errors.value.login && accountStore.isFieldTouched(props.account.id, 'login')
)

const showPasswordError = computed(() => 
  errors.value.password && accountStore.isFieldTouched(props.account.id, 'password')
)

const showTypeError = computed(() => 
  errors.value.type && accountStore.isFieldTouched(props.account.id, 'type')
) 

const handleTagsBlur = () => {
  const tags = accountStore.parseTagsFromString(tagsString.value)
  accountStore.updateAccount(props.account.id, { tags })
}
const handleLoginBlur = () => {
  accountStore.touchField(props.account.id, 'login')
  accountStore.updateAccount(props.account.id, { login: localLogin.value })
}
const handlePasswordBlur = () => {
  accountStore.touchField(props.account.id, 'password')
  accountStore.updateAccount(props.account.id, { password: localPassword.value })
}
const updateType = (type: AccountType) => {
  accountStore.touchField(props.account.id, 'type')
  const updates: Partial<Account> = { type }
  if (type === 'LDAP') {
    updates.password = null
  }
  accountStore.updateAccount(props.account.id, updates)
}
</script>

<style scoped>
:deep(.v-field--error .v-field__outline) {
  color: #d32f2f !important;
}
</style>