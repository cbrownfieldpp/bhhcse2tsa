
/** An array utility class. */
export default class ArrayUtil {

    /**
     * Returns a randomly ordered subset of 'arr' of size 'cnt'. 
     * @param arr an array of any type of elements.
     * @param cnt a number, if greater than or equal to array size, method will return unmodified array. 
     * @returns a randomly ordered subset of array of size 'cnt'
     */
    static randomSubset = (arr: any[], cnt: Number): any[] => {
        const tmp = [];
        if(arr.length <= cnt){
            return arr;
        }
        while(tmp.length < cnt){
            tmp.push(arr.splice(Math.floor(Math.random()*arr.length), 1)[0]);
        }
        return tmp;
    }

}