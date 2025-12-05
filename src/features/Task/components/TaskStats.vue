<script setup lang="ts">
import { useTasksStore } from "@/store";
import { computed } from "vue";

const tasksStore = useTasksStore();

const taskStats = computed(() => tasksStore.taskStats);
</script>

<template>
  <v-card class="mt-6">
    <v-card-text>
      <p>Всего задач: {{ taskStats.total }}</p>
      <p>Активных: {{ taskStats.active }}</p>
      <p>Завершенных: {{ taskStats.completed }}</p>
      <p>Процент завершения: {{ taskStats.percentage }}%</p>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>