<!-- src/components/TableTreeView.vue -->
<!-- <template>
  <ul class="table-list">
    <li
      v-for="(table, index) in dataModel"
      :key="index"
      @click="selectTable(table)"
      :class="{ selected: selectedTable?.table_name === table.table_name }"
    >
      {{ table.table_name }}
    </li>
  </ul>
</template>

<script setup>
import { useDataModelStore } from '@/store/dataModelStore'
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['select'])

const store = useDataModelStore()
const dataModel = store.dataModel
const selectedTable = ref(null)

function selectTable(table) {
  selectedTable.value = table
  emit('select', table)
}
</script>
<style scoped>
.table-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.table-list li {
  padding: 12px 16px;
  margin-bottom: 10px;
  background-color: #f0f4f8; /* soft blue-gray */
  border-radius: 6px;
  color: #333; /* readable dark text */
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 15px;
}

.table-list li:hover {
  background-color: #d6e2ed; 
}

.table-list li.selected {
  background-color: #c5d7e5; 
  font-weight: 600;
}
</style> -->
<template>
  <ul class="table-list">
    <li
      v-for="(table, index) in tables"
      :key="index"
      @click="selectTable(table)"
      :class="{ selected: selectedTable?.table_name === table.table_name }"
    >
      {{ table.table_name }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'

defineProps({
  tables: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select'])
const selectedTable = ref(null)

function selectTable(table) {
  selectedTable.value = table
  emit('select', table)
}
</script>

<style scoped>
.table-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.table-list li {
  padding: 12px 16px;
  margin-bottom: 10px;
  background-color:#d8e2eb;
  border-radius: 6px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 16px;
}

.table-list li:hover {
  background-color: #aec3d6;
}

.table-list li.selected {
  background-color: #c5d7e5;
  font-weight: 600;
}
</style>
