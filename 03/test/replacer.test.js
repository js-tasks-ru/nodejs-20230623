const assert = require('node:assert');
const sinon = require('sinon');
const ReplacerStream = require('../replacer');

describe('replacer stream tests', () => {
    it('test #1', (done) => {
        const replacerStream = new ReplacerStream({
            from: 'banana',
            to: 'pineapple'
        });

        const onData = sinon.spy();

        replacerStream.on('data', onData);

        replacerStream.on('close', () => {
            assert.strictEqual(
                onData.getCall(0).args[0].toString(), 
                'pineapple apple peach strawberry apple pineapple apple peach'
            );
            assert.strictEqual(
                onData.getCall(1).args[0].toString(), 
                'orange pineapple'
            );

            assert.strictEqual(onData.callCount, 2);
            done();
        });

        replacerStream.write('banana apple peach strawberry apple banana apple peach');
        replacerStream.write('orange banana');
        replacerStream.end();
    });
});
