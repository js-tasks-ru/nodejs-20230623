const axios = require('axios');
const assert = require('node:assert');
const server = require('../server');

describe('server tests', () => {
    before((done) => {
        server.listen(3000, done);
    });

    it('should replace strings', async () => { // === return new Promise()
        const response = await axios('http://localhost:3000', {
            method: 'POST',
            params: {
                from: 'apple',
                to: 'banana'
            },
            data: 'cherry apple watermelon strawberry orange apple'
        });

        assert.strictEqual(
            response.data, 
            'cherry banana watermelon strawberry orange banana'
        );
    });

    it('should throw error', async () => { // === return new Promise()
        const response = await axios('http://localhost:3000', {
            method: 'POST',
            params: {
                from: 'apple',
                to: 'banana'
            },
            data: 'throw error',
            validateStatus: () => true,
        });

        assert.strictEqual(response.status, 500);
        assert.strictEqual(response.data, 'internal error');
    });

    after((done) => {
        server.close(done);
    });
});