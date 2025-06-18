<template>
  <main>
    <h1><strong>Cosmic</strong> ToDo</h1>

    <TodoItem v-if="editingTask" :task="editingTask" @submit="handleSubmit" />
    <TodoList @update-table="updateTasks" />
  </main>
</template>

<script setup>
import TodoList from '../components/TodoList.vue';
import TaskTable from '../components/TaskTable.vue';
import TodoItem from "../components/TodoItem.vue";
</script>
