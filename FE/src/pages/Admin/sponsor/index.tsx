import { useMemo } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import HeaderPage from 'src/components/common/HeaderPage'
import AdminGuard from 'src/guard/AdminGuard'
import PATH_URL from 'src/shared/path'

export default function SponsorLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const isListPage = location.pathname.endsWith('/sponsors')
  const title = isListPage ? 'Sponsors List' : location?.search ? 'Edit Sponsor' : 'Add Sponsor'

  return (
    <AdminGuard>
      <HeaderPage
        title='Sponsors'
        breadcrumbList={[
          {
            title: (
              <Link
                to={PATH_URL.sponsors}
                onClick={(event) => {
                  if (isListPage) event.preventDefault()
                }}
              >
                Sponsors
              </Link>
            )
          },
          {
            title: title
          }
        ]}
        hasCreateBtn={isListPage}
        onCreate={() => {
          navigate(`${PATH_URL.sponsors}/form`)
        }}
      />
      <Outlet />
    </AdminGuard>
  )
}