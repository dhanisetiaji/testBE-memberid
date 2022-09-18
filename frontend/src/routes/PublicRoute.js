import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const PublicRoute = ({ children }) => {
    const navigate = useNavigate()
    const { isLogin } = useSelector((s) => s.auth)

    useEffect(() => {
        if (isLogin) {
            navigate('/')
        }
    }, [isLogin]) // eslint-disable-line react-hooks/exhaustive-deps

    return (children)
}

export default PublicRoute