require('dotenv').config({ path: '.env' });

const Discord = require('discord.js')
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES']})

client.once('ready', () => {
    console.log("Connected as " + client.user.tag)
})

const commandPrefix = "!"

client.on("messageCreate", msg => {
    if(!msg.content.startsWith(commandPrefix)) return
    const command = msg.content.substring(1);

    if(command === "help"){
        msg.channel.send({embeds: [createEmbed(("!help - Provides users with a list of valid commands.\n!menu - Displays a menu for users to view the available mooncakes.\n!order - This command allows users to place their orders.\n!summary - Provides a list of all previous orders a user has made."), "help")]})
    }
    if(command === "menu"){
        msg.channel.send({embeds: [createEmbed("We have 3 Different flavors available: \n\n• White Lotus \n• Red Bean \n• Green Tea", "Menu")]})
    }
    if(command === "order"){
      msg.channel.send(getOrderButton());
    }

    if(command === "summary"){
        msg.channel.send({embeds: []})
    }
})

client.on('interactionCreate', async interaction =>{
  if(interaction.isButton && interaction.customId === "Order"){
    await interaction.showModal(createModal(),{
      client: client,
      interaction: interaction
    })
  }

  if(interaction.isModalSubmit() && interaction.customId === "OrderModal"){
    const quantityWL = interaction.fields.getTextInputValue("WhiteLotus")
    const quantityRB = interaction.fields.getTextInputValue("RedBean")
    const quantityGT = interaction.fields.getTextInputValue("GreenTea")
    console.log(quantityWL, quantityRB, quantityGT)
    await interaction.reply({content: "Your Order was successful."})
  }
})


function getOrderButton(){
  return {content: 'Click the button below to order some mooncake!',
  //ephemeral: true,
  components:[{ type: 1, components: [{
    type: 2, custom_id: "Order", label: 'Order', style: 'PRIMARY',
  }]}]}
}

function createEmbed(message, title){
    return new Discord.MessageEmbed()
    .setColor('#DE5E1F')
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
}

function createModal(){
    const modal = new Discord.Modal()
    .setCustomId("OrderModal")
    .setTitle("Order Mooncakes from us")
    components = [
        {
          type: 1,
          components: [{
            type: 4, 
            custom_id: 'WhiteLotus',
            label: `White Lotus Mooncakes`,
            style: 1,
            min_length: 1,
            max_length: 3,
            placeholder: '0',
            required: true
          }],
        },
        {
          type: 1,
          components: [{
            type: 4,
            custom_id: 'RedBean',
            label: `Red Bean Mooncakes`,
            style: 1,
            min_length: 1,
            max_length: 3,
            placeholder: '0',
            required: true
          }]
        },
        {
          type: 1,
          components: [{
            type: 4,
            custom_id: 'GreenTea',
            label: `Green Tea Mooncakes`,
            style: 1,
            min_length: 1,
            max_length: 3,
            placeholder: '0',
            required: true
          }]
        }]
    modal.addComponents(components)
    return modal
}

client.login(process.env.TOKEN)