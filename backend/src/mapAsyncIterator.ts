/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function <T, B>(
  func: (data: T) => B | Promise<B>,
  iterable: AsyncIterableIterator<T>,
): AsyncIterableIterator<B> {
  const iterator = iterable[Symbol.asyncIterator]();

  return {
    async next() {
      const { value, done } = await iterator.next();
      if (done) {
        return { done: true, value };
      }
      return { done: false, value: await func(value) };
    },
    async return() {
      if (iterator.return) {
        try {
          const result = await iterator.return();
          return { done: true, value: result.value as B };
        } catch (error) {
          return { done: true, value: undefined };
        }
      }
      return { done: true, value: undefined };
    },
    async throw(error: any) {
      if (iterator.throw) {
        const result = await iterator.throw(error);
        return { done: true, value: result.value as B };
      }
      throw error;
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}
