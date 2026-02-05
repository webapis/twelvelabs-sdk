import {EngineResource} from './engine';
import {Client} from '../core/client';

jest.mock('../core/client');

// Use this naming convention: "ClassName.methodName"
describe('EngineResource.list', () => {
    it('should call the get method with the correct URL', async () => {
        const client = new Client('mock-api-key');
        const engineResource = new EngineResource(client);

        const mockGet = jest.spyOn(client, 'get').mockResolvedValue({
            data: [{id: 'marengo2.5', ready: true}],
        });

        await engineResource.list();

        expect(mockGet).toHaveBeenCalledWith('/engines');
    });

    it('should handle errors correctly', async () => {
        const client = new Client('mock-api-key');
        const engineResource = new EngineResource(client);

        const mockGet = jest.spyOn(client, 'get').mockRejectedValue(
            new Error('API Error')
        );

        await expect(engineResource.list()).rejects.toThrow('API Error');
    });
});