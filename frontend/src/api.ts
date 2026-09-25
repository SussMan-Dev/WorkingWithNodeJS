import type { ApiData, ApiMessage, Product, Role, User, UserInput } from './types'

const apiBaseUrl = import.meta.env.VITE_API_URL ?? ''

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  })

  if (response.status === 204) {
    return undefined as T
  }

  const result = (await response.json().catch(() => null)) as
    | ApiMessage
    | T
    | null

  if (!response.ok) {
    const message = typeof result === 'object' && result !== null && 'message' in result
      ? result.message
      : 'Something went wrong. Please try again.'
    throw new ApiError(message, response.status)
  }

  return result as T
}

export const api = {
  login: (credentials: { username: string; password: string }) =>
    request<ApiMessage>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  register: (input: UserInput) =>
    request<ApiMessage>('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  getUsers: (keyword = '') => {
    const query = keyword ? `?keyword=${encodeURIComponent(keyword)}` : ''
    return request<ApiData<User[]>>(`/api/v1/users${query}`)
  },

  getUser: (id: number) => request<ApiData<User>>(`/api/v1/users/${id}`),

  createUser: (input: UserInput) =>
    request<ApiMessage>('/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  updateUser: (id: number, input: UserInput) =>
    request<ApiMessage>(`/api/v1/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    }),

  deleteUser: (id: number) =>
    request<void>(`/api/v1/users/${id}`, { method: 'DELETE' }),

  getRoles: (keyword = '') => {
    const query = keyword ? `?keyword=${encodeURIComponent(keyword)}` : ''
    return request<ApiData<Role[]>>(`/api/v1/roles${query}`)
  },

  createRole: (roleName: string) =>
    request<ApiData<Role> & ApiMessage>('/api/v1/roles', {
      method: 'POST',
      body: JSON.stringify({ roleName }),
    }),

  updateRole: (id: number, roleName: string) =>
    request<ApiMessage>(`/api/v1/roles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ roleName }),
    }),

  deleteRole: (id: number) =>
    request<void>(`/api/v1/roles/${id}`, { method: 'DELETE' }),

  getProducts: () => request<ApiData<Product[]>>('/api/v1/products'),
}
