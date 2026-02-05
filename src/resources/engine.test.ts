import { EngineResource } from './engine';
import { Client } from '../core/client';

// Mock the client to avoid making real API calls
jest.mock('../core/client');

describe('EngineResource.list', () => {
  it('should call the get method with the correct URL', async () => {
    const client = new Client('mock-api-key');
    const engineResource = new EngineResource(client);

    // Mock the get method to return a sample response
    const mockGet = jest.spyOn(client, 'get').mockResolvedValue({
      data: [{ id: 'marengo2.5', ready: true }],
    });

    await engineResource.list();

    // Assert that the get method was called with the correct endpoint
    expect(mockGet).toHaveBeenCalledWith('/engines');
  });
});
