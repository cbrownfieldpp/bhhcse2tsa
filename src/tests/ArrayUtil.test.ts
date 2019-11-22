import ArrayUtil from '../lib/ArrayUtil';
import * as chai from 'chai';

const expect = chai.expect;

describe('ArrayUtil Class', () => {
    describe('randomSubset()', () => {
        it('number elements', () => {
            const testArray: number[] = [1,2,3,4];
            const subset = ArrayUtil.randomSubset(testArray, 1);
            expect(typeof(subset[0])).to.equal('number');
        });

        it('string elements', () => {
            const testArray: String[] = ['a','b','c','d'];
            const subset = ArrayUtil.randomSubset(testArray, 1);
            expect(typeof(subset[0])).to.equal('string');
        });

        it('object elements', () => {
            const testArray: any[] = [{ a: 'a' }, { b: 'b' }, { c: 'c' }, { d: 'd', e: 'e' }]
            const subset = ArrayUtil.randomSubset(testArray, 1);
            expect(typeof(subset[0])).to.equal('object');
        });

        it('return array is of size cnt when array size > cnt', () => {
            const testArray: any[] =  [1, 'b', { c: 'c' }, { d: 'd', e: 'e' }]
            const subset = ArrayUtil.randomSubset(testArray, 2);
            expect(subset.length).to.equal(2);
        })

        it('return array is of size cnt when array size = cnt', () => {
            const testArray: any[] =  [1, 'b', { c: 'c' }]
            const subset = ArrayUtil.randomSubset(testArray, 3);
            expect(subset.length).to.equal(3);
        })

        it('return array is of size array.length when array size < cnt', () => {
            const testArray: any[] =  [1, 'b', { c: 'c' }, { d: 'd', e: 'e' }]
            const subset = ArrayUtil.randomSubset(testArray, 5);
            expect(subset.length).to.equal(4);
        })

        it('this test should fail and prevent deployment', () => {
            expect(true).to.equal(false);
        });

    });
});