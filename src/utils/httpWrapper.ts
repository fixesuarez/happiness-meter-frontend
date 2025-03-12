export const post = (endpoint: string, body: any): Promise<any> => {
    return fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }).then(response => response.json())
}