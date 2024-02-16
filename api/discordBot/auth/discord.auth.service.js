import axios from "axios"

export const discordAuthService = { authCallback }

async function authCallback(code, tokenUrl, redirect_uri, client_secret, client_id) {

    try {
        const tokenResponse = await axios.post(tokenUrl, new URLSearchParams({
            client_id,
            client_secret,
            grant_type: 'authorization_code',
            code,
            redirect_uri
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        const accessToken = tokenResponse.data.access_token
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        return userResponse
    }
    catch (err) { throw err }
}

