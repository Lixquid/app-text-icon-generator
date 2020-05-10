<template lang="pug">
    input.form-control(
        v-model="value.fill"
    )
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { IColorPlain } from "./types";

export default defineComponent({
    props: {
        value: {
            type: (Object as unknown) as () => IColorPlain,
            required: true
        }
    }
});
</script>
