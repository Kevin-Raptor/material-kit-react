import axios from 'axios';


const getAuthorizationHeader = token => {
    if (token) {
        return {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        };
    } else {
        return {}; // Return an empty object when token is not provided or falsy
    }
};


export const login = async(body) => {
    try{
        const getLoginData = await axios.post(`http://localhost:3400/api/users/login`, body)
        return getLoginData.data;
    }
    catch(err){
        console.log(`login api error`, err)
    }
}

export const fetchTags = async(token) => {
    try{
        const requestOptions = {
            headers: getAuthorizationHeader(token)
        }
        const tagResultData = await axios.get(`http://localhost:3400/api/tags/`, requestOptions)
        if(tagResultData.data.success){
            return tagResultData.data
        }
        else{
            return null;
        }
    }catch(err){
        console.log(`fetch tags api error`, err)
    }
}


export const fetchTagsWithOutParent = async(token) => {
    try{
        const requestOptions = {
            headers: getAuthorizationHeader(token)
        }
        const result = await axios.get(`http://localhost:3400/api/tags/no-parent`, requestOptions)
        if(result.data.success){
            return result.data
        }
        else{
            return null;
        }
    }catch(err){
        console.log(`fetch tags with no parent api error`, err)
    }
}
