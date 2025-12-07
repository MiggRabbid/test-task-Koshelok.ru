
<script setup lang="ts">
import { computed } from "vue";
import { useTasksStore } from "@/store";
import { TypeFilter } from "@/types";

const tasksStore = useTasksStore();

const taskCounters = computed(() => {
	const counter = {
		all: tasksStore.tasks.length,
		active: 0,
		completed: 0,
	};
	tasksStore.tasks.forEach((task) => {
		if (task.completed) {
			counter.completed += 1;
		} else {
			counter.active += 1;
		}
	});
	return counter;
});
</script>

<template>
  <div class="filter-section mb-4">
    <v-btn
      @click="tasksStore.setFilter(TypeFilter.All)"
      :class="{ 'bg-primary': tasksStore.currentFilter === TypeFilter.All }"
      variant="tonal"
      class="mr-2"
    >
      Все ({{ taskCounters.all }})
    </v-btn>
    <v-btn
      @click="tasksStore.setFilter(TypeFilter.Active)"
      :class="{ 'bg-primary': tasksStore.currentFilter === TypeFilter.Active }"
      variant="tonal"
      class="mr-2"
    >
      Активные ({{ taskCounters.active }})
    </v-btn>
    <v-btn
      @click="tasksStore.setFilter(TypeFilter.Completed)"
      :class="{ 'bg-primary': tasksStore.currentFilter === TypeFilter.Completed }"
      variant="tonal"
      class="mr-2"
    >
      Завершенные ({{ taskCounters.completed }})
    </v-btn>
  </div>
</template>

<style scoped>
.filter-section {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
