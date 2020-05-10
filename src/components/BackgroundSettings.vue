<template lang="pug">
    .card
        .card-header Background Settings
        .card-body
            .form-group
                label Color
                ColorPicker(v-model="value.color")
            .row
                .col
                    .form-group
                        label Radius X
                        input.form-control(
                            v-model="value.radiusX"
                        )
                .col-auto.p-0
                    .button-spacer a
                    button.btn.btn-secondary(
                        @click.passive="radiusLock = !radiusLock"
                    ) #[span.fas.fa-lock]
                .col
                    .form-group
                        label Radius Y
                        input.form-control(
                            v-model="value.radiusY"
                            :disabled="radiusLock"
                        )
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import { IBackgroundSettings } from "./types";
import ColorPicker from "./ColorPicker.vue";

export default defineComponent({
    components: {
        ColorPicker
    },
    props: {
        value: {
            type: (Object as unknown) as () => IBackgroundSettings,
            required: true
        }
    },
    setup(props) {
        const radiusLock = ref(true);

        watch(
            () => props.value.radiusX,
            v => {
                if (radiusLock.value) {
                    props.value.radiusY = props.value.radiusX;
                }
            }
        );

        return { radiusLock };
    }
});
</script>

<style lang="stylus" scoped>
.button-spacer
    padding-bottom .5rem
    color transparent
    line-height 1.5
</style>
