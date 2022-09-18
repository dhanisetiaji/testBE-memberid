import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const urlAPI = process.env.REACT_APP_API_URL;

const GetAuthRequest = () => {
    return {
        type: "GET_AUTH_REQUEST"
    };
}

const GetAuth = (data) => {
    return {
        type: "GET_AUTH",
        payload: data
    };
};

const GetAuthErr = (err) => {
    return {
        type: "GET_AUTH_ERR",
        payload: err
    };
}

export const AuthLogout = () => {
    return {
        type: "AUTH_LOGOUT",
    }
}

export const GetAuthLogin = (formLogin) => {
    return (dispatch) => {
        dispatch(GetAuthRequest())
        axios({
            method: "POST",
            data: formLogin,
            url: `${urlAPI}/auth`,
        }).then((res) => {
            if (res.status === 200) {
                toast.success(`Login success!`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            dispatch(GetAuth(res.data))
        }).catch((err) => {

            toast.error(`Erorr, Email not exist!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch(GetAuthErr(err.response.data))
        })
    }
};