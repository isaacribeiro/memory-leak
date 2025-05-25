/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Resolver, Query, Subscription, Int } from '@nestjs/graphql';
import mapAsyncIterator from './mapAsyncIterator';
import { MessageBrokerProvider } from './messageBroker/messageBroker.providers';
import { Inject } from '@nestjs/common';

@Resolver()
export class AppResolver {
  constructor(
    @Inject('MessageBrokerConnection') private sync: MessageBrokerProvider,
  ) {}

  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }

  @Subscription(() => Int, {
    name: 'counter',
    resolve: (payload) => {
      console.log(payload);
      return JSON.parse(payload.data).counter;
    },
  })
  counter() {
    return mapAsyncIterator(
      (data: any) => ({ data }),
      this.sync.redisPubSub.client.asyncIterator(
        'counter',
      ) as AsyncIterableIterator<any>,
    );
  }
}
