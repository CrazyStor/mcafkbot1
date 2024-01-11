const express = require("express");
const http = require("http");
const mineflayer = require('mineflayer')
const mc = require('minecraft-protocol');
const AutoAuth = require('mineflayer-auto-auth');

let bot;
let bot2;

const app = express();
app.use(express.json());

app.get("/callFunction", (req, res) => {
  const inputText = req.query.text; // Get the text from the query parameter
  if(inputText == "look"){
    lookAtPlayerByName("CrazyStor")
    lookAtPlayerByName2("CrazyStor")
  }else if(inputText == "trade"){
    trade1()
    trade2()
  }else{
    test(inputText)
  }
  res.send("Function called with input: " + inputText); // Send a response
});
app.get("/", (_, res) => res.sendFile(__dirname + "/index.html"));
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.repl.co/`);
}, 224000);

function test(string) {
  console.log("lol musaobs" + string)
  bot.chat(string)
}
function lookAtPlayerByName(playerName) {
  const player = bot.players[playerName];

  if (player) {
    let playerLocation = player.entity.position;
    bot.lookAt(playerLocation);
  }
}

function lookAtPlayerByName2(playerName) {
  const player = bot2.players[playerName];

  if (player) {
    let playerLocation = player.entity.position;
    bot2.lookAt(playerLocation);
  }
}

function trade1(){
  bot.chat("/trade CrazyStor")
}

function trade2(){
  bot2.chat("/trade CrazyStor")
}

function createBot() {
try {
  bot = mineflayer.createBot({
    host: 'blissmc.org', 
    version: false, // U can replace with 1.16.5 for example, remember to use ', = '1.16.5'
    username: 'Manucha',
    plugins: [AutoAuth],
    AutoAuth: '123123123'
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

function createBot2() {
try {
  bot2 = mineflayer.createBot({
    host: 'blissmc.org', 
    version: false, // U can replace with 1.16.5 for example, remember to use ', = '1.16.5'
    username: 'Kamazi',
    plugins: [AutoAuth],
    AutoAuth: '123123123'
  })
  bot2.on('windowOpen', (windows) => {
    const botInventory = bot2.inventory.slots;
    for (let i = 0; i < botInventory.length; i++) {
      const item = botInventory[i];
      if (item) {
        // Deposit the item into the chest
        try {
          bot2.moveSlotItem(i + 45, 9);
          //bot.chat(`deposited ${item.amount} ${item.name}`)
        } catch (err) {
          console.log(err);
        }
      }
    }
    setTimeout(() => {
      if(windows[9].name.includes("Not")){
        bot2.clickWindow(12,0,0)
      }
    }, 1000);
  });
  bot2.on('messagestr', (sender, message) => {
    console.log(`2.${sender} said "${message}"`)
    if(sender.includes("You have successfully logged")){
      
      bot2.chat("/ajqueue:server ElytraBOX")
    }
  })
  bot2.on('kicked', (reason, loggedIn) => {
    if (loggedIn) {
      console.log('Bot2 was kicked while logged in. Restarting...');
      bot2.end();
    } else {
      console.log('Bo2t disconnected. Restarting...');
      bot2.end();
    }
  });

  bot2.on('error', (err) => {
    console.error('Bot2 error:', err);
    console.log('Restarting bot...');
    bot2.end();
  });

  bot2.on('end', () => {
    console.log('Bot2 ended unexpectedly. Restarting...');
    createBot2();
  });
} catch (err) {
  console.error('Error while creating the bot2:', err);
  console.log('Restarting bot...');
  bot2.end(); // Restart the bot on initialization error
}
}
createBot()
createBot2()

