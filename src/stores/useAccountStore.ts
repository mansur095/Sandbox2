import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account, Tag } from '../types/account'
import { VALIDATION_RULES } from '../types/account'

export const useAccountStore = defineStore('account', () => {
  const accounts = ref<Account[]>([])

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

  return {
    accounts, addAccount, deleteAccount, updateAccount,
    parseTagsFromString, getTagsAsString
  }
})