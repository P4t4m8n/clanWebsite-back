import { discordAuthService } from "./discord.auth.service.js"
import dotenv from 'dotenv'
dotenv.config()


export function redirectToAuth(req, res) {
    const client_id = process.env.DISCORD_CLIENT_ID
    const redirect_uri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI)

    const scope = encodeURIComponent('identify email')
    const redirectUri = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`
    res.redirect(redirectUri)
    console.log("redirectUri:", redirectUri)
}

export async function getAuthCallback(req, res) {
    const { code } = req.query
    console.log("code:", code)
    const tokenUrl = 'https://discord.com/api/oauth2/token'
    const redirect_uri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI)
    const client_secret = process.env.DISCORD_CLIENT_SECRET
    const client_id = process.env.DISCORD_CLIENT_ID

    try {
        const userResponse = await discordAuthService.authCallback(code, tokenUrl, redirect_uri, client_secret, client_id)
        // Here you can handle the user's data, e.g., create or update a user record in your database
        console.log("userResponse", userResponse) // Log the user's data from Discord
        res.send('Discord authentication successful!')
    } catch (error) {
        console.error('Error during Discord authentication:', error)
        res.status(500).send('Authentication failed')
    }
}

