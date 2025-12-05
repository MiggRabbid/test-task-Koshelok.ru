<script setup lang="ts">
import { AppHeader } from "@/shared/Layouts";
import { Tasks } from "@/features/Task";
import { TasksLog } from "@/features/TasksLog";
</script>

<template>
  <v-app class="fill-height">
    <AppHeader />
    <v-main class="fill-height">
      <v-container fluid class="fill-height fill-width">
        <v-row class="fill-height">
          <Tasks />
          <TasksLog />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>