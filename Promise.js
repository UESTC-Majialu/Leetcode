// 手写Promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handlers = [];
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  #changeState(state, result) {
    if (this.#state !== PENDING) return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }
  #runMicroTask(func) {
    if (
      typeof process === 'object' &&
      typeof process.nextTick === 'function'
    ) {
      process.nextTick(func);
    } else if (typeof MutationObserver === 'function') {
      const ob = new MutationObserver(func);
      ob.observe(textNode, {
        characterData: true,
      });
      textNode.data = '2';
    } else {
      setTimeout(func, 0);
    }
  }
  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== 'function') {
        const settled =
          this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      try {
        const data = callback(this.#result);
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
  #isPromiseLike(value) {
    if (
      value !== null &&
      (typeof value === 'object' ||
        typeof value === 'function')
    ) {
      return typeof value.then === 'function';
    }
    return false;
  }
  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFulfilled, resolve, reject);
      } else {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
}

setTimeout(() => {
  console.log(1);
}, 0);

new MyPromise((resolve) => {
  resolve(2);
}).then((data) => {
  console.log(data);
});

console.log(3);