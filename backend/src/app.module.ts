import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { MessageBrokerModule } from './messageBroker/messageBroker.module';
import { Inject } from '@nestjs/common';
import { MessageBrokerProvider } from './messageBroker/messageBroker.providers';
import { MetricsModule } from './metrics/metrics.module';
import { AppController } from './app.controller';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Context } from 'graphql-ws';


@Module({
  imports: [
    MessageBrokerModule,
    MetricsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoTransformHttpErrors: false,
      stopOnTerminationSignals: false,
      // autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      debug: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject('MessageBrokerConnection')
    private readonly sync: MessageBrokerProvider,
  ) {}

  onModuleInit() {
    // let count = 1;
    // setInterval(() => {
    //   this.sync.redisPubSub.client.publish(
    //     'counter',
    //     JSON.stringify({ counter: count++ }),
    //   );
    // }, 1000);
  }
}
