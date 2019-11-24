import ArrayUtil from './lib/ArrayUtil';

/** Local scripting can go here. */
const subset: any[] = ArrayUtil.randomSubset([{ a: 'a'}, { b: 'b' }, { c: 'c'}, { d: 'd'}, { e: 'e' }], 3);
console.log("My ArrayUtil.randomSubset() called from local JS bundle: ", subset);