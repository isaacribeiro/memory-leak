import { Controller, Post, Body, Inject } from '@nestjs/common';
import { MessageBrokerProvider } from './messageBroker/messageBroker.providers';

@Controller()
export class AppController {
  constructor(
    @Inject('MessageBrokerConnection')
    private readonly messageBroker: MessageBrokerProvider,
  ) {}

  @Post('publish-counter')
  async publishCounter(@Body() body: { counter: number }) {
    await this.messageBroker.redisPubSub.client.publish(
      'counter',
      JSON.stringify({ counter: body.counter }),
    );
    return { success: true, counter: body.counter };
  }
} 