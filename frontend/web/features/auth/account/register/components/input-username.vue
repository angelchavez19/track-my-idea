<script setup lang="ts">
import { BACKEND_URL } from "~/config/api";
import { useSchemas } from "~/composables/form/use-schemas";

interface Props {
  label: string;
}
defineProps<Props>();

const { $axios } = useNuxtApp();
const { UsernameSchema } = useSchemas();

const username = ref("");
const availableUsername = ref<string>("");
const isChecking = ref(false);

let debounceTimeout: ReturnType<typeof setTimeout>;

const checkUsername = async () => {
  if (!username.value || !UsernameSchema.safeParse(username.value).success) {
    availableUsername.value = "";
    return;
  }

  isChecking.value = true;
  try {
    const { data } = await $axios.get(
      `${BACKEND_URL}/auth/user/find-username-available`,
      { params: { username: username.value } }
    );

    availableUsername.value = data || null;
  } finally {
    isChecking.value = false;
  }
};

const selectUsername = (suggested: string) => {
  username.value = suggested;
  availableUsername.value = "";
};

const isAvailable = computed(() => {
  if (!availableUsername.value) return false;
  return availableUsername.value === username.value;
});

watch(username, () => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(checkUsername, 300);
});
</script>

<template>
  <FormInputText
    v-model="username"
    :label="label"
    name="username"
    autocomplete="username"
    :schema="UsernameSchema"
  >
    <template #help>
      <div class="help-text" v-if="!isChecking">
        <p v-if="isAvailable" class="UserAvailable">
          {{ $t("form.inputs.username.available") }}
        </p>
        <p v-else-if="availableUsername" class="UserUnavailable">
          {{ $t("form.inputs.username.unAvailable") }}
          <a
            class="suggested-username"
            @click.prevent="selectUsername(availableUsername)"
            href="#"
          >
            {{ availableUsername }}
          </a>
        </p>
      </div>
    </template>
  </FormInputText>
</template>

<style scoped lang="sass">
.help-text
  display: block
  margin-top: 0.25rem
  font-size: 0.875rem

  .UserAvailable
    color: var(--success)
  .UserUnavailable
    color: var(--error)

    .suggested-username
      color: #3b82f6
      cursor: pointer
      text-decoration: underline
      font-weight: 600

    .suggested-username:hover
      color: #2563eb
</style>
