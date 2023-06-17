import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import PublicLayout from 'src/components/layouts/PublicLayout'
import { ReactWithChild } from 'src/interface/app'

function PublicRoute() {
  const [havePermission, setHavePermission] = useState(false) // Sau ni dung accessToken

  useEffect(() => {
    //handle redirect o day
  }, [])

  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  )
}

export default PublicRoute
