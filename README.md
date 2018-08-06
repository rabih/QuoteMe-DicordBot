Welcome to my XDA simulator.

Prerequisites:
NPM installed

Steps:
Create a file called auth.json and insert the following lines
with your auth token:

{
   "token": "<your-token-goes-here>"
}

From there, run the following commands:
npm install https://github.com/woor/discord.io/tarball/gateway_v6
npm install discord.io winston --save
node bot.js
