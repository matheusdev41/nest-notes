import { User } from 'src/modules/user/entities/user.entity';
import type { Request } from 'express';

export class AuthRequestModel extends Request {
    user: User;
}