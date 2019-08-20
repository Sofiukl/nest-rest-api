import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('rest-app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  getGreetings() : object {

    const obj = {};
    obj['error'] = false;
    obj['result'] = [];
    obj['result'].push("how are you")

    return obj;
  }
}
