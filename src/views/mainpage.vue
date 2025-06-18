<template>
  <main>
    <h1><strong>Cosmic</strong> ToDo</h1>

    <TodoItem v-if="editingTask" :task="editingTask" @submit="handleSubmit" />
    <TodoList @update-table="updateTasks" />
    <TaskTable
        :tasks="allTasks"
        @edit-task="startEditing"
        @delete-task="handleDelete"
    />
  </main>
</template>

<script setup>
import { ref } from 'vue';
import TodoList from '../components/TodoList.vue';
import TaskTable from '../components/TaskTable.vue';
import TodoItem from "../components/TodoItem.vue";

const allTasks = ref([]);
const editingTask = ref(null);

function updateTasks(tasks) {
  allTasks.value = tasks;
}

function startEditing(task) {
  editingTask.value = { ...task };
}

function handleSubmit(updatedTask) {
  const index = allTasks.value.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    allTasks.value[index] = { ...updatedTask };
  }
  editingTask.value = null;
}

function handleDelete(id) {
  allTasks.value = allTasks.value.filter(t => t.id !== id);
}
</script>
