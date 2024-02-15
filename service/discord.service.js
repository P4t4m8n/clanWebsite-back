import bigInt from "big-integer"

export function createPermissionsBitfield(permissions) {
  
    let bitfield = bigInt(0)
    const permissionValues = {
        CREATE_INSTANT_INVITE: bigInt(1).shiftLeft(0),
        KICK_MEMBERS: bigInt(1).shiftLeft(1),
        BAN_MEMBERS: bigInt(1).shiftLeft(2),
        ADMINISTRATOR: bigInt(1).shiftLeft(3),
        MANAGE_CHANNELS: bigInt(1).shiftLeft(4),
        MANAGE_GUILD: bigInt(1).shiftLeft(5),
        ADD_REACTIONS: bigInt(1).shiftLeft(6),
        VIEW_AUDIT_LOG: bigInt(1).shiftLeft(7),
        PRIORITY_SPEAKER: bigInt(1).shiftLeft(8),
        STREAM: bigInt(1).shiftLeft(9),
        VIEW_CHANNEL: bigInt(1).shiftLeft(10),
        SEND_MESSAGES: bigInt(1).shiftLeft(11),
        SEND_TTS_MESSAGES: bigInt(1).shiftLeft(12),
        MANAGE_MESSAGES: bigInt(1).shiftLeft(13),
        EMBED_LINKS: bigInt(1).shiftLeft(14),
        ATTACH_FILES: bigInt(1).shiftLeft(15),
        READ_MESSAGE_HISTORY: bigInt(1).shiftLeft(16),
        MENTION_EVERYONE: bigInt(1).shiftLeft(17),
        USE_EXTERNAL_EMOJIS: bigInt(1).shiftLeft(18),
        VIEW_GUILD_INSIGHTS: bigInt(1).shiftLeft(19),
        CONNECT: bigInt(1).shiftLeft(20),
        SPEAK: bigInt(1).shiftLeft(21),
        MUTE_MEMBERS: bigInt(1).shiftLeft(22),
        DEAFEN_MEMBERS: bigInt(1).shiftLeft(23),
        MOVE_MEMBERS: bigInt(1).shiftLeft(24),
        USE_VAD: bigInt(1).shiftLeft(25),
        CHANGE_NICKNAME: bigInt(1).shiftLeft(26),
        MANAGE_NICKNAMES: bigInt(1).shiftLeft(27),
        MANAGE_ROLES: bigInt(1).shiftLeft(28),
        MANAGE_WEBHOOKS: bigInt(1).shiftLeft(29),
        MANAGE_EMOJIS: bigInt(1).shiftLeft(30),
    }


    for (const permission of permissions) {
        if (permissionValues[permission]) {
            bitfield = bitfield.or(permissionValues[permission])
        }
    }

    return bitfield
}


