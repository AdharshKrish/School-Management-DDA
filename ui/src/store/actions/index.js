import MyAxios from '../../util/MyAxios.js'


export const handleAuthLogin = (data) => {
    return async (dispatch) => {
        try{
        const count = await MyAxios.get('/loginAuth',{
            params: {
                data: data
            }
        })
        // let value = count.data

        console.log('Auth Login: ', count.data)

        dispatch({type: "SET_USER_DETAILS", payload: count.data})
        }catch(err){

        }
    }
}

export const getStudentsCount = () => {
    return async (dispatch) => {
        try{
        const count = await MyAxios.get('/getStudentsCount')
        let value = count.data[0]

        console.log('Count of Students: ', value.count)

        dispatch({type: "GET_COUNT", payload: value.count})
        }catch(err){

        }
    }
}

export const submitAttendance = (data) => {
    return async (dispatch) => {
        try{
        const count = await MyAxios.post('/submitAttendance',data)
        // let value = count.data

        console.log('Count of Students: ', count)

        // dispatch({type: "GET_COUNT", payload: value.count})
        }catch(err){

        }
    }
}

export const submitGrade = (data) => {
    return async (dispatch) => {
        try{
        const count = await MyAxios.post('/submitGrade',data)
        // let value = count.data

        console.log('Count of Students: ', count)

        // dispatch({type: "GET_COUNT", payload: value.count})
        }catch(err){

        }
    }
}

export const submitReportType = (data, id) => {
    return async (dispatch) => {
        try{
        let count

        if(id === ""){
            count = await MyAxios.get('/getReport',{
                params: {
                    data: data
                }
            })
        }else{
            count = await MyAxios.get('/getReportByID',{
                params: {
                    data: data,
                    id: id
                }
            })
        }
        
        // let value = count.data

        console.log('Count of Students: ', count.data[0])

        dispatch({type: "GET_REPORT", payload: count.data[0]})
        }catch(err){

        }
    }
}