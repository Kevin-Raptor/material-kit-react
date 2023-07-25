import axios from 'axios';
export const login = async(body) => {
    try{
        const getLoginData = await axios.post(`http://localhost:3400/api/users/login`, body)
        return getLoginData.data;
    }
    catch(err){
        console.log(`Error`, err)
    }
}

