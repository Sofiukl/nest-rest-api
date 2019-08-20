import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, ManyToOne, BeforeInsert, BeforeUpdate} from 'typeorm';
import { IdeaRO } from './idea.dto';
import { UserEntity } from '../user/user.entity';


@Entity('idea')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @CreateDateColumn()
  updated: Date;

  @Column('text')
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'boolean',
    default: true  
  })
  isActive: boolean;

  @ManyToOne(type => UserEntity, author => author.ideas)
  author: UserEntity
  
  @BeforeInsert()
  beforeInsertActions() {
    this.isActive = true;
  }
  
  @BeforeUpdate()
  beforeUpdateActions() {
    this.updated = new Date();
  }

  toResponseObject(): IdeaRO {
    const { id, name, description, isActive, created, updated, author } = this;
    const responseObject: IdeaRO = {
      id,
      name,
      description,
      isActive,
      created,
      updated,
      author
    };
    return responseObject;
  }
}