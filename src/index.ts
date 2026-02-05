import { Client } from './core/client';
import { EngineResource } from './resources/engine';

export class TwelveLabs {
  private client: Client;
  public engine: EngineResource;

  constructor(apiKey: string) {
    this.client = new Client(apiKey);
    this.engine = new EngineResource(this.client);
  }
}

export { TwelveLabsError, APIError } from './core/error';
export * from './resources/engine';
