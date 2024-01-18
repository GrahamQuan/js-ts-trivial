class ThreadPool<T> {
  private threadCount: number = 0;
  private runningCount: number = 0;
  private taskQueue: {
    task: () => Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
  }[] = [];

  constructor(threadCount: number) {
    this.threadCount = threadCount;
  }

  add(task: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // console.log('add');
      this.taskQueue.push({
        task,
        resolve,
        reject,
      });
      this.run();
    });
  }
  // run tasks in sequence
  async run() {
    while (this.runningCount < this.threadCount && this.taskQueue.length > 0) {
      const taskObj = this.taskQueue.shift();
      if (taskObj) {
        // console.log('run');
        const { task, resolve, reject } = taskObj;
        this.runningCount++;
        task()
          .then(resolve, reject)
          .finally(() => {
            this.runningCount--;
            this.run();
          });
      } else {
        console.log('taskQueue is currently empty');
      }
    }
  }
}

// concurrnet tasks max is 2
const threadPool = new ThreadPool(2);

function timeout(time: number) {
  return new Promise((resolve, reject) => {
    // console.log('timeout');
    setTimeout(() => {
      resolve(time);
    }, time);
  });
}

function addTask(time: number, name: string | number) {
  threadPool
    .add(() => timeout(time))
    .then(() => console.log(`task [${name}] is done`));
}

addTask(1000, 1); // 1000ms, log 1
addTask(500, 2); // 500ms, log 2
addTask(300, 3); // 800ms, log 3
addTask(400, 4); // 1200ms, log 4
addTask(500, 5); // 1500ms, log 5

// prints
// task [2] is done
// task [3] is done
// task [1] is done
// task [4] is done
// task [5] is done
