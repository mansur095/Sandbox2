export interface Tag {
  text: string
}

export type AccountType = 'LDAP' | 'Локальная' | ''

export interface Account {
  id: string
  tags: Tag[]
  type: AccountType
  login: string
  password: string | null
}

export const ACCOUNT_TYPE_OPTIONS = [
  { value: '', title: 'Выберите тип' },
  { value: 'Локальная', title: 'Локальная' },
  { value: 'LDAP', title: 'LDAP' }
] as const