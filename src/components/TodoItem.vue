<template>
  <div class="todo-items-block">
    <span>
      {{ localTask.title }}
      <template v-if="hasMeta">
        <span v-if="localTask.importance">| {{ localTask.importance }}</span>
        <span v-if="localTask.urgency">| {{ localTask.urgency }}</span>
      </template>
      <template v-else>
        | — | —
      </template>
    </span>

    <button @click="editing = true">✏️</button>
    <button @click="$emit('delete', localTask.id)">🗑️</button>

    <div v-if="editing">
      <n-input v-model:value="editTitle" clearable />
      <n-select v-model:value="editImportance" :options="priorityOptions" clearable />
      <n-select v-model:value="editUrgency" :options="urgencyOptions" clearable />
      <button @click="save">Сохранить</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps(['task']);
const emit = defineEmits(['edit']);

const localTask = ref({ ...props.task });

watch(
    () => props.task,
    (newVal) => {
      localTask.value = { ...newVal };
    },
    { immediate: true, deep: true }
);

const editing = ref(false);
const editTitle = ref('');
const editImportance = ref('');
const editUrgency = ref('');

watch(
    () => props.task,
    (newTask) => {
      editTitle.value = newTask.title;
      editImportance.value = newTask.importance;
      editUrgency.value = newTask.urgency;
    },
    { immediate: true, deep: true }
);

const priorityOptions = [
  { label: 'Низкая', value: 'Низкая' },
  { label: 'Средняя', value: 'Средняя' },
  { label: 'Высокая', value: 'Высокая' }
];

const urgencyOptions = [
  { label: 'Не срочно', value: 'Не срочно' },
  { label: 'Скоро', value: 'Скоро' },
  { label: 'Срочно', value: 'Срочно' }
];

const hasMeta = computed(() => {
  return localTask.value.importance || localTask.value.urgency;
});

function save() {
  editing.value = false;
  const updated = {
    ...localTask.value,
    title: editTitle.value,
    importance: editImportance.value,
    urgency: editUrgency.value
  };
  emit('edit', updated);
}

</script>
