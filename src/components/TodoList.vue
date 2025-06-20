<template>

  <section>
    <form @submit.prevent="addTask">
      <n-input
          v-model:value="title"
          placeholder="Задача"
          class="input"
          clearable
      />

      <n-select
          v-model:value="importance"
          :options="importanceOptions"
          placeholder="Важность"
          class="input"
          clearable
      />

      <n-select
          v-model:value="urgency"
          :options="urgencyOptions"
          placeholder="Срочность"
          class="input"
          clearable
      />

      <button type="submit" class="submit-btn">Добавить</button>
    </form>

    <div v-for="task in tasks" :key="task.id">
      <TodoItem :task="task" @delete="deleteTask" @edit="editTask" />
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted, watch, computed} from 'vue';
import { NInput, NSelect } from 'naive-ui';
import TodoItem from './TodoItem.vue';

const emit = defineEmits(['update-table']);

const importanceOptions = [
  { label: 'Низкая', value: 'Низкая' },
  { label: 'Средняя', value: 'Средняя' },
  { label: 'Высокая', value: 'Высокая' }
];

const urgencyOptions = [
  { label: 'Не срочно', value: 'Не срочно' },
  { label: 'Скоро', value: 'Скоро' },
  { label: 'Срочно', value: 'Срочно' }
];

let title = ref('');
let importance = ref('');
let urgency = ref('');
let tasks = ref([]);

onMounted(() => {
  fetchTasks();
});

function addTask() {
  if (!title.value) return;
  const newTask = {
    id: Date.now(),
    title: title.value,
    importance: importance.value,
    urgency: urgency.value
  };
  tasks.value.push(newTask);
  emit('update-table', tasks.value);
  title.value = '';
  importance.value = '';
  urgency.value = '';
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id);
  emit('update-table', tasks.value);
}

function editTask(updatedTask) {
  const index = tasks.value.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) tasks.value[index] = updatedTask;
  emit('update-table', tasks.value);
}

function fetchTasks() {
  const saved = localStorage.getItem('tasks');
  tasks.value = saved ? JSON.parse(saved) : [];
  emit('update-table', tasks.value);
}

watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks));
}, { deep: true });

const formattedTasks = computed(() =>
    rawTasks.value.map(task => {
      return {
        ...task,
        displayText: [task.title, task.importance, task.urgency]
            .filter(Boolean)
            .join(' | '),
        displayImportance: task.importance || '–',
        displayUrgency: task.urgency || '–'
      };
    })
);

</script>

<style scoped>
  form {
    margin: 10px 0;
  }
</style>

