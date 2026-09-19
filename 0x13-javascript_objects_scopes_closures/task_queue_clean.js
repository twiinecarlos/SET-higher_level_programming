function notifyHighPriority(priority, queueName) {
  if (priority > 9) {
    console.warn(`High priority task added to ${queueName}.`);
  }
}

class TaskQueueProcessor {
  constructor(queue) {
    this.queue = queue;
  }

  startIfNeeded() {
    if (this.queue.tasks.length === 1) {
      console.log(`Starting queue ${this.queue.queueName}.`);
      this.queue.isProcessing = true;
    }
  }
}

class TaskQueue {
  constructor(name) {
    this.queueName = name;
    this.tasks = [];
    this.isProcessing = false;
    this.processor = new TaskQueueProcessor(this);
  }

  addTask(taskFn, priority) {
    if (!taskFn || typeof taskFn !== 'function') {
      console.error('Task must be a function.');
      return;
    }

    this.tasks.push({
      taskFn,
      priority,
      timestamp: Date.now()
    });

    notifyHighPriority(priority, this.queueName);
    this.processor.startIfNeeded();
  }
}
