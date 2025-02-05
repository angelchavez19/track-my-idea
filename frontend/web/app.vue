<script setup lang="ts">
import "~/assets/globals.sass";
useSeoMeta({ title: "Track My Idea" });

const { changeTheme } = useTheme();
</script>

<template>
  <div>Hello World</div>
  <div>
    <button @click="changeTheme('system')">System</button>
    <button @click="changeTheme('light')">Light</button>
    <button @click="changeTheme('dark')">Dark</button>
  </div>
</template>
