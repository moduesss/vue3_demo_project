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
        deleteTask(state, id) {
            state.tasks = state.tasks.filter(t => t.id !== id);
        },
        editTask(state, updatedTask) {
            const index = state.tasks.findIndex(t => t.id === updatedTask.id);
            if (index !== -1) {
                state.tasks[index] = updatedTask;
            }
        }
    },
    actions: {
        loadTasks({ commit }) {
            const saved = localStorage.getItem('tasks');
            const tasks = saved ? JSON.parse(saved) : [];
            commit('setTasks', tasks);
        },
        addTask({ commit, dispatch }, task) {
            commit('addTask', task);
            dispatch('saveTasks');
        },
        deleteTask({ commit, dispatch }, id) {
            commit('deleteTask', id);
            dispatch('saveTasks');
        },
        editTask({ commit, dispatch }, updatedTask) {
            commit('editTask', updatedTask);
            dispatch('saveTasks');
        },
        saveTasks({ state }) {
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        }
    },
    getters: {
        tasks: state => state.tasks
    }
});
