<script setup>
  import store from "../store";
  import { computed } from "vue";
  import {PlusIcon} from "@heroicons/vue/solid";
  import TButton from '../components/core/TButton.vue';
  import PageComponent from "../components/PageComponent.vue";
  import SurveyListItem from "../components/SurveyListItem.vue";

  const surveys = computed(() => store.state.surveys);

  store.dispatch("getSurveys");
</script>
