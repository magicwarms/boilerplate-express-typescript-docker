import { Response } from 'express';
import { IS_DEV } from './const';

export const errorHandler = (err: Error, res: Response) => {
    if (err.name === 'StructError' || err.name === 'UnprocessableEntityError') {
        return res.status(422).json({
            success: false,
            data: {
                cause: err.cause,
                message: err.message,
            },
            message: `validation error`,
        });
    }
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            success: false,
            data: {},
            message: err.message,
        });
    }
    if (err.stack?.includes('UnauthorizedError:')) {
        return res.status(401).json({
            success: false,
            data: IS_DEV ? { message: err.message, stack: err.stack } : {},
            message: `unauthorized`,
        });
    }
    console.error({ err });
    return res.status(500).json({
        success: false,
        data: IS_DEV ? { message: err.message, stack: err.stack } : {},
        message: `internal server error`,
    });
};