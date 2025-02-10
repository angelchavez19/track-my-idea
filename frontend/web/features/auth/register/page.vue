<script setup lang="ts">
// import { z } from "zod";

// const form = ref({
//   firstName: "",
//   lastName: "",
//   username: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// });

// const nameSchema = z.string().min(1).max(50);
// const emailSchema = z.string().email();
// const passwordSchema = z
//   .string()
//   .min(8)
//   .max(72)
//   .regex(/d+/, "Password must contain at least one number");
</script>

<template>
  <NuxtLayout name="auth">
    <template #title>Create an Account</template>

    <form class="Form" novalidate>
      <!-- <FormTextInput
        label="First Name"
        v-model="form.firstName"
        :schema="nameSchema"
        disable-html-validation
        required
        type="text"
      />
      <FormTextInput
        label="Last Name"
        v-model="form.lastName"
        :schema="nameSchema"
        disable-html-validation
        required
        type="text"
      />
      <FormTextInput
        label="Username"
        v-model="form.username"
        :schema="nameSchema"
        disable-html-validation
        required
        type="text"
      />
      <FormTextInput
        label="Email"
        v-model="form.email"
        :schema="emailSchema"
        disable-html-validation
        required
        type="email"
      />
      <FormPasswordInput
        label="Password"
        v-model="form.password"
        :schema="passwordSchema"
        disable-html-validation
        required
        type="password"
      />
      <FormPasswordInput
        label="Confirm your Password"
        v-model="form.confirmPassword"
        disable-html-validation
        required
        type="password"
      /> -->
    </form>
  </NuxtLayout>
</template>

<style scoped lang="sass">
.Form
  @include mixins.f-col()
  padding: 1rem 0
  width: 100%
  gap: 1rem
</style>
