import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '../types/account'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([
    // Демо-данные для проверки
    { id: '1', tags: [{text: 'test'}], type: 'Локальная', login: 'admin', password: '123'}
  ])

  const addAccount = () => {
    console.log('Adding account...')
  }

  const deleteAccount = (id: string) => {
    console.log('Deleting account:', id)
  }

  return { accounts, addAccount, deleteAccount }
})