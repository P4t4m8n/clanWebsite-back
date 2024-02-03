import { loggerService } from "../../service/logger.service.js"
import { authService } from "./auth.service.js"



export async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)

        loggerService.info('User login: ', user)
        res.cookie('loginToken', loginToken, { sameSite: 'None', secure: true })

        res.json(user)
    } catch (err) {
        loggerService.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

export async function signup(req, res) {
    
    const {
        fullname,
        username,
        password,
        email,
        imgUrl,
        rank,
        medals,
        movement,
        history,
        msgs,
        units,
        officerNots,
        position,
        createdAt
    } = req.body

    try {
        const account = await authService.signup(
            fullname,
            username,
            password,
            email,
            imgUrl,
            rank,
            medals,
            movement,
            history,
            msgs,
            units,
            officerNots,
            position,
            createdAt)

        loggerService.debug(`auth.route - new account created: ` + JSON.stringify(account))

        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)

        res.cookie('loginToken', loginToken)
        res.json(user)

    } catch (err) {
        loggerService.error('Failed to signup ' + err)
        res.status(400).send({ err: 'Failed to signup' })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}