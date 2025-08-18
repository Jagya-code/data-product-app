
<template>
  <div class="landing-page">
    <!-- Upload Source Data Dictionary -->
    <div class="upload-box">
      <h2>Upload Source Data Dictionary</h2>
      <button @click="chooseFile('source')">Choose Source File</button>
      <button @click="loadSourceFile" :disabled="!sourceFileData">Load Source Data</button>
      <input type="file" id="sourceFileInput" accept=".json" @change="handleSourceFile" hidden />
      <p v-if="sourceFileName">Selected: {{ sourceFileName }}</p>
    </div>

    <!-- Upload Data Model -->
    <div class="upload-box">
      <h2>Upload Data Model</h2>
      <button @click="chooseFile('model')">Choose Model File</button>
      <button @click="loadModelFile" :disabled="!modelFileData">Load Model Data</button>
      <input type="file" id="modelFileInput" accept=".json" @change="handleModelFile" hidden />
      <p v-if="modelFileName">Selected: {{ modelFileName }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDataModelStore } from '@/store/dataModelStore'

const store = useDataModelStore()

// File states
const sourceFileData = ref(null)
const sourceFileName = ref('')
const modelFileData = ref(null)
const modelFileName = ref('')

// Trigger file input click
function chooseFile(type) {
  document.getElementById(type === 'source' ? 'sourceFileInput' : 'modelFileInput').click()
}

// Handle file selection
function handleSourceFile(event) {
  const file = event.target.files[0]
  if (!file) return
  sourceFileName.value = file.name
  readFile(file, (result) => (sourceFileData.value = result))
}

function handleModelFile(event) {
  const file = event.target.files[0]
  if (!file) return
  modelFileName.value = file.name
  readFile(file, (result) => (modelFileData.value = result))
}

// Read file helper
function readFile(file, callback) {
  const reader = new FileReader()
  reader.onload = () => callback(reader.result)
  reader.readAsText(file)
}
function normalizeDataDictionary(data) {
  return data.map(table => ({
    table_name: table.table_name || table.Table || '',
    table_description: table.table_description || table.description || '',
    fields: (table.fields || []).map(field => ({
      field_name: field.field_name || field.Field || '',
      field_description: field.field_description || field.description || field.fieldDescription || '',
      data_type: field.data_type || field.Type || ''
    }))
  }))
}

function loadSourceFile() {
  try {
    const parsed = JSON.parse(sourceFileData.value);

    // If it's wrapped in source_data, unwrap it
    const tablesArray = Array.isArray(parsed) 
      ? parsed 
      : parsed?.source_data || [];

    if (!Array.isArray(tablesArray) || tablesArray.length === 0) {
      alert('Invalid Source Data Dictionary format.');
      return;
    }

    const normalized = normalizeDataDictionary(tablesArray);
    store.setDataDictionary(normalized);
    store.showingSource = true; // tell UI to show source dictionary
    alert('Source Data Dictionary Loaded Successfully!');
  } catch (err) {
    alert('Invalid JSON format for Data Dictionary.');
    console.error(err);
  }
}
function loadModelFile() {
  try {
    const parsed = JSON.parse(modelFileData.value)

    if (!parsed?.schema?.tables || !parsed?.schema?.relationships) {
      alert('Invalid Data Model format.')
      return
    }

    // Normalize table fields
    const normalizedTables = parsed.schema.tables.map(table => {
      return {
        table_name: table.tableName || table.Table || '',
        table_description: table.description || '',
        fields: table.fields.map(field => ({
          field_name: field.field_name || field.fieldName || '',
          field_description: field.description || field.fieldDescription || '',
          data_type: field.data_type || field.dataType || ''
        }))
      }
    })

    store.setDataModel({
      tables: normalizedTables,
      relationships: parsed.schema.relationships
    })
    store.showingSource = false

    console.log('Tables after normalization:', store.dataModel.tables)
    alert('Data Model Loaded Successfully!')
  } catch (err) {
    alert('Invalid JSON format for Data Model.')
    console.error(err)
  }
}

</script>

<style scoped>
.landing-page {
  background: #f5f7fb;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  padding: 4rem 2rem;
  box-sizing: border-box;
}

.upload-box {
  width: 420px;
  background: #ffffff;
  border: 1px solid #e6eaf2;
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(16, 24, 40, 0.06);
  padding: 1.75rem;
  text-align: center;
}

.upload-box h2 {
  margin: 0 0 1rem;
  font-weight: 600;
  color: #1f2937;
}

.upload-box button {
  margin: 10px 8px 0;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid #d2d7e1;
  border-radius: 8px;
  background: #eef2f7;
  color: #334155;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.upload-box button:hover:not(:disabled) {
  background: #e6ebf3;
  border-color: #c7cede;
}

.upload-box button:disabled {
  background: #f1f4f8;
  color: #9aa4b2;
  cursor: not-allowed;
}

.upload-box p {
  margin: 12px 0 0;
  color: #475569;
  font-size: 14px;
  word-break: break-all;
}
</style>

