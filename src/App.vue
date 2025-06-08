<template>
  <main>
    <h1><strong>Cosmic</strong> ToDo</h1>
    <TodoList @update-table="updateTasks" />
    <TaskTable :tasks="allTasks" />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import TodoList from './components/TodoList.vue';
import TaskTable from './components/TaskTable.vue';

const allTasks = ref([]);

function updateTasks(tasks) {
  allTasks.value = tasks;
}
</script>
