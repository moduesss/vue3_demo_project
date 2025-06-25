<template>
  <main>
    <h1><strong>Cosmic</strong> ToDo</h1>

    <TodoItem v-if="editingTask" :task="editingTask" @submit="handleSubmit" />
    <TodoList @update-table="updateTasks" />
    <TaskTable>
      <!-- Кастомные заголовки -->
      <template #header-title>
        <strong>Задача</strong>
      </template>
      <template #header-importance>
        <span>Важность</span>
      </template>

      <template #cell="{ task, field }">
    <span v-if="field === 'importance' && task.importance === 'Высокая'">
      🔥 {{ task.importance }}
    </span>
        <span v-else-if="field === 'urgency' && task.urgency === 'Срочно'">
      ⚠️ {{ task.urgency }}
    </span>
        <span v-else>
      {{ task[field] || '—' }}
    </span>
      </template>
    </TaskTable>
  </main>
</template>

<script setup>
import TodoList from '../components/TodoList.vue';
import TaskTable from '../components/TaskTable.vue';
import TodoItem from "../components/TodoItem.vue";
</script>
