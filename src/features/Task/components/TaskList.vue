
<script setup lang="ts">
import { computed } from "vue";
import { useTasksStore } from "@/store";
import { formatDate } from "@/utils";
import { TaskItem } from "./";

const tasksStore = useTasksStore();

const filteredTasks = computed(() => tasksStore.filteredTasks);
</script>

<template>

    <v-list fluid lines="two" class="elevation-1 rounded fill-width ">
      <TaskItem
        v-for="task in filteredTasks"
        :key="task.id"
        :task="task"
        :pendingDeletions="tasksStore.pendingDeletions"
        :deletionTimers="tasksStore.deletionTimers"
        :startDeletion="tasksStore.startDeletion"
        :cancelDeletion="tasksStore.cancelDeletion"
        :toggleTask="tasksStore.toggleTask"
        :formatDate="formatDate"
        :formatTaskDate="formatDate"
      />
    </v-list>


</template>

<style scoped></style>