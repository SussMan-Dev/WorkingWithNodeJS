export type User = {
  userId: number
  username: string
  dateOfBirth: string | null
  createdAt: string
  updatedAt: string
}

export type Role = {
  roleId: number
  roleName: string
  createdAt: string
}

export type Product = {
  productId: number
  productName: string
  description: string | null
  stockQuantity: number
  price: string | number
}

export type UserInput = {
  username: string
  dateOfBirth: string
  password: string
  confirmPassword: string
}

export type ApiData<T> = {
  data: T
}

export type ApiMessage = {
  message: string
}
