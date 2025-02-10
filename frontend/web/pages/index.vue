<script setup lang="ts">
const router = useRouter();
const { langSelected } = useLang();

onMounted(() => {
  router.push(`/${langSelected.value}/auth/login`);
});
</script>

<template></template>
