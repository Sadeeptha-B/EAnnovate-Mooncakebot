require('dotenv').config();

const {Client, Intents}= require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () =>{
    console.log("Connected as " + client.user.tag)

    client.user.setActivity("YouTube", {type:"WATCHING"})
    client.guilds.cache.forEach((guild) =>{
        console.log(guild.name)
        guild.channels.cache.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`)
        })
        
        let generalChannel = client.channels.cache.get(process.env.GENERAL_CHANNEL_ID)
        generalChannel.send("Hello World!")
    })
})

client.login(process.env.BOT_TOKEN)