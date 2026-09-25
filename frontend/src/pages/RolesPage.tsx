import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState, type FormEvent } from 'react'
import { api } from '../api'
import { Feedback } from '../components/Feedback'
import { PageHeader } from '../components/PageHeader'
import type { Role } from '../types'

const dateFormatter = new Intl.DateTimeFormat('en-GB')

export function RolesPage() {
  const queryClient = useQueryClient()
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const rolesQuery = useQuery({
    queryKey: ['roles'],
    queryFn: () => api.getRoles(),
  })
  const saveRole = useMutation({
    mutationFn: ({ roleName, roleId }: { roleName: string; roleId?: number }) =>
      roleId ? api.updateRole(roleId, roleName) : api.createRole(roleName),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['roles'] })
      setEditingRole(null)
    },
  })
  const deleteRole = useMutation({
    mutationFn: api.deleteRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const roleName = String(formData.get('roleName') ?? '').trim()
    if (roleName) saveRole.mutate({ roleName, roleId: editingRole?.roleId })
  }

  const handleDelete = (role: Role) => {
    if (window.confirm(`Delete the ${role.roleName} role?`)) {
      deleteRole.mutate(role.roleId)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Access control"
        subtitle="Create and maintain the roles available in the application."
        title="Roles"
      />

      <section className="content-card role-editor">
        <form key={editingRole?.roleId ?? 'new'} onSubmit={handleSubmit}>
          <div className="field grow">
            <label htmlFor="roleName">{editingRole ? 'Edit role name' : 'New role name'}</label>
            <input defaultValue={editingRole?.roleName ?? ''} id="roleName" name="roleName" required type="text" />
          </div>
          <button className="button button-primary" disabled={saveRole.isPending} type="submit">
            {saveRole.isPending ? 'Saving…' : editingRole ? 'Save role' : 'Add role'}
          </button>
          {editingRole ? (
            <button className="button button-quiet" onClick={() => setEditingRole(null)} type="button">Cancel</button>
          ) : null}
        </form>
      </section>

      <Feedback message={saveRole.error instanceof Error ? saveRole.error.message : null} />
      <Feedback message={deleteRole.error instanceof Error ? deleteRole.error.message : null} />
      <Feedback message={rolesQuery.error instanceof Error ? rolesQuery.error.message : null} />

      <section className="content-card table-card">
        {rolesQuery.isPending ? (
          <div className="empty-state"><strong>Loading roles…</strong></div>
        ) : rolesQuery.data?.data.length ? (
          <div className="table-scroll">
            <table>
              <thead><tr><th>ID</th><th>Role</th><th>Created</th><th>Actions</th></tr></thead>
              <tbody>
                {rolesQuery.data.data.map((role) => (
                  <tr key={role.roleId}>
                    <td><span className="id-badge">#{role.roleId}</span></td>
                    <td><strong>{role.roleName}</strong></td>
                    <td>{dateFormatter.format(new Date(role.createdAt))}</td>
                    <td>
                      <div className="table-actions">
                        <button className="button button-warning button-small" onClick={() => setEditingRole(role)} type="button">Edit</button>
                        <button
                          className="button button-danger button-small"
                          disabled={deleteRole.isPending && deleteRole.variables === role.roleId}
                          onClick={() => handleDelete(role)}
                          type="button"
                        >
                          {deleteRole.isPending && deleteRole.variables === role.roleId ? 'Deleting…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state"><strong>No roles found</strong><span>Add the first role above.</span></div>
        )}
      </section>
    </>
  )
}
