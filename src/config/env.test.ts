import { describe, expect, it } from "vitest";
import { loadEnv } from "./env.js";

describe("loadEnv", () => {
  it("accepts the minimum Discord configuration", () => {
    const env = loadEnv({
      DISCORD_TOKEN: "test-token",
      DISCORD_CLIENT_ID: "123456789"
    });

    expect(env.DISCORD_CLIENT_ID).toBe("123456789");
  });

  it("rejects missing Discord credentials", () => {
    expect(() => loadEnv({})).toThrow("Invalid environment configuration.");
  });
});
