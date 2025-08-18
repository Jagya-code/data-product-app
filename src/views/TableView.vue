

<template>
  <div class="view">
    <button v-if="!sidebarOpen" class="hamburger" @click="toggleSidebar">☰</button>
    <div class="sidebar" v-if="sidebarOpen">
      <button class="close-btn" @click="toggleSidebar">✕</button>
      <!-- Pass correct table list -->
      <TableTreeView :tables="tables" @select="handleSelect" />
    </div>
    <div :class="['details', { 'with-sidebar': sidebarOpen }]" v-if="selected">
      <TableDetails :table="selected" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDataModelStore } from '@/store/dataModelStore'
import TableTreeView from '@/components/TableTreeView.vue'
import TableDetails from '@/components/TableDetails.vue'

const store = useDataModelStore()
const selected = ref(null)
const sidebarOpen = ref(false)

const tables = computed(() => {
  return store.showingSource ? store.dataDictionary : store.dataModel.tables
})

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function handleSelect(table) {
  selected.value = table
}
</script>

<style scoped>
.view {
  position: relative;
  height: 100vh;
  background: #f5f7fb;
  font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
  color: #0f172a;
  overflow: hidden;
}

.hamburger {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  font-size: 24px;
  line-height: 1;
  background: #ffffff;
  color: #334155;
  border: 1px solid #e6eaf2;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(16, 24, 40, 0.06);
  transition: background 0.2s ease, border-color 0.2s ease;
}
.hamburger:hover {
  background: #f1f4f9;
  border-color: #d8dee9;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid #e6eaf2;
  padding: 16px 14px 16px 16px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.08);
  z-index: 1000;
}
.sidebar::-webkit-scrollbar { width: 8px; }
.sidebar::-webkit-scrollbar-thumb {
  background: #d8dee9;
  border-radius: 8px;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  color: #475569;
  cursor: pointer;
}

.details {
  height: 100vh;
  padding: 28px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #fbfdff;
  color: #0f172a;
  transition: margin-left 0.28s ease;
}
.details.with-sidebar {
  margin-left: 300px;
}
</style>
