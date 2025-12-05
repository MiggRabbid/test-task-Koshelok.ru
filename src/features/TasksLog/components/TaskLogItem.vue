<!-- src/features/TasksLog/TaskLogItem.vue -->
<script setup lang="ts">
import { defineProps } from "vue";
import { formatDate } from "@/utils";
import type { IChangeLog, TypeChangeAction } from "@/types";

const props = defineProps<{
	log: IChangeLog;
}>();

const actionTranslations: Record<TypeChangeAction, string> = {
	added: "Добавлена",
	completed: "Завершена",
	deleted: "Удалена",
	updated: "Обновлена",
};
</script>

<template>
  <v-list-item v-memo="String(log.id)">
    <v-container class="px-0 py-0">
      <v-list-item-title class="font-weight-medium d-flex align-center justify-start ga-1">
        <v-chip size="small">{{ actionTranslations[log.action] }}</v-chip>
        <p class="h-100">{{ log.taskTitle }}</p>
      </v-list-item-title>
      <v-list-item-subtitle class="ml-1 mt-1">
        {{ formatDate(log.timestamp) }}
      </v-list-item-subtitle>
    </v-container>
  </v-list-item>
</template>

<style scoped></style>
