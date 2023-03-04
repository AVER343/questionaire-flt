import { Users } from '@prisma/client';
import { Response } from 'express';
import { GetUserDTO } from './dto/getUser.dto';
import { UserService } from './user.service';
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    getUser(params: GetUserDTO, response: Response): Promise<Users | null>;
}
