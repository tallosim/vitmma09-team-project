export const handleResponse = (response, error) => {
    if (error)
        return Promise.reject('CONNECTION_ERROR')
    
    return response
}

export const isUUID = (str) => {
    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
    return regexExp.test(str)
}