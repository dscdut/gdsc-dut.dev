import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import HeaderPage from 'src/components/common/HeaderPage'
import AdminGuard from 'src/guard/AdminGuard'
import PATH_URL from 'src/shared/path'

export default function ProductLayout() {
  const navigate = useNavigate()
  const { id: idProduct } = useParams()
  const isListPage = location.pathname.endsWith('/products')
  const title = isListPage ? 'Products List' : idProduct ? 'Edit Product' : 'Add Product'

  return (
    <AdminGuard>
      <HeaderPage
        title='Products'
        breadcrumbList={[
          {
            title: (
              <Link
                to={PATH_URL.products}
                onClick={(event) => {
                  if (isListPage) event.preventDefault()
                }}
              >
                Products
              </Link>
            )
          },
          {
            title: title
          }
        ]}
        hasCreateBtn={isListPage}
        onCreate={() => {
          navigate(`${PATH_URL.products}/form`)
        }}
      />
      <Outlet />
    </AdminGuard>
  )
}
