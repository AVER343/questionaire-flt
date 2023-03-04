import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from 'src/user/user.service';
export declare class CurrentUserMiddleware implements NestMiddleware {
    userService: UserService;
    constructor(userService: UserService);
    use(req: Request, res: Response, next: Function): Promise<void>;
}
