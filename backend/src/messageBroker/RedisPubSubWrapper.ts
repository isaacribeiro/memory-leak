import { RedisPubSub } from 'graphql-redis-subscriptions';

export class RedisPubSubWrapper {
  constructor(private redisPubSubClient: RedisPubSub) {}

  async publish(channel: string, message: any) {
    await this.redisPubSubClient.publish(
      channel,
      JSON.stringify({ ...message }),
    );
  }

  get client() {
    return this.redisPubSubClient;
  }
}
