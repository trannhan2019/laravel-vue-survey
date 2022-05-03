<script setup>
  import { computed } from "vue";
  import { useStore } from "vuex";
  import {EyeIcon, PencilIcon} from "@heroicons/vue/solid";
  import PageComponent from "../components/PageComponent.vue";
  import TButton from "../components/core/TButton.vue";
  import DashboardCard from "../components/core/DashboardCard.vue";

  const store = useStore();

  const loading = computed(() => store.state.dashboard.loading);
  const data = computed(() => store.state.dashboard.data);

  store.dispatch("getDashboardData");
</script>

<template>
  <PageComponent title="Dashboard">

  </PageComponent>
</template>
