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

export const VALIDATION_RULES = {
  MAX_TAG_LENGTH: 50,
  MAX_LOGIN_LENGTH: 100,
  MAX_PASSWORD_LENGTH: 100,
  TAG_SEPARATOR: ';'
} as const