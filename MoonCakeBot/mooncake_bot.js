const Discord = require('discord.js')
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES']})
require('dotenv').config({ path: '.env' });

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
})

client.on("messageCreate", msg => {
    if(!msg.content.startsWith(process.env.prefix)){
        return
    }

    if(msg.content === "!help"){
        msg.channel.send({embeds: [createEmbed(("!help - Provides users with a list of valid commands.\n!menu - Displays a menu for users to view the available mooncakes.\n!order - This command allows users to place their orders.\n!summary - Provides a list of all previous orders a user has made."), "help")]})
    }
    if(msg.content === "!menu"){
        msg.channel.send({embeds: [createEmbed("We have 3 Different flavors available: \n\n• White Lotus \n• Red Bean \n• Green Tea", "Menu")]})
    }

})

function createEmbed(message, title){
    return new Discord.MessageEmbed()
    .setColor('#DE5E1F')
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
}

client.login(process.env.TOKEN)