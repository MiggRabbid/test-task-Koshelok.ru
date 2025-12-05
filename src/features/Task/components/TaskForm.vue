
<script setup lang="ts">
import { ref } from "vue";
import { useTasksStore } from "@/store";

const tasksStore = useTasksStore();

const newTaskTitle = ref<string>("");

const handleSubmit = () => {
	if (newTaskTitle.value.trim()) {
		tasksStore.addTask(newTaskTitle.value.trim());
		newTaskTitle.value = "";
	}
};
</script>

<template>
  <v-form @submit.prevent="handleSubmit" class="mt-4 mb-4">
    <v-text-field
      v-model="newTaskTitle"
      label="Новая задача"
      :rules="[value => !!value || 'Введите текст задачи']"
      variant="outlined"
      density="comfortable"
    />
    <v-btn type="submit" color="primary" class="mt-2">Добавить</v-btn>
  </v-form>
</template>


<style scoped></style>

