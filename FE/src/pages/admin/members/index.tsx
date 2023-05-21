import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import HeaderPage from 'src/components/common/HeaderPage'
import AdminGuard from 'src/guard/AdminGuard'
import PATH_URL from 'src/shared/path'

export default function Members() {
  const navigate = useNavigate()
  const location = useLocation()
  const isListPage = location.pathname.endsWith('/members')
  const title = isListPage ? 'Members List' : location?.search ? 'Edit Member' : 'Add Member'

  return (
    <AdminGuard>
      <HeaderPage
        title='Members'
        breadcrumbList={[
          {
            title: (
              <Link
                to={PATH_URL.members}
                onClick={(event) => {
                  if (isListPage) event.preventDefault()
                }}
              >
                Members
              </Link>
            )
          },
          {
            title: title
          }
        ]}
        hasCreateBtn={isListPage}
        onCreate={() => {
          navigate(`${PATH_URL.members}/form`)
        }}
      />
      <Outlet />
    </AdminGuard>
  )
}
