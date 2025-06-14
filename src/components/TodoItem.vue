<template>
  <div>
    <span> {{ task.title }} </span>
    <span v-if="task.importance"> | {{ task.importance }} </span>
    <span v-if="task.urgency"> | {{ task.urgency }} </span>
    <button @click="editing = true"> ✏️ </button>
    <button @click="$emit('delete', task.id)"> 🗑️ </button>

    <div v-if="editing">
      <input v-model="editTitle" />
      <select v-model="editImportance">
        <option>Низкая</option>
        <option>Средняя</option>
        <option>Высокая</option>
      </select>
      <select v-model="editUrgency">
        <option>Низкая</option>
        <option>Средняя</option>
        <option>Высокая</option>
      </select>
      <button @click="saveTask">Сохранить</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps(['task']);
const emit = defineEmits(['edit']);

let editing = ref(false);
let editTitle = ref(props.task.title);
let editImportance = ref(props.task.importance);
let editUrgency = ref(props.task.urgency);

function saveTask() {
  editing.value = false;
  emit('edit', {
    ...props.task,
    title: editTitle.value,
    importance: editImportance.value,
    urgency: editUrgency.value
  });
}
</script>
