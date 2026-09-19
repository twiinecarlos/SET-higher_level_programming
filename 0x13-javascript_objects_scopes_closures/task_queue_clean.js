function notifyHighPriority(priority, queueName) {
  if (priority > 9) {
    console.warn(`High priority task added to ${queueName}.`);
  }
}

class TaskQueue {
  constructor(name) {
    this.queueName = name;
    this.tasks = [];
    this.isProcessing = false;
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
  }

  startProcessingIfNeeded() {
    if (this.tasks.length === 1) {
      console.log(`Starting queue ${this.queueName}.`);
      this._startProcessing();
    }
  }

  _startProcessing() {
    this.isProcessing = true;
    // ... logic to process tasks ...
  }
}
