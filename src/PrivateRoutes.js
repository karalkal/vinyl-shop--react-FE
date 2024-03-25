import { Outlet } from 'react-router-dom'
import ErrorGeneric from './pages/ErrorGeneric'

const PrivateRoutes = () => {
    let auth = { 'token': false }
    return (
        auth.token ? <Outlet /> : <ErrorGeneric errMessage="Not authorized to access this route" />

    )
}

export default PrivateRoutes
