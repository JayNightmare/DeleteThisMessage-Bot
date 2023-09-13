const { Client, GatewayIntentBits } = require(`discord.js`);
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const prefix = "k";

const badWords = ["Darth Vader", "Bart Simpson", "Donald Trump", "Barack Obama"];


client.on("ready", () => {
    console.log("Bot is online");
    client.user.setActivity(`I am Alive`, { type: "READING" });
})

client.on("messageCreate", (message) => {
    const user = message.author; // Users information
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    let amount = parseInt(args[0]);

    function tooManyMessages() {
        return message.channel.bulkDelete(2)
            .catch((err) => {
                console.error(err);
            });
    }

    function purgeMessages() {
        return message.channel.bulkDelete(amount + 2)
            .catch((err) => {
                console.error(err);
            });
    }

    function killBotMessages() {
        return message.channel.bulkDelete(2)
    }

    for (let x = 0; x < 5; x++) {
        if (message.content.includes(badWords[x])) {
            message.channel.send("PREPARE TO GET BANISHED TO THE SHADOW REALM");

            setTimeout(killBotMessages, 5000);
        }
    }

    if (command === "kill") {
        if (isNaN(amount)) { // no amount given
            console.log("No messages have been deleted\n" + amount);
            message.channel.send(`<@${user.id}>` + ": No messages have been deleted as no number has been specified");

            setTimeout(tooManyMessages, 5000);
        }

        else if (amount < 1 || amount > 11) { // There are too many or not enough messages to delete
            console.log(`${user.username}` + ": Too many messages were selected\n" + amount);
            message.channel.send(`<@${user.id}>` + " I cannot delete that many messages. Please set a number between **1 - 11**");

            setTimeout(tooManyMessages, 5000);
        }

        else { // will delete the messages
            console.log(`${user.username}` + ': Messages deleted: "' + amount + '"')
            message.channel.send(`<@${user.id}>` + '\nAmount of messages that are going to be deleted: **' + amount + '**\nStandby for deletion...');

            setTimeout(purgeMessages, 5000);
        }
    }
})

client.login("bot token");