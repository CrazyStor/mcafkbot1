const http = require("http");
const mineflayer = require('mineflayer')
const mc = require('minecraft-protocol');
const AutoAuth = require('mineflayer-auto-auth');

let bot;
function createBot() {
try {
  bot = mineflayer.createBot({
    host: 'play.friendlycraft.net', 
    version: false, // U can replace with 1.16.5 for example, remember to use ', = '1.16.5'
    username: process.env.name,
    plugins: [AutoAuth],
    AutoAuth: process.env.pass
  })
  bot.on('messagestr', (sender, message) => {
    console.log(`1.${sender} said "${message}"`)
    if(sender.includes("You have successfully logged")){
      
      bot.chat("/ajqueue:server ElytraBOX")
    }
  });
  bot.on('windowOpen', (windows) => {
    const botInventory = bot.inventory.slots;
    for (let i = 0; i < botInventory.length; i++) {
      const item = botInventory[i];
      if (item) {
        // Deposit the item into the chest
        try {
          bot.moveSlotItem(i + 45, 9);
          setTimeout(() => {
            bot.clickWindow(12,0,0)
          }, 2000);
          //bot.chat(`deposited ${item.amount} ${item.name}`)
        } catch (err) {
          console.log(err);
        }
      }
    }
    setTimeout(() => {
      if(windows[9].name.includes("Not")){
        bot.clickWindow(12,0,0)
      }
    }, 1000);
  });
  bot.on('kicked', (reason, loggedIn) => {
    if (loggedIn) {
      console.log('Bot was kicked while logged in. Restarting...');
      bot.end();
    } else {
      console.log('Bot disconnected. Restarting...');
      bot.end();
    }
  });
  bot.on('error', (err) => {
    console.error('Bot error:', err);
    console.log('Restarting bot...');
    bot.end();
  });

  bot.on('end', () => {
    console.log('Bot ended unexpectedly. Restarting...');
    createBot();
  });
} catch (err) {
  console.error('Error while creating the bot:', err);
  console.log('Restarting bot...');
  bot.end(); // Restart the bot on initialization error
}
}
createBot()
