/**
 * Required External Modules
 */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'http';

import router from './routes';

import { ErrorFormat } from './apps/types';
import { currentTime, errorHandler } from './utils';

/**
 * Set timezone
 */
process.env.TZ = 'Asia/Jakarta';

/**
 * App Variables
 */
if (!process.env.PORT) {
    console.log(`Server exit without set PORT`);
    process.exit(1);
}

const PORT: number | string = process.env.PORT || 9000;
const app: Application = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

// handle 404
app.use((_req: Request, res: Response) => {
    return res.status(404).json({
        success: true,
        data: {},
        message: 'API Route Not Found!',
    });
});

// handle Any error here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: ErrorFormat, _req: Request, res: Response, _next: NextFunction): Response => errorHandler(err, res));

// ensures we close the server in the event of an error.
const setupCloseOnExit = (server: Server) => {
    async function exitHandler(options = { exit: false }) {
        server.close(() => {
            if (options.exit) {
                console.info(`Server successfully closed at ${currentTime}`);
                process.exit(1);
            }
        });
    }

    // do something when app is closing
    process.on('exit', exitHandler);
    // catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, { exit: true }));
    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
    process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
    // catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
};

/**
 * Server Activation
 */
export const startServer = async () => {
    return new Promise((resolve) => {
        const server = app.listen(PORT, () => {
            console.info(
                `⚡️[${process.env.NODE_ENV}-server]: Server is running at ${process.env.APP_URL}:${PORT} - ${currentTime}`,
            );
            // this ensures that we properly close the server when the program exists
            setupCloseOnExit(server);
            // resolve the whole promise with the express server
            resolve(server);
        });
    });
};
