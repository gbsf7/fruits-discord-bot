import { z } from "zod";

const envSchema = z.object({
  DISCORD_TOKEN: z.string().min(1),
  DISCORD_CLIENT_ID: z.string().min(1),
  DISCORD_DEV_GUILD_ID: z.string().min(1).optional(),
  FRUITS_API_BASE_URL: z.url().optional(),
  FRUITS_API_TOKEN: z.string().min(1).optional(),
  FRUITS_WEBHOOK_SECRET: z.string().min(1).optional()
});

export type AppEnv = z.infer<typeof envSchema>;

export function loadEnv(source: NodeJS.ProcessEnv = process.env): AppEnv {
  const result = envSchema.safeParse(source);

  if (!result.success) {
    console.error("Invalid environment configuration:", z.prettifyError(result.error));
    throw new Error("Invalid environment configuration.");
  }

  return result.data;
}
