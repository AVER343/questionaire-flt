import { AuthService } from 'src/auth/auth.service';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { Response } from 'express';
import { LoginUserDTO } from './dto/login.dto';
import { Users } from '@prisma/client';
import { MailingProducerService } from 'src/communication/email/message.producer.service';
export declare class AuthController {
    private authService;
    private readonly messageProducerService;
    constructor(authService: AuthService, messageProducerService: MailingProducerService);
    signup(data: CreateUserDTO, res: Response): Promise<void>;
    login(data: LoginUserDTO, res: Response): Promise<Users>;
    logout(res: Response): Promise<void>;
    changePassword(username: string, res: Response): Promise<string>;
    verifyOTP(username: any): Promise<void>;
}
