import { Client, GatewayIntentBits } from 'discord.js'
import { loggerService } from '../../../service/logger.service.js'
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
import dotenv from 'dotenv';
dotenv.config()
const TOKEN = process.env.DISCORD_CLIENT_SECRET
const _GUILD_ID = process.env.DISCORD_GUILD_ID

client.login(TOKEN)


export const discordRoleService = {
    add,
    update,
    remove,
    query,
    get
}
export function query() {
    const guild = client.guilds.cache.get(_GUILD_ID)

    const roles = guild.roles.cache.map(role => ({ id: role.id, name: role.name }))
    return roles
}

function get(roleId) {
    const guild = client.guilds.cache.get(_GUILD_ID)
    return guild.roles.cache.get(roleId)
}

async function add({ name, bitMapPermissions: permissions }) {
    const guild = client.guilds.cache.get(_GUILD_ID)

    try {
        const savedRole = await guild.roles.create({ name, permissions })
        return savedRole
    } catch (err) {
        loggerService.error('Cannot add role', err)
        throw err
    }
}

async function update({ name, permissions, roleId }) {
    const guild = client.guilds.cache.get(_GUILD_ID)
    const role = guild.roles.cache.get(roleId)

    try {
        const savedRole = await role.edit({ name, permissions });
        return savedRole
    } catch (err) {
        loggerService.error('Cannot update role: ' + roleId, err)
        throw err
    }
}

async function remove(roleId) {

    const guild = client.guilds.cache.get(_GUILD_ID)
    const role = guild.roles.cache.get(roleId)
    console.log("role:", role)
    try {
        await role.delete()
        return roleId
    } catch (err) {
        loggerService.error(`Cannot delete role ${roleId}`, err)
        throw err
    }
}



