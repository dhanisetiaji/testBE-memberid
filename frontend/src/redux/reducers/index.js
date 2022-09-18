import { combineReducers } from 'redux'
import Auth from './auth'
const rootReducers = combineReducers({
    auth: Auth
})
export default rootReducers