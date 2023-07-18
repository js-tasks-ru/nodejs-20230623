const assert = require('node:assert');
const sinon = require('sinon');
const Replacer = require('../replacer');

describe('replacer tests', () => {
    it('should replace apple to banana', (done) => {
        const r = Replacer.createReplacerStream({ from: 'apple', to: 'watermelon' });

        const onData = sinon.spy();

        r.on('data', onData);

        r.on('end', () => {
            assert.strictEqual(onData.callCount, 2);

            assert.strictEqual(
                onData.getCall(0).args[0].toString(), 
                'watermelon banana watermelon'
            );
            assert.strictEqual(
                onData.getCall(1).args[0].toString(), 
                'cherry strawberry orange'
            );

            done();
        });

        r.write('apple banana apple');
        r.write('cherry strawberry orange');
        r.end();
    });
});
