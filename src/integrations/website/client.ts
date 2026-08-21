/**
 * Keep Discord commands/services dependent on this interface instead of direct fetch calls.
 * Expand this contract when the Fruits website API is defined.
 */
export interface FruitsWebsiteClient {
  healthCheck(): Promise<boolean>;
}
