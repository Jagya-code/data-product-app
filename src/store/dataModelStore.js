import { defineStore } from 'pinia'
import { ref ,computed } from 'vue'

export const useDataModelStore = defineStore('dataModel', () => {
  const dataDictionary = ref([]) 
  const dataModel = ref({ tables: [], relationships: [] }) 
  const showingSource = ref(false) 
  
  const hasDataModel = computed(() => {
    return dataModel.value?.tables?.length > 0 && dataModel.value?.relationships?.length > 0
  })
  const setDataDictionary = (tables) => {
    dataDictionary.value = tables
    showingSource.value = true
  }

  const setDataModel = (model) => {
    dataModel.value = model
    showingSource.value = false
  }

  return {
    dataDictionary,
    dataModel,
    showingSource,
    setDataDictionary,
    setDataModel,
    hasDataModel
  }
})
