<template>
  <div id="app">
    <nav class="tabs">
      <router-link to="/" exact-active-class="active">Load Data</router-link>
      <router-link to="/tables" exact-active-class="active">Tables</router-link>
      <router-link to="/diagram" exact-active-class="active">ER Diagram</router-link>
    </nav>
    <router-view />
  </div>
</template>


<script>
export default {
  name: 'App'
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Verdana, sans-serif;
  background-color: #f4f6f8; 
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 14px 0;
  background: #f0f4f8; 
  border-bottom: 1px solid #cbd5e1;
}

.tabs a {
  text-decoration: none;
  color: #444;
  padding: 10px 18px;
  border-radius: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-weight: 500;
}

.tabs a:hover {
  background-color: #dfeaf5;
  color: #1e3a5f;
}

.tabs .active {
  background-color: #c5d7e5;
  color: #1e3a5f;
  font-weight: 600;
}
</style>
