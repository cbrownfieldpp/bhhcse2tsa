export default class ArrayUtil {

    /**
     * Returns a randomly ordered subset of 'arr' of size 'cnt'. 
     * @param arr 
     * @param cnt
     * @returns
     */
    static randomSubset = (arr: any[], cnt: Number): any[] => {
        /** Typically declare all variables at the top of a function in Typescript */
        const tmp = [];

        /** Base cases next. */
        if(arr.length <= cnt){
            return arr;
        }

        /** Main algorithm. */
        while(tmp.length < cnt){
            tmp.push(arr.splice(Math.floor(Math.random()*arr.length), 1)[0]);
        }

        return tmp;
    }

}