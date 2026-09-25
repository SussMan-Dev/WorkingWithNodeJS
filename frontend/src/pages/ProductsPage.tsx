import { useQuery } from '@tanstack/react-query'
import { api } from '../api'
import { Feedback } from '../components/Feedback'
import { PageHeader } from '../components/PageHeader'

const priceFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function ProductsPage() {
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: api.getProducts,
  })

  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        subtitle="Review product details and current inventory levels."
        title="Products"
      />
      <Feedback message={productsQuery.error instanceof Error ? productsQuery.error.message : null} />

      <section className="content-card table-card">
        {productsQuery.isPending ? (
          <div className="empty-state"><strong>Loading products…</strong></div>
        ) : productsQuery.data?.data.length ? (
          <div className="table-scroll">
            <table>
              <thead><tr><th>ID</th><th>Product</th><th>Description</th><th>Stock</th><th>Price</th></tr></thead>
              <tbody>
                {productsQuery.data.data.map((product) => (
                  <tr key={product.productId}>
                    <td><span className="id-badge">#{product.productId}</span></td>
                    <td><strong>{product.productName}</strong></td>
                    <td className="muted-cell">{product.description ?? '—'}</td>
                    <td><span className={product.stockQuantity > 0 ? 'stock-badge' : 'stock-badge empty'}>{product.stockQuantity}</span></td>
                    <td className="number-cell">{priceFormatter.format(Number(product.price))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state"><strong>No products found</strong><span>Products will appear here after they are created.</span></div>
        )}
      </section>
    </>
  )
}
