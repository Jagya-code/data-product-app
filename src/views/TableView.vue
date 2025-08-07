<!-- src/views/TableView.vue -->
<template>
  <div class="view">
    <!-- Hamburger Icon -->
    <button v-if="!sidebarOpen" class="hamburger" @click="toggleSidebar">
    ☰
    </button>

    <!-- Sidebar Overlay -->
    <div class="sidebar" v-if="sidebarOpen">
      <button class="close-btn" @click="toggleSidebar">✕</button>
      <TableTreeView @select="handleSelect" />
    </div>

    <!-- Table Details View -->
    <div :class="['details', { 'with-sidebar': sidebarOpen }]" v-if="selected">
    <TableDetails :table="selected" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TableTreeView from '@/components/TableTreeView.vue'
import TableDetails from '@/components/TableDetails.vue'

const selected = ref(null)
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function handleSelect(table) {
  selected.value = table
  //sidebarOpen.value = false // Optional: auto-close sidebar on table select
}
</script>

<style scoped>
.view {
  position: relative;
  height: 100vh;
  background-color: #007bff;
  font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
  color: #050000;
  overflow: hidden;
}

/* Hamburger Icon */
.hamburger {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 1001;
  font-size: 28px;
  background: none;
  border: none;
  color: rgb(30, 2, 2);
  cursor: pointer;
}

/* Sidebar as overlay */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 100vh;
  background-color: #0056b3;
  padding: 16px;
  overflow-y: auto;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}
.sidebar::-webkit-scrollbar-thumb {
  background-color: #3399ff;
  border-radius: 10px;
}

/* Close button inside sidebar */
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: rgb(25, 23, 23);
  cursor: pointer;
}

/* Main content */

.details {
  transition: margin-left 0.3s ease;
  padding: 24px;
  overflow-y: auto;
  height: 100vh;
  background-color: #e6f0ff;
  color: #333;
}
.details.with-sidebar {
  margin-left: 310px; /* Same width as sidebar */
}
.details h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

.details table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: #fff;
}

.details th,
.details td {
  padding: 14px 18px;
  border: 1px solid #ccc;
  text-align: left;
}

.details th {
  background-color: #007bff;
  color: white;
}

.details tr:nth-child(even) {
  background-color: #f2f2f2;
}

.details tr:hover {
  background-color: #d9ecff;
}
</style>
