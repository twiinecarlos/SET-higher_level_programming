class TaskNotifier {
  notify(task, queueName) {
    if (task.priority > 9) {
      console.warn(`High priority task added to ${queueName}.`);
    }
  }
}

class TaskProcessor {
  start(queue) {
    queue.isProcessing = true;
    console.log(`Starting queue ${queue.queueName}.`);
    // ... logic to process tasks ...
  }
}

class TaskQueue {
  constructor(name) {
    this.queueName = name;
    this.tasks = [];
    this.isProcessing = false;
    this.notifier = new TaskNotifier();
    this.processor = new TaskProcessor();
  }

  addTask(taskFn, priority) {
    if (!taskFn || typeof taskFn !== 'function') {
      console.error('Task must be a function.');
      return;
    }

    const task = {
      taskFn,
      priority,
      timestamp: Date.now()
    };

    const wasEmpty = this.tasks.length === 0;

    this.tasks.push(task);

    if (wasEmpty) {
      this.processor.start(this);
    }

    this.notifier.notify(task, this.queueName);
  }
}
