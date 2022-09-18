import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { IoMdCloseCircle } from 'react-icons/io'
import { rupiah } from '../../utils/rupiah'
import { datatypes } from '../../utils/dataType'
import { useSelector, useDispatch } from 'react-redux'
import { LazyLoadImage } from "react-lazy-load-image-component"
import './home.scss'
import axios from 'axios'
import ImageLoader from '../../components/Loader'
import { AuthLogout } from '../../redux/actions/auth'
const urlAPI = process.env.REACT_APP_API_URL;



const IndexHome = () => {
    const dispatch = useDispatch()
    const { GetAuth } = useSelector(state => state.auth)

    const [checkedState, setCheckedState] = useState(
        new Array(datatypes.length).fill(false)
    ),
        [filters, setFilters] = useState({
            type: [],
            poin: null,
            page: 1,
            limit: 9
        }),
        [noData, setNoData] = useState(false),
        [loading, setLoading] = useState(false),
        [data, setData] = useState({
            totalPage: 1,
            total: 0,
            result: []
        })

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if (!noData) {
                setFilters({
                    ...filters,
                    page: filters.page + 1
                })
            }
        }
    }

    useEffect(() => {
        loadData(filters, GetAuth.data.token)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.page])

    const loadData = async (form, token) => {
        setLoading(true)
        axios({
            method: "GET",
            url: `${urlAPI}/products?page=${form.page}&limit=${form.limit}${form.type && form.poin ? `&type=${form.type}&point=${form.poin}` :
                form.type ? `&type=${form.type}` :
                    form.poin ? `&point=${form.poin}` : ''
                }`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    setData({
                        result: [...data.result, ...res.data.data.result],
                        totalPage: res.data.data.totalPage,
                        total: res.data.data.total
                    })
                }
                if (res.status === 204) {
                    setNoData(true)
                }
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    dispatch(AuthLogout())
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
        const filter = datatypes.filter((item, index) => updatedCheckedState[index])
        setFilters({
            ...filters,
            type: filter.map(item => item.value)
        })
    }

    const onReset = (type) => {
        if (type === 'all') {
            setFilters({ page: 1, limit: 9, poin: null, type: [] })
            document.getElementById('rangeinput').value = 0
            setCheckedState(new Array(datatypes.length).fill(false))
        }
        if (type === 'type') {
            setFilters({ ...filters, limit: 9, type: [], page: 1 })
            setCheckedState(new Array(datatypes.length).fill(false))
        }
        if (type === 'poin') {
            setFilters({ ...filters, limit: 9, poin: null, page: 1 })
            document.getElementById('rangeinput').value = 0
        }
    }

    const onResetbtn = () => {
        setData({
            totalPage: 1,
            result: []
        })
        setNoData(false)
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setFilters({ ...filters, page: 1, limit: 9 })
        await loadData(filters, GetAuth.data.token)
    }

    return (<>
        <Navbar />
        <div className="container">
            <div className="row">
                {data.result.map((item, index) => (
                    <div key={index} className="col-md-4">
                        <div className="imagecontent">
                            <div className="overlatType">
                                {item.nameType === 'Vouchers' ? <div className='badge text-bg-info'>{item.nameType}</div> :
                                    item.nameType === 'Giftcard' ? <div className='badge text-bg-success'>{item.nameType}</div> :
                                        item.nameType === 'Product' ? <div className='badge text-bg-warning'>{item.nameType}</div> :
                                            <div className="badge text-bg-warning">{item.nameType}</div>
                                }
                            </div>
                            <LazyLoadImage
                                src={item.imageProduct}
                                alt={item.nameProduct}
                                effect="opacity"
                                className="image"
                                placeholder={<div className='text-center'><ImageLoader /></div>}
                            />
                            <div className="overlayPoin">
                                {rupiah(item.poinProduct)} POIN
                            </div>
                        </div>
                        <h5 className='titleproduct'>{item.nameProduct}</h5>
                    </div>
                ))}
                {loading ? <div className="col-md-12 text-center"> <div className="spinner-border text-secondary" role="status">  </div> </div> : null}
                {/* {noData ? <div className="col-md-12 text-center"> <h4>No data anymore!</h4> </div> : null} */}
            </div>
        </div>

        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar1" aria-labelledby="offcanvasNavbarLabel">
            <div className="container">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Filter</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {filters.poin !== null && <><span className="badge text-bg-primary">Poin: 10000 - {filters.poin?.split(',')[1]} <IoMdCloseCircle onClick={() => onReset('poin')} className='icon' /></span><br /></>}
                    {filters.type.length !== 0 && <><span className="badge text-bg-primary">Type: {filters.type.join(',')} <IoMdCloseCircle onClick={() => onReset('type')} className='icon' /></span><br /></>}
                    {filters.poin !== null || filters.type?.length !== 0 ? <span className="badge text-bg-primary" style={{ 'cursor': 'pointer' }} onClick={() => onReset('all')}>Clear All Filter</span> : ''}
                    <form onSubmit={(e) => onSubmit(e)}>
                        <p className="title mt-3">Poin Needed</p>
                        <div className="rangeSelect">
                            <p>IDR {rupiah(10000)}</p>
                            <p>IDR {filters.poin === null ? '-' : rupiah(filters.poin.split(',')[1])}</p>
                        </div>
                        <input id="rangeinput" type="range" min="10000" max="500000" onChange={e => setFilters({ ...filters, poin: `10000,${e.target.value}` })} className="w-100 custom-range" />
                        <p className="title mt-2 mb-2">Reward Type</p>
                        {datatypes.map(({ name, value }, index) => {
                            return (
                                <div key={index} className="form-check">
                                    <input className="form-check-input"
                                        id={`custom-checkbox-${index}`}
                                        value={value}
                                        checked={checkedState[index]}
                                        type="checkbox"
                                        onChange={() => handleOnChange(index)}
                                    />
                                    <label className="form-check-label" htmlFor={`custom-checkbox-${index}`}>{name}</label>
                                </div>
                            )
                        })}
                        <button onClick={() => onResetbtn()} className="btn btn-primary mt-2 w-100" data-bs-dismiss="offcanvas">Filter</button>
                    </form>
                </div>
            </div>
        </div >
    </>)
}

export default IndexHome