// src/store/dataModelStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useDataModelStore = defineStore('dataModel', () => {
  const dataModel = ref([])

  const setDataModel = (rawData) => {
    const normalized = rawData.map(table => ({
      table_name: table.table_name || table.Table,
      table_description: table.table_description || table.description,
      fields: table.fields.map(f => ({
        field_name: f.field_name,
        field_description: f.field_description || f.description
      }))
    }))
    dataModel.value = normalized
  }

  return { dataModel, setDataModel }
})
