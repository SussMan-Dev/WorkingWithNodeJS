import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router'
import { api } from '../api'
import { Feedback } from '../components/Feedback'
import { PageHeader } from '../components/PageHeader'

const dateFormatter = new Intl.DateTimeFormat('en-GB')

const formatDate = (value: string | null) => value ? dateFormatter.format(new Date(value)) : '—'

export function UsersPage() {
  const queryClient = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword')?.trim() ?? ''
  const usersQuery = useQuery({
    queryKey: ['users', keyword],
    queryFn: () => api.getUsers(keyword),
  })
  const deleteUser = useMutation({
    mutationFn: api.deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  })

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const nextKeyword = String(formData.get('keyword') ?? '').trim()
    setSearchParams(nextKeyword ? { keyword: nextKeyword } : {})
  }

  const handleDelete = (userId: number, username: string) => {
    if (window.confirm(`Delete ${username}? This action cannot be undone.`)) {
      deleteUser.mutate(userId)
    }
  }

  return (
    <>
      <PageHeader
        action={<Link className="button button-primary" to="/users/create">Add user</Link>}
        eyebrow="Directory"
        subtitle="Find an account or keep its details up to date."
        title="Users"
      />

      <form className="search-card search-form" key={keyword} onSubmit={handleSearch}>
        <label className="sr-only" htmlFor="keyword">Search by username</label>
        <input defaultValue={keyword} id="keyword" name="keyword" placeholder="Search username" type="search" />
        <button className="button button-primary" type="submit">Search</button>
        <button className="button button-quiet" onClick={() => setSearchParams({})} type="button">Reset</button>
      </form>

      <Feedback message={usersQuery.error instanceof Error ? usersQuery.error.message : null} />
      <Feedback message={deleteUser.error instanceof Error ? deleteUser.error.message : null} />

      <section className="content-card table-card">
        {usersQuery.isPending ? (
          <div className="empty-state"><strong>Loading users…</strong></div>
        ) : usersQuery.data?.data.length ? (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>User</th><th>Date of birth</th><th>Created</th><th>Updated</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {usersQuery.data.data.map((user) => (
                  <tr key={user.userId}>
                    <td><span className="id-badge">#{user.userId}</span></td>
                    <td>
                      <div className="user-cell">
                        <span className="user-avatar">{user.username.charAt(0).toUpperCase()}</span>
                        <strong>{user.username}</strong>
                      </div>
                    </td>
                    <td>{user.dateOfBirth ?? '—'}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>{formatDate(user.updatedAt)}</td>
                    <td>
                      <div className="table-actions">
                        <Link className="button button-warning button-small" to={`/users/edit/${user.userId}`}>Edit</Link>
                        <button
                          className="button button-danger button-small"
                          disabled={deleteUser.isPending && deleteUser.variables === user.userId}
                          onClick={() => handleDelete(user.userId, user.username)}
                          type="button"
                        >
                          {deleteUser.isPending && deleteUser.variables === user.userId ? 'Deleting…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <strong>No users found</strong>
            <span>Try another search or create a new user.</span>
          </div>
        )}
      </section>
    </>
  )
}
