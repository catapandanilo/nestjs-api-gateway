import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Query } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Observable } from 'rxjs';

@Controller('api/v1')
export class AppController {
  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.BROKEN_PROTOCOL}://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_URL_INSTANCE}:${process.env.RABBITMQ_PORT_APP}/${process.env.RABBITMQ_VIRTUAL_HOST}`],
        queue: 'admin-backend'
      }
    })
  }

  @Post('categories')
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    this.clientAdminBackend.emit('create-category', createCategoryDto);
  }

  @Get('categories')
  getCategory(@Query('idCategory') _id: string): Observable<any> {
    return this.clientAdminBackend.send('get-categories', _id ? _id : '');
  }
}
