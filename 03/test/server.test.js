const assert = require('node:assert');
const axios = require('axios');
const server = require('../server');

describe('server tests', () => {
    before('server launch', (done) => {
        server.listen(3000, done);
    });
    
    after('terminate server', (done) => {
        server.close(done);
    });

    it('replace string', async () => {
        const response = await axios.post(
            'http://localhost:3000?from=banana&to=orange',
            'banana apple peach strawberry apple banana apple peach'
        );

        assert.strictEqual(response.status, 200);
        assert.strictEqual(
            response.data, 
            'orange apple peach strawberry apple orange apple peach'
        );
    });

    it('throws error', async () => {
        const response = await axios(
            'http://localhost:3000?from=banana&to=orange',
            {
                method: 'POST',
                data: 'throw',
                validateStatus: () => true,
            }
        );

        assert.strictEqual(response.status, 500);
        assert.strictEqual(
            response.data, 
            'internal error'
        );
    });
});