export const postProject = async (project) => {
    try {
        console.log(process.env.REACT_APP_API_URL + `projects`)
        const request = await fetch(process.env.REACT_APP_API_URL + `projects`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
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

export const getProjectById = async (projectId) => {
    try {
        console.log(process.env.REACT_APP_API_URL + `projects/${projectId}`)
        const request = await fetch(process.env.REACT_APP_API_URL + `projects/${projectId}`, {
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