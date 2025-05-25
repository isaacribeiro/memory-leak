import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { MessageBrokerModule } from './messageBroker/messageBroker.module';
import { Inject } from '@nestjs/common';
import { MessageBrokerProvider } from './messageBroker/messageBroker.providers';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
    }),
    MessageBrokerModule,
    MetricsModule,
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
