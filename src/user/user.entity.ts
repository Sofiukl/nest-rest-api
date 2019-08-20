  import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, OneToMany} from 'typeorm';
  
  import { UserRO } from './user.dto';
  import * as jwt from 'jsonwebtoken';
import { IdeaEntity } from '../idea/idea.entity';

  @Entity('user')
  export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    created: Date;
  
    @Column({
      type: 'text',
      unique: true,
    })
    username: string;
  
    @Column('text')
    password: string;

    @OneToMany(type => IdeaEntity, idea => idea.author, { cascade : true})
    ideas: IdeaEntity[];
    
    private get token(): string {
        const {id, username} = this;
        return jwt.sign({
            id,
            username,
        },
        process.env.SECRET,
        {expiresIn: '7d'},
        )
    }
    toResponseObject(showToken: boolean = false): UserRO {
      const { id, username, token } = this;
      const responseObject: UserRO = {
        id,
        username,
      };
      if (showToken) {
          responseObject.token = token;
      }
      return responseObject;
    }
  }