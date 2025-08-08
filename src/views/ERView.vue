<!-- <template>
  <div class="er-view">
    <div class="header">
      <h2>ER Diagram</h2>
      <button class="fullscreen-btn" @click="toggleFullscreen">⛶ Fullscreen</button>
    </div>
    <div id="network" ref="networkRef"></div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useDataModelStore } from '@/store/dataModelStore'
import { Network } from 'vis-network'

const store = useDataModelStore()
const networkRef = ref(null)

const relationships = computed(() => {
  const links = []
  const tables = store.dataModel

  tables.forEach(source => {
    source.fields.forEach(field => {
      tables.forEach(target => {
        if (
          source.table_name !== target.table_name &&
          target.fields.some(f => f.field_name === field.field_name)
        ) {
          links.push({
            from: source.table_name,
            to: target.table_name,
            label: field.field_name
          })
        }
      })
    })
  })

  return links
})

onMounted(() => {
  const nodes = store.dataModel.map(table => ({
    id: table.table_name,
    label: table.table_name,
    shape: 'box',
    font: { face: 'Segoe UI', size: 14 },
    color: {
      background: '#f0f4f8',
      border: '#aac8e4'
    },
    margin: 12
  }))

  const edges = relationships.value.map(rel => ({
    from: rel.from,
    to: rel.to,
    arrows: 'to',
    label: rel.label,
    font: { align: 'middle', color: '#555' },
    color: { color: '#bbb' }
  }))

  const container = networkRef.value
  const data = { nodes, edges }

  const options = {
    layout: {
      improvedLayout: true,
      hierarchical: false
    },
    physics: {
      enabled: false
    },
    interaction: {
      zoomView: true,
      dragView: true
    },
    edges: {
      smooth: {
        type: 'cubicBezier',
        roundness: 0.4
      }
    }
  }

  new Network(container, data, options)
})

// Toggle fullscreen mode
function toggleFullscreen() {
  const element = networkRef.value
  if (!document.fullscreenElement) {
    element.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}
</script>

<style scoped>
.er-view {
  height: 100vh;
  background-color: #f4f6f8;
  padding: 16px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

h2 {
  color: #1e3a5f;
  margin: 0;
}

.fullscreen-btn {
  padding: 8px 14px;
  background-color: #c5d7e5;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: #1e3a5f;
  transition: background-color 0.2s ease;
}

.fullscreen-btn:hover {
  background-color: #b3cbe0;
}

#network {
  width: 100%;
  height: 90%;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: white;
}
</style> -->




<!-- src/views/ERView.vue -->
<template>
  <div class="er-view">
    <div class="header">
      <h2>ER Diagram</h2>
      <button class="fullscreen-btn" @click="toggleFullscreen">⛶ Fullscreen</button>
    </div>
    <div id="er-container" ref="erRef">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        fit-view-on-init
        :nodes-draggable="true"
        :zoom-on-scroll="true"
        class="flow-canvas"
      >
        <template #node-custom="{ data }">
          <div class="custom-node">
            <strong>{{ data.table_name }}</strong>
            <ul>
              <li v-for="field in data.fields" :key="field.field_name">
                <span>{{ field.field_name }}</span>
                <small>{{ field.data_type }}</small>
              </li>
            </ul>
          </div>
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataModelStore } from '@/store/dataModelStore'
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

const store = useDataModelStore()
const erRef = ref(null)
const nodes = ref([])
const edges = ref([])

// Build nodes and edges from the data model
const relationships = computed(() => {
  const links = []
  const tables = store.dataModel

  tables.forEach(source => {
    source.fields.forEach(field => {
      tables.forEach(target => {
        if (
          source.table_name !== target.table_name &&
          target.fields.some(f => f.field_name === field.field_name)
        ) {
          links.push({
            from: source.table_name,
            to: target.table_name,
            on: field.field_name
          })
        }
      })
    })
  })

  return links
})

onMounted(() => {
  // Create nodes from tables
  nodes.value = store.dataModel.map((table, i) => ({
    id: table.table_name,
    type: 'custom',
    position: { x: i * 350, y: 100 },
    data: table
  }))

  // Create edges from relationships
  edges.value = relationships.value.map((rel, idx) => ({
    id: `e-${idx}`,
    source: rel.from,
    target: rel.to,
    label: rel.on,
    animated: true
  }))
})

// Toggle fullscreen mode
function toggleFullscreen() {
  const element = erRef.value
  if (!document.fullscreenElement) {
    element.requestFullscreen?.()
  } else {
    document.exitFullscreen?.()
  }
}
</script>

<style scoped>
.er-view {
  height: 100vh;
  background-color: #f4f6f8;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

h2 {
  color: #1e3a5f;
  margin: 0;
}

.fullscreen-btn {
  padding: 8px 14px;
  background-color: #c5d7e5;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: #1e3a5f;
  transition: background-color 0.2s ease;
}

.fullscreen-btn:hover {
  background-color: #b3cbe0;
}

#er-container {
  flex: 1;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: white;
  overflow: hidden;
}

.flow-canvas {
  width: 100%;
  height: 100%;
}

.custom-node {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  width: 200px;
  text-align: left;
}

.custom-node strong {
  display: block;
  font-size: 1em;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eee;
}

.custom-node ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.custom-node li {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.custom-node li:not(:last-child) {
  border-bottom: 1px solid #f5f5f5;
}

.custom-node small {
  color: #888;
}
</style>
