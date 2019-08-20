import {IsNotEmpty} from 'class-validator';

export class UserRO {
    id: string;
    username: string;
    token?: string;
}

export class UserDTO {
    
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}