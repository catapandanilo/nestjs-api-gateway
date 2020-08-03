import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices'
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('api/v1')
export class AppController {
  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:SENHA@IPCONEXAO_RABBITMQ_AWS:PORTA_APLICACAO/VITURAL_HOST'],
        queue: 'admin-backend'
      }
    })
  }

  @Post('categories')
  @UsePipes(ValidationPipe)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.clientAdminBackend.emit('create-category', createCategoryDto);
  }
}
