import {IsNotEmpty} from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { UserRO } from '../user/user.dto';

export class IdeaRO {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    created: Date;
    updated?: Date;
    author?: UserRO;
}

export class IdeaDTO {
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    author: UserEntity;

    @IsNotEmpty()
    isActive: boolean
}