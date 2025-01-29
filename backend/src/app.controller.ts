import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyReply } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Res() res: FastifyReply): Promise<any> {
    try {
      res.status(HttpStatus.OK).send({
        status: true,
        api_version: 2.0,
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).send({
        status: false,
        message: error.message,
      });
    }
  }
}
