import axios from 'axios'
export const login = async(body) => {
    const{id} = body
    try{
        const getLoginData = await axios.post(`http://localhost:3400/api/users/login`,body)
        return getLoginData
    }
    catch(err){
        console.log(err)
    }
}