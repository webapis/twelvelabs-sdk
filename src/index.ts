import { Client } from './core/client';
import { EngineResource } from './resources/engine';
import { IndexResource } from './resources/index';
import { TaskResource } from './resources/task';

/**
 * The main entry point for the Twelve Labs SDK.
 * @category Core
 */
export class TwelveLabs {
  private client: Client;
  /**
   * The resource for interacting with the Engines API.
   */
  public engine: EngineResource;
  /**
   * The resource for interacting with the Indexes API.
   */
  public index: IndexResource;
  /**
   * The resource for interacting with the Tasks API.
   */
  public task: TaskResource;

  /**
   * Creates a new Twelve Labs client.
   * @param apiKey Your Twelve Labs API key.
   */
  constructor(apiKey: string) {
    this.client = new Client(apiKey);
    this.engine = new EngineResource(this.client);
    this.index = new IndexResource(this.client);
    this.task = new TaskResource(this.client);
  }
}

export { TwelveLabsError, APIError } from './core/error';
export * from './resources/engine';
export * from './resources/index';
export * from './resources/task';
