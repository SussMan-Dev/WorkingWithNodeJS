import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router'
import { api } from '../api'
import { PageHeader } from '../components/PageHeader'
import { UserForm } from '../components/UserForm'
import type { UserInput } from '../types'

type UserEditorPageProps = {
  mode: 'create' | 'edit'
}

export function UserEditorPage({ mode }: UserEditorPageProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const params = useParams()
  const userId = Number(params.userId)
  const isEditing = mode === 'edit'
  const userQuery = useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.getUser(userId),
    enabled: isEditing && Number.isInteger(userId) && userId > 0,
  })
  const saveUser = useMutation({
    mutationFn: (input: UserInput) => isEditing
      ? api.updateUser(userId, input)
      : api.createUser(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/users')
    },
  })

  if (isEditing && (!Number.isInteger(userId) || userId <= 0)) {
    return <div className="empty-state"><strong>Invalid user id</strong></div>
  }

  if (isEditing && userQuery.isPending) {
    return <div className="empty-state"><strong>Loading user…</strong></div>
  }

  if (isEditing && (userQuery.isError || !userQuery.data)) {
    return (
      <div className="empty-state">
        <strong>Unable to load this user</strong>
        <span>{userQuery.error instanceof Error ? userQuery.error.message : 'User not found.'}</span>
      </div>
    )
  }

  const user = userQuery.data?.data

  return (
    <>
      <PageHeader
        eyebrow={isEditing ? `Users / #${userId}` : 'Users / New'}
        subtitle={isEditing
          ? 'Make the changes you need, then save the record.'
          : 'Enter the account details below. All fields are required.'}
        title={isEditing ? `Edit ${user?.username ?? 'user'}` : 'Add a user'}
      />

      <section className="content-card form-card">
        <UserForm
          error={saveUser.error instanceof Error ? saveUser.error.message : null}
          initialValues={user ? { username: user.username, dateOfBirth: user.dateOfBirth ?? '' } : undefined}
          isSubmitting={saveUser.isPending}
          mode={mode}
          onSubmit={(input) => saveUser.mutate(input)}
        />
      </section>
    </>
  )
}
