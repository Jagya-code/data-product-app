<!-- src/views/LandingPage.vue -->
<template>
  <div class="landing-page">
    <div class="upload-box">
      <h2>Upload Data Model JSON File</h2>

      <input type="file" @change="handleFile" id="fileInput" hidden />
      <button @click="chooseFile">Choose File</button>

      <p v-if="fileName">Selected File: <strong>{{ fileName }}</strong></p>

      <button :disabled="!fileData" @click="loadFile">Load Data</button>
    </div>
  </div>
</template>

<script setup>
import { useDataModelStore } from '@/store/dataModelStore'
import { ref } from 'vue'

const store = useDataModelStore()
const fileData = ref(null)
const fileName = ref('')

function chooseFile() {
  document.getElementById('fileInput').click()
}

function handleFile(event) {
  const file = event.target.files[0]
  fileName.value = file.name

  const reader = new FileReader()
  reader.onload = () => {
    fileData.value = reader.result
  }
  reader.readAsText(file)
}

function loadFile() {
  try {
    const parsed = JSON.parse(fileData.value)
    store.setDataModel(parsed)
    alert('Data Model Loaded Successfully!')
  } catch (err) {
    alert('Invalid JSON format.')
    console.error(err)
  }
}
</script>

<style scoped>
.landing-page {
  background-color: #007bff; /* Blue background */
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-box {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px;
}

.upload-box h2 {
  margin-bottom: 1rem;
}

.upload-box button {
  margin: 10px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background-color: #0069d9;
  color: white;
  transition: background-color 0.2s;
}

.upload-box button:disabled {
  background-color: #a4c6ea;
  cursor: not-allowed;
}

.upload-box button:hover:not(:disabled) {
  background-color: #0056b3;
}

.upload-box p {
  margin: 10px 0;
  color: #333;
}
</style>
