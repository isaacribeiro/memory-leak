/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export default function <T, B>(
  func: (data: T) => B | Promise<B>,
  iterable: AsyncIterableIterator<T>,
): AsyncIterableIterator<B> {
  const iterator = iterable[Symbol.asyncIterator]();

  let finished = false;

  async function cleanup() {
    if (!finished && typeof iterator.return === 'function') {
      finished = true;
      try {
        await iterator.return();
      } catch {
        // ignore errors during cleanup
      }
    }
  }

  return {
    async next() {
      if (finished) return { done: true, value: undefined };
      try {
        const { value, done } = await iterator.next();
        if (done) {
          await cleanup();
          return { done: true, value: undefined };
        }
        return { done: false, value: await func(value) };
      } catch (err) {
        await cleanup();
        throw err;
      }
    },
    async return() {
      await cleanup();
      return { done: true, value: undefined };
    },
    async throw(error: any) {
      if (typeof iterator.throw === 'function') {
        try {
          await iterator.throw(error);
        } catch {}
      }
      await cleanup();
      throw error;
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}
