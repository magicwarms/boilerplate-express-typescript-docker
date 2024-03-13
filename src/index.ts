import * as dotenv from 'dotenv';
dotenv.config();

import { startServer } from './server';

/**
 * Setup server connection here
 */
const runServer = async () => {
    console.info('Server is starting now!');
    startServer()
        .then(() => console.log(`${process.env.APP_NAME} is started`))
        .catch((err) => console.error(err));
};

/**
 * Start server
 */
runServer();
