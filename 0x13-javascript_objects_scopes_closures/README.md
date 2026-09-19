# Task 1: AI Pair Programming & Quality

## Objective

This task demonstrates the use of structured prompt engineering to audit and refactor a JavaScript class for:

* Single Responsibility Principle (SRP) violations
* Scope and closure issues
* Improved modularity
* Improved maintainability

## Files

### `task_queue_legacy.js`

Contains the original legacy `TaskQueue` implementation provided for the assignment.

The class mixes task management, logging, notification, and processing responsibilities and contains a scope/closure issue involving the `notify` function.

### `task_queue_clean.js`

Contains the refactored implementation.

The responsibilities have been separated into:

* `TaskQueue` — task management
* `notifyHighPriority()` — high-priority notification
* `TaskQueueProcessor` — queue processing/start logic

The original reliance on the outer `name` variable has also been removed. The queue name is explicitly passed to the notification function.

## AI-Assisted Audit

The first prompt asked the AI to analyze the scope of `notify`, identify the variables it closes over, explain closure creation, and examine block scoping.

## AI-Assisted Refactoring

The second prompt asked the AI to identify SRP violations in `addTask` and refactor logging, notification, and processing responsibilities into separate components.

## Final Verification

The final prompt asked the AI to review `task_queue_clean.js` and confirm that the original SRP and scope problems had been resolved.

## Reflection

LLMs are pattern-matching engines rather than code executors, so asking the AI to identify structural patterns was more useful for learning than simply asking it to fix the code. The audit showed me specifically how the `notify` function accessed `priority` through a closure and why depending on the outer `name` variable was problematic. The SRP analysis also helped me understand why task storage, notification, logging, and processing should not all be responsibilities of one method.
