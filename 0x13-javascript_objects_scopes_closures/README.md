# Task 1: AI Pair Programming & Quality

## Objective

This task demonstrates the use of structured prompt engineering to critically audit and refactor a JavaScript class for:

* Single Responsibility Principle (SRP) violations
* Scope and closure issues
* Improved modularity
* Improved maintainability

---

## Files

### `task_queue_legacy.js`

Contains the original legacy `TaskQueue` implementation provided for the assignment.

The class mixes task management, validation, logging, notification, and processing responsibilities. It also contains a scope/closure issue involving the `notify` function and its use of `priority` and `name`.

### `task_queue_clean.js`

Contains the refactored implementation.

The responsibilities have been separated into:

* `TaskQueue` — manages and stores tasks
* `notifyHighPriority()` — handles high-priority task notifications
* `TaskQueueProcessor` — handles queue-start and processing logic

The original reliance on the outer `name` variable has been removed. The queue name is explicitly passed to `notifyHighPriority()`.

---

# AI-Assisted Audit: Scope and Closures

## Prompt Used

Analyze the following JavaScript code, focusing specifically on the `addTask` method, JavaScript scope, closures, and variable declaration practices.

```javascript
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

    this.tasks.push({ taskFn, priority, timestamp: Date.now() });

    if (this.tasks.length === 1) {
      console.log(`Starting queue ${this.queueName}.`);
      this._startProcessing();
    }

    function notify() {
      if (priority > 9) {
        console.warn(`High priority task added to ${name}.`);
      }
    }

    notify();
  }

  _startProcessing() {
    this.isProcessing = true;
  }
}
```

Please perform a structured scope and closure audit of `addTask`.

1. Explain the scope of the `notify` function. Where is it defined, where is it accessible, and when does it exist?
2. Explicitly identify every variable that the `notify` function closes over. Explain how the closure is created in this specific context.
3. Explain whether `priority` is local to `addTask` and how `notify` can access it even though `notify` is defined inside `addTask`.
4. Explain how `name` is resolved by `notify`. Identify the scope in which JavaScript searches for `name`, and explain why relying on that variable can be problematic or confusing in this class.
5. Determine whether any variables in this code should be block-scoped using `let` or `const` rather than `var`. Explain why block scoping matters for predictable and maintainable JavaScript code.
6. Identify any potential scope, shadowing, or closure-related problems in the code.
7. Do not simply rewrite the code. First explain the structural problems and the JavaScript concepts involved.

Give the explanation in a way that would help a student understand how closures and scope work rather than simply providing a fix.

---

# AI-Assisted Refactoring: Single Responsibility Principle

## Prompt Used

Analyze and refactor the following JavaScript `TaskQueue` class according to the Single Responsibility Principle (SRP).

```javascript
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

    this.tasks.push({ taskFn, priority, timestamp: Date.now() });

    if (this.tasks.length === 1) {
      console.log(`Starting queue ${this.queueName}.`);
      this._startProcessing();
    }

    function notify() {
      if (priority > 9) {
        console.warn(`High priority task added to ${name}.`);
      }
    }

    notify();
  }

  _startProcessing() {
    this.isProcessing = true;
    // ... logic to process tasks ...
  }
}
```

Perform a structured SRP analysis before refactoring.

1. Identify every responsibility currently handled by `addTask`.
2. Specifically examine the following potential SRP violations:

   * validating the task,
   * modifying the task array/state,
   * checking whether processing should start,
   * logging that the queue has started,
   * scheduling/starting processing,
   * notifying about high-priority tasks.
3. Explain why mixing task management, logging, and scheduling makes the method harder to test and maintain.
4. Refactor the class so that `addTask` is primarily responsible for adding a valid task to the array.
5. Extract the logging and scheduling/processing responsibility into a separate function or class.
6. Resolve the scope/closure issue involving `notify` and `name`. Do not rely on an accidentally available outer variable.
7. Use predictable block-scoped declarations (`const`/`let`) where appropriate.
8. Keep the refactored code simple and understandable for a student.
9. Explain how the refactored design improves:

   * testability,
   * maintainability,
   * separation of concerns,
   * scope safety,
   * future extensibility.

Provide the complete refactored JavaScript code followed by a concise explanation of the changes.

---

# Final Verification

## Prompt Used

Review the following refactored JavaScript file, `task_queue_clean.js`, as a final code-quality and structural audit.

```javascript
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
```

Verify the implementation against the original TaskQueue problems.

1. Confirm whether the original SRP violations in `addTask` have been resolved.
2. Confirm whether task management has been separated from logging/notification and scheduling/processing responsibilities.
3. Confirm whether the original closure/scope issue involving `notify` and `name` has been resolved.
4. Confirm that `queueName` is now passed explicitly rather than relying on an outer variable.
5. Check whether the code uses appropriate block-scoped declarations and avoids unnecessary `var` usage.
6. Identify any remaining structural or maintainability issues.
7. Evaluate the implementation using four categories:

   * Quality
   * Fit to the assignment requirements
   * Understanding of the underlying concepts
   * Correctness
8. Do not rewrite the code unless a genuine correctness problem is found. Explain your reasoning clearly.

---

# Evidence of Execution

## Screenshot 1 — Scope and Closure Audit

The first screenshot shows the AI's explanation of:

* The scope of the `notify` function
* The variables captured by the closure
* How `priority` is accessed through the closure
* How `name` is resolved
* Block scoping with `let` and `const`
* How the closure is created in this context

**Screenshot file:** `01-scope-closure-audit.png`

## Screenshot 2 — SRP Refactoring

The second screenshot shows the AI's:

* Identification of SRP violations
* Refactored code
* Explanation of separation of responsibilities
* Explanation of improved testability and maintainability

**Screenshot file:** `02-srp-refactoring.png`

---

# Reflection

LLMs are pattern-matching engines rather than code executors, so asking the AI to identify structural patterns was more useful for learning than simply asking it to fix the code. By asking the AI to audit the `notify` function, I learned specifically how `priority` is accessed through a closure and why relying on the outer `name` variable is problematic. The SRP analysis also helped me understand why task storage, notification, logging, and processing should be separated instead of being handled by one method.

---

# Verification

The JavaScript files were checked using Node.js syntax validation:

```bash
node --check task_queue_legacy.js
node --check task_queue_clean.js
```

Both files passed syntax validation without errors.
