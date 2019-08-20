import { Controller, Post, Body, Get, Param, Put, UseGuards } from "@nestjs/common";
import { IdeaService } from "./idea.service";
import { IdeaDTO } from "./idea.dto";
import { User } from "../user/user.decorator";
import { AuthGuard } from "../shared/auth.guard";

@Controller()
export class IdeaController {

    constructor(private ideaService: IdeaService) {}

    @Post('api/ideas')
    async createIdea(@Body() ideaData: IdeaDTO) {
        return await this.ideaService.createIdea(ideaData);
    }

    @Get('api/ideas/:id')
    async getIdeas(@Param('id') id: string) {
        return this.ideaService.getIdeas(id);
    }

    @Put('api/ideas/:id')
    @UseGuards(new AuthGuard())
    async updateIdea(@Param('id') id: string, @User('id') userId: string, @Body() idea: IdeaDTO) {
        return this.ideaService.updateIdea(id, userId, idea);
    }

    @Get('api/ideas')
    @UseGuards(new AuthGuard())
    async getUsersIdea(@User('id') userId: string) {
        return this.ideaService.getUserIdeas(userId);
    }

}