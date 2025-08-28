<template>
  <div class="er-view" ref="erRef">
    <div class="header">
      <h2>ER Diagram</h2>
      <button class="fullscreen-btn" @click="toggleFullscreen">
        Fullscreen
      </button>
    </div>

    <div id="er-container">
      <VueFlow
        class="flow-canvas"
        :nodes="nodes"
        :edges="edges"
        :node-types="{ custom: 'custom' }"
        fit-view
      >
        <template #node-custom="{ data }">
          <div class="custom-node">
            <strong>{{ data.table_name }}</strong>
            <ul>
              <li v-for="(field, idx) in data.fields" :key="idx">
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
import { ref, watch, onMounted } from "vue";
import { useDataModelStore } from "@/store/dataModelStore";
import { VueFlow } from "@vue-flow/core";
import "@vue-flow/core/dist/style.css";
import "@vue-flow/core/dist/theme-default.css";

const store = useDataModelStore();
const erRef = ref(null);
const nodes = ref([]);
const edges = ref([]);

function buildDiagram() {
  if (!store.dataModel.tables.length || !store.dataModel.relationships.length) {
    nodes.value = [];
    edges.value = [];
    return;
  }
  
  console.log("Tables:", store.dataModel.tables);
  console.log("Relationships:", store.dataModel.relationships);
  
  nodes.value = store.dataModel.tables.map((table, i) => ({
    id: table.table_name,
    type: "custom",
    position: { x: i * 350, y: 100 },
    data: table,
  }));
  
  // edges.value = store.dataModel.relationships.map((rel, idx) => ({
  //   id: `e-${idx}`,
  //   source: rel.fromTable || rel.from,
  //   target: rel.toTable || rel.to,
  //   label: rel.on || rel.type || "",
  //   animated: true,
  // }));
  edges.value = store.dataModel.relationships.map((rel, idx) => ({
  id: `e-${idx}`,
  source: rel.fromTable || rel.from,
  target: rel.toTable || rel.to,
  label: rel.relationship?.type || rel.on || rel.type || "",
  animated: true,
}));

}

watch(() => store.dataModel, buildDiagram, { deep: true });

onMounted(() => {
  buildDiagram();
});

function toggleFullscreen() {
  const element = erRef.value;
  if (!document.fullscreenElement) {
    element?.requestFullscreen();
  } else {
    document.exitFullscreen?.();
  }
}
</script>

<style scoped>
.er-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f5f7fb;
  padding: 16px;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header h2 {
  margin: 0;
  font-weight: 600;
  color: #1f2937;
}

.fullscreen-btn {
  padding: 8px 12px;
  background: #eef2f7;
  border: 1px solid #dfe5ef;
  border-radius: 8px;
  font-size: 14px;
  color: #334155;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}
.fullscreen-btn:hover {
  background: #e7ecf5;
  border-color: #ccd5e4;
}

#er-container {
  flex: 1;
  border: 1px solid #e6eaf2;
  border-radius: 12px;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.06);
}

.flow-canvas {
  width: 100%;
  height: 100%;
}

/* Node styling inside VueFlow slot */
.custom-node {
  width: 240px;
  background: #cddeec;
  border: 1px solid #e6eaf2;
  border-radius: 10px;
  padding: 10px;
  text-align: left;
  box-shadow: 0 4px 16px rgba(16, 24, 40, 0.04);
}

.custom-node strong {
  display: block;
  font-size: 14px;
  color: #1f2937;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f3f8;
}

.custom-node ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.custom-node li {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 0;
  font-size: 12px;
  color: #0e1013;
  border-bottom: 1px solid #f7f9fc;
}

.custom-node li:last-child {
  border-bottom: none;
}

.custom-node small {
  color: #5e6774;
  white-space: nowrap;
}
</style>