import { Injectable, NestMiddleware } from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';
import * as express from 'express';
import * as path from 'path';

@Injectable()
export class StaticMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const app = express();
        app.use('/images', express.static(path.resolve(__dirname, '..', 'static', 'images')));
        app.use('/previews', express.static(path.resolve(__dirname, '..', 'static', 'previews')));
        app(req, res, next);
    }
}