<!-- src/components/TableDetails.vue -->
<template>
  <div>
    <h3>{{ table.table_name }}</h3>
    <p>{{ table.table_description }}</p>
    <ul>
      <li v-for="(field, i) in table.fields" :key="i">
        <strong>{{ field.field_name }}</strong>: {{ field.field_description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'


defineProps(['table'])
</script>
