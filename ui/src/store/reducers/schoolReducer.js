

export default function (state = {
    count: 0,
    report_rows: [],
    user_details: {}
}, action) {
    switch(action.type){
        case "GET_COUNT":
            return {
                ...state,
                count: action.payload
            }
        case "GET_REPORT":
            return {
                ...state,
                report_rows: action.payload
            }
        case "SET_USER_DETAILS":
            return {
                ...state,
                user_details: action.payload
            }
        default:
            return state
    }
}