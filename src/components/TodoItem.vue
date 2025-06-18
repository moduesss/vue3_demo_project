<template>
  <div class="todo-items-block">
    <span>
      {{ task.title }}
      <template v-if="hasMeta">
        |
        <span v-if="task.importance">{{ task.importance }}</span>
        <span v-if="task.importance && task.urgency"> | </span>
        <span v-if="task.urgency">{{ task.urgency }}</span>
      </template>
    </span>

    <button @click="editing = true">✏️</button>
    <button @click="$emit('delete', task.id)">🗑️</button>

    <div v-if="editing">
      <input v-model="editTitle" />
      <select v-model="editImportance">
        <option value="">–</option>
        <option>Низкая</option>
        <option>Средняя</option>
        <option>Высокая</option>
      </select>
      <select v-model="editUrgency">
        <option value="">–</option>
        <option>Низкая</option>
        <option>Средняя</option>
        <option>Высокая</option>
      </select>
      <button @click="save">Сохранить</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['task']);
const emit = defineEmits(['edit']);

const editing = ref(false);
const editTitle = ref(props.task.title);
const editImportance = ref(props.task.importance);
const editUrgency = ref(props.task.urgency);

// Вычисляем, есть ли вообще значения важности или срочности
const hasMeta = computed(() => {
  return props.task.importance || props.task.urgency;
});

function save() {
  editing.value = false;
  emit('edit', {
    ...props.task,
    title: editTitle.value,
    importance: editImportance.value || '',
    urgency: editUrgency.value || ''
  });
}
</script>
