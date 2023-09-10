import axios from 'axios';
const getAuthorizationHeader = token => {
    if (token) {
        return {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
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
        const requestOptions = getAuthorizationHeader(token);
        console.log(requestOptions);
        const tagResultData = await axios.get(`http://localhost:3400/api/tags/`, requestOptions)
        console.log(`tagResultData`, tagResultData)
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
        const requestOptions = getAuthorizationHeader(token);
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

// debugger;
export const addNewTag = async(token, body) => {
    try{
        const requestOptions = getAuthorizationHeader(token);
        const result = await axios.post(`http://localhost:3400/api/tags/`, body, requestOptions);
        if(result.data.success){
            return result.data
        }
        else{
            return null;
        }
    }catch(err){
        console.log(`addNewTag api error`, err)
    }
}

export const getChildParentRelationExist = async(parentTagId, token) => {
    try{
        const requestOptions = getAuthorizationHeader(token);
        const result = await axios.get(`http://localhost:3400/api/tags/children?parent=${parentTagId}`, requestOptions)
        if(result.data.success){
            return result.data
        }
        else{
            return null;
        }

    }catch(err){
        console.log(`getChildParentTag api error`, err)
    }

}


export const addRelationBetweenParentAndChild = async(parentTagId, childTagId, token) => {
    try{
        const requestOptions = getAuthorizationHeader(token);
        const result = await axios.patch(`http://localhost:3400/api/tags/assign-relationship`, {parent: `${parentTagId}`, children: [`${childTagId}`]}, requestOptions);
        if(result.data.success){
            return result.data
        }
        else{
            return null;
        }
    }catch(err){
        console.log(`addRelationBetweenParentAndChild api error`, err)
    }
}
