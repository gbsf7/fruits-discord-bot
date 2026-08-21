import { Events } from "discord.js";
import { loadEnv } from "./config/env.js";
import { pingCommand } from "./discord/commands/ping.js";
import { createDiscordClient } from "./discord/create-client.js";

const env = loadEnv();
const client = createDiscordClient();

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Fruits Discord Bot connected as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  if (interaction.commandName === pingCommand.data.name) {
    await pingCommand.execute(interaction);
  }
});

await client.login(env.DISCORD_TOKEN);
