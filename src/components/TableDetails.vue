

<template>
  <div class="table-details">
    <h2>{{ table.table_name }}</h2>
    <p class="table-description">{{ table.table_description }}</p>

    <table>
      <thead>
        <tr>
          <th>Field Name</th>
          <th>Description</th>
          <th>Data Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(field, i) in normalizedFields" :key="i">
          <td>{{ field.field_name }}</td>
          <td>{{ field.field_description }}</td>
          <td>{{ field.data_type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'

const props = defineProps({
  table: {
    type: Object,
    required: true
  }
})

// Normalize so it works for both file formats
const normalizedFields = computed(() => {
  return (props.table.fields || []).map(field => ({
    field_name: field.field_name || field.Field || '',
    field_description: field.field_description || field.description || field.fieldDescription || '',
    data_type: field.data_type || field.Type || ''
  }))
})
</script>

<style scoped>
.table-details {
  background: #ffffff;
  border: 1px solid #e6eaf2;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 6px 24px rgba(16, 24, 40, 0.04);
}

.table-details h2 {
  font-size: 22px;
  margin-bottom: 6px;
  color: #1f2937;
}

.table-description {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
}

th,
td {
  padding: 12px 14px;
  border-bottom: 1px solid #eef2f6;
  text-align: left;
  font-size: 14px;
}

th {
  background: #f4f7fb;
  color: #334155;
  font-weight: 600;
}

tr:nth-child(even) td {
  background: #fafcff;
}

tr:hover td {
  background: #f2f7fe;
}
</style>
 
