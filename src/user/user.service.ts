import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import {InjectRepository} from "@nestjs/typeorm"
import { UserEntity } from "./user.entity";
import { UserDTO } from "./user.dto";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async read(username: string) {
        const user = await this.userRepository.findOne({
            where: {username}
        })
        return user.toResponseObject(true);
    }

    async register(data: UserDTO) {
        let user = await this.userRepository.findOne({
            where: {username: data.username}
        })
        if (user != null) {
            throw new HttpException('user already exist', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject(true);
    }
}