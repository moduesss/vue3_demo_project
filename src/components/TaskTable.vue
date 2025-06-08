<template>
  <table @click.capture="logCapture" @click="logBubble">
    <thead>
      <tr>
        <th>Название</th>
        <th>Важность</th>
        <th>Срочность</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.title }}</td>
        <td>{{ task.importance }}</td>
        <td>{{ task.urgency }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps(['tasks']);

function logCapture() {
  console.log('📥 Capture (погружение)');
}
function logBubble() {
  console.log('📤 Bubble (всплытие)');
}
</script>
