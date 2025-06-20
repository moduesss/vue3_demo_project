import { createStore } from 'vuex';

export default createStore({
    state: {
        tasks: []
    },
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        addTask(state, task) {
            state.tasks.push(task);
        },
        updateTask(state, updatedTask) {
            const index = state.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                state.tasks[index] = updatedTask;
            }
        },
        deleteTask(state, taskId) {
            state.tasks = state.tasks.filter(t => t.id !== taskId);
        }
    },
    actions: {
        loadTasks({ commit }) {
            const stored = localStorage.getItem('tasks');
            if (stored) {
                commit('setTasks', JSON.parse(stored));
            }
        }
    },
    getters: {
        allTasks: state => state.tasks
    },
    plugins: [
        store => {
            store.subscribe((mutation, state) => {
                if (['addTask', 'updateTask', 'deleteTask', 'setTasks'].includes(mutation.type)) {
                    localStorage.setItem('tasks', JSON.stringify(state.tasks));
                }
            });
        }
    ]
});
