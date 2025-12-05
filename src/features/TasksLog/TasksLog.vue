<script setup lang="ts">
import { TasksLogList } from "./components";
</script>

<template>
  <v-col cols="4">
    <v-card>
      <v-card-title class="ml-4 mt-2">Лента изменений</v-card-title>
      <v-card-text>
        <TasksLogList />
      </v-card-text>
    </v-card>
  </v-col>

</template>


<style scoped></style>
