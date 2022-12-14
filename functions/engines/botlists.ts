import {engine} from 'sparkbots'
const Engine = engine("botlists")
export = Engine

import {handle} from 'blapi'

Engine.code = (client) => {

  try {
    // @ts-ignore
    handle(client, {
      'botlist.space': process.env.bls,
      'bots.ondiscord.xyz': process.env.bod,
      'botsfordiscord.com': process.env.bfd,
      'discordextremelist.xyz': process.env.del,
      'discord.bots.gg': process.env.dbgg,
      'discordbotlist.com': process.env.dblc,
      'discord.boats': process.env.dboats
    }, 3)

  } catch (e) {
    console.error(e)
  }
  
}
