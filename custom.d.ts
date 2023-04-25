
declare namespace Express {
    export interface Request {
        user?: {
            isOwner: boolean;
        };
    }
}
