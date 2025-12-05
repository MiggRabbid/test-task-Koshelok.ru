<script setup lang="ts">
import { TaskList, TaskFilters, TaskForm, TaskStats } from "@/features/Task/components";
</script>

<template>
  <v-col cols="8" md="8">
    <TaskFilters />
    <TaskForm />
    <TaskList />
    <TaskStats />
  </v-col>
</template>

<style scoped></style>
