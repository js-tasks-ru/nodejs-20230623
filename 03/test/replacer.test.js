const assert = require('node:assert');
const sinon = require('sinon');
const ReplacerStream = require('../replacer');

describe('Replacer Stream tests', () => {
    it('should replace "apple" to "banana"', (done) => {
        const replacer = new ReplacerStream({
            from: 'cherry',
            to: 'lemon'
        });

        const onData = sinon.spy();

        replacer.on('data', onData);

        replacer.on('end', () => {
            assert.strictEqual(onData.callCount, 2);

            assert.strictEqual(onData.getCall(0).args.toString(), 'apple lemon tomato watermelon banana pineapple');
            assert.strictEqual(onData.getCall(1).args.toString(), 'lemon');
            
            done();
        });

        replacer.write('apple cherry tomato watermelon banana pineapple cher');
        replacer.write('ry');
        replacer.end();
    });

    it('should replace "apple" to "banana" on one string', (done) => {
        const replacer = new ReplacerStream({
            from: 'cherry',
            to: 'lemon'
        });

        const onData = sinon.spy();

        replacer.on('data', onData);

        replacer.on('end', () => {
            assert.strictEqual(onData.callCount, 2);

            assert.strictEqual(
                onData.getCall(0).args.toString(), 
                'apple lemon tomato watermelon banana'
            );
            assert.strictEqual(
                onData.getCall(1).args.toString(), 
                'pineapple'
            );
            
            done();
        });

        replacer.end('apple cherry tomato watermelon banana pineapple');
    });

    it('should replace "apple" to "cherry" and ignore substrings', (done) => {
        const replacer = new ReplacerStream({
            from: 'apple',
            to: 'cherry'
        });

        const onData = sinon.spy();

        replacer.on('data', onData);

        replacer.on('end', () => {
            assert.strictEqual(onData.callCount, 2);

            assert.strictEqual(
                onData.getCall(0).args.toString(), 
                'cherry cherry tomato watermelon banana'
            );
            assert.strictEqual(
                onData.getCall(1).args.toString(), 
                'pineapple'
            );
            
            done();
        });

        replacer.end('apple cherry tomato watermelon banana pineapple');
    });
});
