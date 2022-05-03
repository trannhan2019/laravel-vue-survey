<script setup>
  const props = defineProps({
    title: String,
  });
</script>

<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 v-if="title" class="text-3xl font-bold text-gray-900">
        {{ title }}
      </h1>
      <slot name="header"/>
    </div>
  </header>

  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 sm:px-0">
        <slot/>
      </div>
    </div>
  </main>
</template>
