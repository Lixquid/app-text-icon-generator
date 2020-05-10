<template lang="pug">
    .card
        button.btn.card-header(@click.passive="collapsed = !collapsed")
            | {{title}}
            span.float-right.fas(
                :class="collapsed ? 'fa-caret-down' : 'fa-caret-up'"
            )
        .card-body(v-if="!collapsed")
            slot
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        }
    },
    setup() {
        const collapsed = ref(true);
        return { collapsed };
    }
});
</script>

<style lang="stylus" scoped>
.card-header .fas
    line-height 1.5
</style>
