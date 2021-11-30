import { useCallback, useState } from 'react';

/**
 * Default task
 */
export const DEFAULT_TASK_ABSENT: string = 'ABSENT';

type Task = {
    taskStatus: string;
    taskStartAsMs: number;
    taskTimeoutAsMs: number;
};

/**
 * Task hook helps to set the task to be performed
 *
 * @return A stateful value, and a function to update it.
 */
const useTask = (): [string, (nextTask: string, timeout: number) => void] => {
    const [task, setTask] = useState<Task>({
        taskStatus: DEFAULT_TASK_ABSENT,
        taskStartAsMs: Date.now(),
        taskTimeoutAsMs: 0,
    });

    /**
     * Sets next task
     *
     * @param nextTask - Next task name as string, please use UPPERCASE for task naming
     * @param timeout - Timeout that prevents the installation of a new task
     */
    const setNextTask = useCallback(
        (nextTask: string, timeout: number): void => {
            if (task.taskStartAsMs + task.taskTimeoutAsMs <= Date.now()) {
                setTask({
                    taskStatus: nextTask,
                    taskStartAsMs: Date.now(),
                    taskTimeoutAsMs: timeout,
                });
            }
        },
        [task]
    );

    return [task.taskStatus, setNextTask];
};

export default useTask;
