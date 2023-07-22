import { robloxClient } from '../main';
import { BloxlinkResponse } from '../structures/types';
import axios from 'axios';
require('dotenv').config();
let requestCount = 0;

const getLinkedRobloxUser = async (discordId: string, guildId: string) => {
    if(requestCount >= 500) return null;
    requestCount += 1;
    
    const robloxStatus: BloxlinkResponse = (await axios.get(`https://api.blox.link/v4/public/guilds/${guildId}/discord-to-roblox/${discordId}`, { headers: { 'Authorization': process.env.BLOXLINK_KEY } })).data;
    if(robloxStatus.error) return null;

    const robloxUser = await robloxClient.getUser(parseInt(robloxStatus.robloxID));
    return robloxUser;
}

const refreshRateLimits = () => {
    requestCount = 0;
    setTimeout(refreshRateLimits, 60000);
}
setTimeout(refreshRateLimits, 60000);

export { getLinkedRobloxUser };