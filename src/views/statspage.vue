<template>
  <div class="stats-page">
    <h2>📊 Статистика</h2>

    <table class="stats-table">
      <thead>
      <tr>
        <th>Метод</th>
        <th>Результат</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key) in stats" :key="key">
        <td>{{ key }}</td>
        <td>{{ value }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

const stats = computed(() => {
  const now = new Date();

  const taskCount = tasks.length;

  const importanceFrequency = {};
  tasks.forEach(task => {
    if (task.importance) {
      importanceFrequency[task.importance] = (importanceFrequency[task.importance] || 0) + 1;
    }
  });

  const mostFrequentImportance = Object.entries(importanceFrequency)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || '—';

  const emptyFieldsCount = tasks.filter(task => !task.importance || !task.urgency).length;

  const completeFilledCount = tasks.filter(task => task.importance && task.urgency).length;

  return {
    'Дата': now.toLocaleDateString(),
    'Системное время': now.toLocaleTimeString(),
    'Количество задач': taskCount,
    'Самая частая важность': mostFrequentImportance,
    'Задачи с неполными данными': emptyFieldsCount,
    'Полностью заполненные задачи': completeFilledCount
  };
});

</script>

<style scoped>
.stats-page {
  padding: 2rem;
  color: white;
}

.stats-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(138, 43, 226, 0.4);
  background-color: #1c0b2b;
}

.stats-table th {
  background: linear-gradient(to right, #6a5acd, #7f5af0);
  color: #fff;
  padding: 10px;
  text-align: left;
}

.stats-table td {
  padding: 10px;
  background-color: #1c0b2b;
  border-top: 1px solid #333;
}

.stats-table tr:hover td {
  background-color: #2e1a47;
}
</style>
