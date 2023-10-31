import { combineReducers } from "redux"
import schoolReducer from "./schoolReducer"

const rootReducer = combineReducers({
    schoolstore: schoolReducer
})

export default rootReducer;