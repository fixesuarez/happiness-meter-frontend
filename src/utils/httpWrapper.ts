export const get = (endpoint: string): Promise<any> => {
    return fetch(`http://localhost:3000${endpoint}`, {
        method: 'GET',
        headers: {
            "content-type": "application/json"
        },
    }).then(response => response.json())
}

export const post = (endpoint: string, body: any): Promise<any> => {
    return fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
}