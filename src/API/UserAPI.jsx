export const getUserById = async (userId) => {
    try {
        console.log(process.env.REACT_APP_API_URL + `users/${userId}`)
        const request = await fetch(process.env.REACT_APP_API_URL + `users/${userId}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(results => {
                return results
            })
        return request
    } catch (error) {
        console.log(error)
    }
}

export const putUserProject = async (userId, projectId) => {
    console.log(process.env.REACT_APP_API_URL + `users/${userId}/project`)
    try {
        const request = await fetch(process.env.REACT_APP_API_URL + `users/${userId}/project`, {
            method: 'PUT',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({projectId})
        })
            .then(response => response.headers.get('Location'))//response.json())
            .then(results => {
                return results
            })
        return request
    } catch (error) {
        console.log(error)
    }
}