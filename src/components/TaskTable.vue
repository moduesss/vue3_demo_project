<template>

  <table
      class="task-table"
      :class="{ glowing: isTableHovered && hoveredCellIndex === null }"
      @mouseenter.capture="onTableEnter"
      @mouseleave="onTableLeave"
  >
    <thead>
    <tr>
      <th>Название</th>
      <th>Важность</th>
      <th>Срочность</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(task, rowIndex) in tasks" :key="task.id">
      <td
          v-for="(value, colIndex) in [task.title || '—', task.importance || '—', task.urgency || '—']"
          :key="colIndex"
          @mouseenter.capture="onCellEnter(rowIndex, colIndex)"
          @mouseleave="onCellLeave"
          :class="{
            cellHovered: rowIndex === hoveredRowIndex && colIndex === hoveredCellIndex
          }"
      >
        {{ value }}
      </td>
    </tr>
    </tbody>
  </table>

</template>

<script setup>

import { ref } from 'vue'

const props = defineProps({
  tasks: Array
})

const isTableHovered = ref(false)
const hoveredRowIndex = ref(null)
const hoveredCellIndex = ref(null)

function onTableEnter() {
  if (hoveredCellIndex.value === null) {
    isTableHovered.value = true
  }
}

function onTableLeave() {
  isTableHovered.value = false
}

function onCellEnter(row, col) {
  hoveredRowIndex.value = row
  hoveredCellIndex.value = col
  isTableHovered.value = false
}

function onCellLeave() {
  hoveredRowIndex.value = null
  hoveredCellIndex.value = null
  isTableHovered.value = true
}

</script>


<style scoped>

.task-table {
  width: 100%;
  border-collapse: collapse;
  transition: box-shadow 0.3s ease;
}

.task-table th,
.task-table td {
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: left;
  transition: background-color 0.3s ease;
}

.task-table.glowing {
  box-shadow: 0 0 25px 5px rgba(168, 85, 247, 0.7);
}

.cellHovered {
  background-color: rgba(255, 255, 255, 0.15);
  transition: background-color 0.2s ease;
}

</style>
