<template>

  <table
      class="task-table"
      :class="{ glowing: isTableHovered && hoveredCellIndex === null }"
      @mouseenter.capture="onTableEnter"
      @mouseleave="onTableLeave"
  >
    <thead>
    <tr>
      <th><slot name="header-title">Название</slot></th>
      <th><slot name="header-importance">Важность</slot></th>
      <th><slot name="header-urgency">Срочность</slot></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(task, rowIndex) in tasks" :key="task.id">
      <td
          v-for="(col, colIndex) in ['title', 'importance', 'urgency']"
          :key="colIndex"
          @mouseenter.capture="onCellEnter(rowIndex, colIndex)"
          @mouseleave="onCellLeave"
          :class="{
            cellHovered: rowIndex === hoveredRowIndex && colIndex === hoveredCellIndex
          }"
      >
        <slot
            name="cell"
            :task="task"
            :row-index="rowIndex"
            :col-index="colIndex"
            :field="col"
        >
          {{ task[col] || '—' }}
        </slot>
      </td>
    </tr>
    </tbody>
  </table>

</template>

<script setup>

import { ref, computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const tasks = computed(() => store.getters.allTasks);

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


<style>

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
