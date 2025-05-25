import { pubSub } from 'src/redis.pubsub';
import { RedisPubSubWrapper } from './RedisPubSubWrapper';

type ExtractPromiseValue<T> = T extends PromiseLike<infer U> ? U : T;
export type MessageBrokerProvider = ExtractPromiseValue<
  ReturnType<typeof messageBrokerProvider>
>;

const messageBrokerProvider = () => {
  const redisPubSubWrapper = new RedisPubSubWrapper(pubSub);

  return {
    redisPubSub: redisPubSubWrapper,
  };
};

export const messageBrokerProviders = [
  {
    provide: 'MessageBrokerConnection',
    inject: [],
    useFactory: messageBrokerProvider,
  },
];
