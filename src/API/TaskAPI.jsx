export const getTasksByProjectId = async (projectId) => {
    try {
        console.log(process.env.REACT_APP_API_URL + `projects/${projectId}/tasks`)
        const request = await fetch(process.env.REACT_APP_API_URL + `projects/${projectId}/tasks`, {
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