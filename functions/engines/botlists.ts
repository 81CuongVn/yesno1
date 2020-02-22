import {engine} from 'sparkbots'
import {Client} from 'discord.js'
const Engine = engine("botlists")
export = Engine

import * as blapi from 'blapi'
import * as fetch from 'snekfetch'

Engine.code = (client: Client) => {
      
  try {
    /*
    blapi.handle(client, {
      'botlist.space': process.env.bls,
      'discordsbestbots.xyz': process.env.dbb,
      'discordbots.org': process.env.dbl,
      'bots.ondiscord.xyz': process.env.bod,
      'botsfordiscord.com': process.env.bfd,
      'discordextremelist.xyz': process.env.del,
      'discord.bots.gg': process.env.dbgg
    }, 3)
    */
    // discordbotlist.com accepts more data
    setInterval(() => {
        fetch.post(`https://discordbotlist.com/api/bots/${client.user.id}/stats`)
          .set('Authorization', 'Bot '+process.env.dblc)
          // @ts-ignore
          .send({ guilds: client.guilds.cache.size, users: client.users.cache.size })
          .catch(error => console.error(error))
    }, 60000)

  } catch (e) {
    console.error(e)
  }
  
}