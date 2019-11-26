import express from 'express';
import * as functions from 'firebase-functions';

/**Interviewer Note: A little middleware for preventing unwanted users from POST'ing data 
 * to my datastore. 
 */
export const isApiAuthenticated = (req: express.Request, res: express.Response, next: any) => {
    const apikey = req.headers.apikey;
    if(apikey === functions.config().data.apikey){
        return next();
    } else {
        return res.status(403).send({
            message: "A valid 'apikey' header is required to POST data to this project."
        })
    }
}