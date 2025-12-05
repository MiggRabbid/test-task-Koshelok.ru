<script setup lang="ts">
import { computed, defineProps } from "vue";
import type { ITask, DeletionTimer } from "@/types";

const props = defineProps<{
	task: ITask;
	pendingDeletions: Set<number>;
	cancelDeletion: (id: number) => void;
	deletionTimers: Record<number, DeletionTimer>;
	startDeletion: (id: number) => void;
	toggleTask: (id: number) => void;
	formatDate: (date: Date | null) => string;
	formatTaskDate: (date: Date | null) => string;
}>();

const isTaskCompleted = computed(() => props.task.completed);
const formattedCreatedAt = computed(() =>
	props.formatDate(props.task.createdAt),
);
const formattedUpdatedAt = computed(() =>
	props.formatDate(props.task.updatedAt ?? null),
);
const formattedCompletedAt = computed(() =>
	props.task.completedAt ? props.formatTaskDate(props.task.completedAt) : "",
);

const deletionTimer = computed(
	() => props.deletionTimers[props.task.id]?.timeLeft || 10,
);
</script>

<template>
  <v-list-item :key="task.id">
    <template v-slot:prepend>
      <v-checkbox :model-value="isTaskCompleted" @update:model-value="toggleTask(task.id)" density="comfortable" />
    </template>

    <v-list-item-title :class="{ 'text-decoration-line-through text-grey': task.completed }" class="font-weight-medium">
      {{ task.title }}
    </v-list-item-title>

    <v-list-item-subtitle>
      Создано: {{ formattedCreatedAt }} | Обновлено: {{ formattedUpdatedAt }}
      <span v-if="isTaskCompleted">
        | Завершено: {{ formattedCompletedAt }}
      </span>
    </v-list-item-subtitle>

    <template v-slot:append>
      <div v-if="pendingDeletions.has(task.id)" class="deletion-pending">
        <v-chip color="error" size="small" class="mr-2">
          Удаление через {{ deletionTimer }}
        </v-chip>
        <v-btn @click="cancelDeletion(task.id)" variant="text" color="warning" size="small">
          Отмена
        </v-btn>
      </div>
      <v-btn v-else icon @click="startDeletion(task.id)" variant="text" color="error" size="small">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-list-item>
</template>

<style scoped></style>