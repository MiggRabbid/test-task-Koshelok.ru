<!-- src/features/TasksLog/TasksLogList.vue -->
<script setup lang="ts">
import { useChangeLogStore } from "@/store";
import { TaskLogItem } from "./";

const changeLogStore = useChangeLogStore();
</script>

<template>
  <v-list fluid lines="two" class="fill-width">
    <TaskLogItem v-for="(log) in changeLogStore.changeLog" :key="`TaskLogItem-${log.id}`" :log="log"/>
  </v-list>
</template>

<style scoped></style>
