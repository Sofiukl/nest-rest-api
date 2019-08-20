import { IdeaDTO, IdeaRO } from "./idea.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IdeaEntity } from "./idea.entity";
import { HttpException, HttpStatus } from "@nestjs/common";

export class IdeaService {

    constructor(
        @InjectRepository(IdeaEntity)
        private ideaRepository: Repository<IdeaEntity>
    ) {}

    async createIdea(ideaData: IdeaDTO): Promise<any> {
        const idea: IdeaEntity = await this.ideaRepository.create(ideaData);
        await this.ideaRepository.save(idea);

        const ideas: IdeaEntity[] = await this.ideaRepository.find({
            where : {id : idea.id},
            relations: ['author'],
        });
        return this.toResponseObject(false, this.toIdeaResponseObject(ideas));
    }

    async getIdeas(id: string): Promise<any> {
        const ideas: IdeaEntity[] = await this.ideaRepository.find({
            where : {id : id},
            relations: ['author'],
        });

        return this.toResponseObject(false, this.toIdeaResponseObject(ideas));
    }

    async getUserIdeas(userId: string): Promise<any> {
        const ideas: IdeaEntity[] = await this.ideaRepository.find({
            where : {author : userId},
            relations: ['author'],
        });
        
        return this.toResponseObject(false, this.toIdeaResponseObject(ideas));
    }

    async updateIdea(
        id: string,
        userId: string,
        ideaData: Partial<IdeaDTO>,
        ): Promise<any> {
        
        let error = false;

        let ideaDb = await this.ideaRepository.findOne({
            where: { id },
            relations: ['author'],
        });

        if(!ideaDb) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }

        this.ensureOwnership(ideaDb, userId);

        await this.ideaRepository.update({id}, ideaData);

        const updatedIdeas: IdeaEntity[] = await this.ideaRepository.find({
            where : {id : id},
            relations: ['author'],
        });

        return this.toResponseObject(false, this.toIdeaResponseObject(updatedIdeas));
    }

    toIdeaResponseObject(ideas: IdeaEntity[]): IdeaRO {

        if (ideas.length == 0) {
            return new IdeaRO();
        }
        const responseObject: IdeaRO = {
          ...ideas[0],
          author: ideas[0].author ? ideas[0].author.toResponseObject(false) : null
       }
       return responseObject;
    }

    toResponseObject(error: boolean, result: IdeaRO) {
        return {error, result: result.length ==0 ? result : [result]}
    }
    private ensureOwnership(idea: IdeaEntity, userId: string) {
        if (idea.author.id !== userId) {
          throw new HttpException('Incorrect User', HttpStatus.UNAUTHORIZED);
        }
      }
}