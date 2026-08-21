import {
  type ChatInputCommandInteraction,
  SlashCommandBuilder
} from "discord.js";

export const pingCommand = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check whether the Fruits bot is responsive."),

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply({ content: "Pong!", ephemeral: true });
  }
};
