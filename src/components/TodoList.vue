<template>
  <section>
    <form @submit.prevent="addTask" @keyup.enter="addTask">

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
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { NInput, NSelect } from 'naive-ui';
import TodoItem from './TodoItem.vue';

const store = useStore();

const title = ref('');
const importance = ref('');
const urgency = ref('');

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

// Vuex getter
const tasks = computed(() => store.getters.allTasks);

function addTask() {
  if (!title.value.trim()) return;

  const newTask = {
    id: Date.now(),
    title: title.value,
    importance: importance.value,
    urgency: urgency.value
  };

  store.commit('addTask', newTask);

  title.value = '';
  importance.value = '';
  urgency.value = '';
}

function deleteTask(id) {
  store.commit('deleteTask', id);
}

function editTask(updatedTask) {
  store.commit('updateTask', updatedTask);
}
</script>
