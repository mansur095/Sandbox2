import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Account, Tag, ValidationErrors } from '../types/account'
import { VALIDATION_RULES } from '../types/account'

const LOCAL_STORAGE_KEY = 'account-manager-accounts'

export const useAccountStore = defineStore('account', () => {

  const getInitialAccounts = (): Account[] => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) return JSON.parse(saved)
    } catch (error) { console.warn('Ошибка загрузки из localStorage:', error) }
    return []
  }

  const accounts = ref<Account[]>(getInitialAccounts())
  const touchedFields = ref<Record<string, Set<string>>>({})

  watch(accounts, (newAccounts) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newAccounts))
  }, { deep: true })

  const addAccount = () => {
    accounts.value.push({
      id: Date.now().toString(),
      tags: [], type: '', login: '', password: null
    })
  }

  const deleteAccount = (id: string) => {
    const index = accounts.value.findIndex(acc => acc.id === id)
    if (index !== -1) accounts.value.splice(index, 1)
  }

  const updateAccount = (id: string, updates: Partial<Account>) => {
    const account = accounts.value.find(acc => acc.id === id)
    if (account) Object.assign(account, updates)
  }

  const parseTagsFromString = (tagsString: string): Tag[] => {
    return tagsString
      .split(VALIDATION_RULES.TAG_SEPARATOR)
      .map(tag => tag.trim()).filter(tag => tag.length > 0)
      .map(text => ({ text }))
  }

  const getTagsAsString = (tags: Tag[]): string => {
    return tags.map(tag => tag.text).join(VALIDATION_RULES.TAG_SEPARATOR + ' ')
  }

  const getValidationErrors = (account: Account): ValidationErrors => {
    return {
      type: !account.type,
      login: !account.login.trim(),
      password: account.type === 'Локальная' && !account.password
    }
  }

  const touchField = (id: string, field: 'login' | 'password' | 'type') => {
  if (!touchedFields.value[id]) touchedFields.value[id] = new Set()
      touchedFields.value[id].add(field)
  }

  const isFieldTouched = (id: string, field: 'login' | 'password' | 'type'): boolean => {
    return touchedFields.value[id]?.has(field) || false
  }

  return {
    accounts, 
    addAccount, 
    deleteAccount, 
    updateAccount,
    parseTagsFromString, 
    getTagsAsString, 
    getValidationErrors, 
    touchField, 
    isFieldTouched
  }
})