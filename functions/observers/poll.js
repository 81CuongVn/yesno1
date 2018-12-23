const Spark = require("sparkbots")
const Observer = Spark.observer("poll")

const {db} = require('/app/db.js')

Observer.code = async (client, message) => {
  
  if(message.content.startsWith('<@526189797711151114> ') || message.content.startsWith('<@!526189797711151114> ')) {
    
    const doc = db.collection('polls').doc(message.channel.id)
    
    const docx = await doc.get()
    
    if(docx.data()) return message.channel.send('A poll is currently open. Use `yn.close` to close it.')
    
    if(!message.channel.permissionsFor(message.guild.me).has('ADD_REACTIONS')) throw message.channel.send('I need the Add Reactions permission!')
    if(!message.channel.permissionsFor(message.guild.me).has('EMBED_LINKS')) throw message.channel.send('I need the Embed Links permission!')
    if(!message.channel.permissionsFor(message.guild.me).has('MANAGE_MESSAGES')) throw message.channel.send('I need the Manage Messages permission!')

    await message.channel.send(`${message.author.tag} just started a poll.`)

    let q = message.content.replace('<@526189797711151114> ', '').replace('<@!526189797711151114> ', '')

    let msg = await message.channel.send({
      "embed": {
        "title": `Poll: ${q}`
      }
    })

    await msg.react('526209014254665759')
    await msg.react('526209037361086526')

    await msg.pin()

    message.channel.lastMessage.delete()
    
    message.delete()

    doc.set({
      'message': msg.id,
      'q': q
    })
    
  }
}

module.exports = Observer