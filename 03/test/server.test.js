const assert = require('node:assert');
const axios = require('axios');
const server = require('../server');

describe('server tests', () => {
    before((done) => {
        server.listen(8081, done);
    });

    after((done) => {
        server.close(done);
    });

    it('should replace "apple" to "cherry"', async () => {
        const response = await axios.post(
            'http://localhost:8081',
            'apple lemon tomato watermelon banana pineapple', 
            {
                params: {
                    from: 'apple',
                    to: 'cherry',
                },
                responseType: 'text'
            }
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data, 'cherry lemon tomato watermelon bananapineapple');
    });
});