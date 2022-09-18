import React, { useState } from 'react'
import './auth.scss'
import { useDispatch } from 'react-redux'
import { GetAuthLogin } from '../../redux/actions/auth'

const AuthLogin = () => {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(GetAuthLogin(formData))
    }

    return (
        <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-4 text-center mt-5">
                    <img src="../../images/star.png" className='imgLogo' alt="img" />
                    <h4>AWARD</h4>
                    <p>Enter email address to sign in and continue</p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-group">
                            <input type="email" onChange={(e) => setFormData({ email: e.target.value })} className="form-control" placeholder="Email address" />
                        </div>
                        <button type="submit" className="btn btn-secondary">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthLogin