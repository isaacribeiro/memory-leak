import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { MessageBrokerModule } from './messageBroker/messageBroker.module';
import { Inject } from '@nestjs/common';
import { MessageBrokerProvider } from './messageBroker/messageBroker.providers';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    MessageBrokerModule,
    MetricsModule,
    GraphQLModule.forRoot({
      stopOnTerminationSignals: false,
      // autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
      debug: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        keepAlive: 5000,
      },
    }),
  ],
  controllers: [],
  providers: [AppService, AppResolver],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject('MessageBrokerConnection')
    private readonly sync: MessageBrokerProvider,
  ) {}

  onModuleInit() {
    let count = 1;
    setInterval(() => {
      this.sync.redisPubSub.client.publish(
        'counter',
        JSON.stringify({ counter: count++ }),
      );
    }, 1000);
  }
}
