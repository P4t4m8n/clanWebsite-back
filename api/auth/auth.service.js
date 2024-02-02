import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'
import { userService } from '../user/user.service.js'
import { loggerService } from '../../service/logger.service.js'



export const authService = {
    signup,
    login,
    getLoginToken,
    validateToken
}

const cryptr = new Cryptr(process.env.SECRET1 || 'i love mama')

async function login(username, password) {
    loggerService.debug(`auth.service - login with username: ${username}`)

    const user = await userService.getByUsername(username)
    if (!user) throw new Error('Invalid username or password')

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Invalid username or password')

    delete user.password
    return user
}

async function signup(fullname, username, password,
    email, imgUrl, rank, position, medals, movement, history,
    msgs, units, officerNots, createdAt) {
        const saltRounds = 10
        console.log("rank:", rank)

    loggerService.debug(`auth.service - signup with username: ${username}`)
    if (!username || !password) throw new Error('Missing details')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({
        fullname, username, password: hash, email, imgUrl, rank, position,
        medals, movement, history, msgs, units, officerNots, createdAt
    })
}

function getLoginToken(user) {
    const userInfo = {
        _id: user._id,
        username: user.username,
    }
    return cryptr.encrypt(JSON.stringify(userInfo))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}