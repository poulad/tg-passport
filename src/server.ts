import * as express from 'express';
import { NextFunction, Request, Response } from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import { ApiResponse } from './models/api-response';
import { init } from './services/update-getter';

// noinspection JSUnusedGlobalSymbols
export class Server {
    public app: express.Application;

    // noinspection JSUnusedGlobalSymbols
    public static async bootstrap() {
        const server = new Server();

        await server.configureApp();
        await server.registerRoutes();
        server.registerErrorHandler();

        if (process.env.NODE_ENV === 'development') {
            init()
                .catch(console.error);
        } else {
            // ToDo set webhook
        }

        return server;
    }

    constructor() {
        this.app = express();
    }

    private async configureApp() {
        this.app.use(morgan(<any>'dev'));

        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());

        this.app.use(express.static(__dirname + '/public', {dotfiles: 'ignore'}));
    }

    private async registerRoutes() {
        const router = express.Router({
            caseSensitive: false
        });

        router.all('**', respondWith404);

        this.app.use(router);
    }

    private registerErrorHandler() {
        this.app.use(respondWith500);
    }
}

function respondWith404(req: Request, res: Response) {
    res.statusCode = 404;
    res.json(new ApiResponse('Not Found'));
}

function respondWith500(err: any, req: Request, res: Response, next: NextFunction) {
    const errorPayload = new ApiResponse('Unexpected Error');
    res.statusCode = 500;

    if (err) {
        errorPayload.error = err.message || errorPayload.error;
        res.statusCode = err.status || res.statusCode;
    }

    res.json(errorPayload);
}
