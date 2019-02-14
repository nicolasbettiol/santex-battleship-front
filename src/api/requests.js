const endpoint = 'http://localhost:9000/graphql'

export async function loadGames(){
    const response = fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type':'application/json'},
        body: JSON.stringify({
            query: `
            {
            games{
                  id
                  status
                }
            }
            `
        })

    })
    const responseBody = await response.json();
    return responseBody.data.games;
}