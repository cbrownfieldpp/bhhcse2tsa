import ArrayUtil from './lib/ArrayUtil';

/** Interviewer Note: I've added this method to display how bundle.js is being utilized to run localized JS on the client. 
 *  At https://cameronbrownfield-bhhcse2tsa.web.app, use the inspector in developer tools to observe the outputted 
 *  array subset generated from this example function. 
 */
const subset: any[] = ArrayUtil.randomSubset([{ a: 'a'}, { b: 'b' }, { c: 'c'}, { d: 'd'}, { e: 'e' }], 3);
console.log("My ArrayUtil.randomSubset() called from local JS bundle: ", subset);


/** Additional Local Scripts */

// ... 

/** End Additional Local Scripts */