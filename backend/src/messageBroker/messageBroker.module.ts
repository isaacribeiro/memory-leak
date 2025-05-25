import { Module, Global } from '@nestjs/common';
import { messageBrokerProviders } from './messageBroker.providers';

const providers = [...messageBrokerProviders];

@Global()
@Module({
  imports: [],
  providers: providers,
  exports: providers,
})
export class MessageBrokerModule {}
