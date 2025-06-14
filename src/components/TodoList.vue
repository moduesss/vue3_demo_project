<template>
  <section>
    <form @submit.prevent="addTask" @keyup.enter="addTask">
      <input v-model="title" placeholder="Задача" />
      <select v-model="importance">
        <option disabled value="">Важность</option>
        <option>Низкая</option>
        <option>Средняя</option>
        <option>Высокая</option>
      </select>
      <select v-model="urgency">
        <option disabled value="">Срочность</option>
        <option>Низкая</option>
        <option>Средняя</option>
        <option>Высокая</option>
      </select>
      <button type="submit">Добавить</button>
    </form>

    <div v-for="task in tasks" :key="task.id">
      <TodoItem :task="task" @delete="deleteTask" @edit="editTask" />
    </div>
  </section>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import TodoItem from './TodoItem.vue';

const emit = defineEmits(['update-table']);

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


</script>

