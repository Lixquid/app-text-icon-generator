<template lang="pug">
    CollapsibleCard(title="Document Settings")
        .form-group
            label Name
            input.form-control(v-model="value.name")
        .row
            .col
                .form-group
                    label Width
                    input.form-control(
                        v-model.number="value.width"
                        type="number"
                        min="1"
                        step="1"
                    )
            .col-auto.p-0
                .button-spacer a
                button.btn.btn-secondary(
                    @click.passive="heightLock = !heightLock"
                ) #[span.fas.fa-lock]
            .col
                .form-group
                    label Height
                    input.form-control(
                        v-model.number="value.height"
                        type="number"
                        min="1"
                        step="1"
                        :disabled="heightLock"
                    )
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import { IDocumentSettings } from "./types";
import CollapsibleCard from "./CollapsibleCard.vue";

export default defineComponent({
    components: {
        CollapsibleCard
    },
    props: {
        value: {
            type: (Object as unknown) as () => IDocumentSettings,
            required: true
        }
    },
    setup(props) {
        const heightLock = ref(true);

        watch(
            () => props.value.width,
            v => {
                if (heightLock.value) {
                    props.value.height = props.value.width;
                }
            }
        );
        watch(heightLock, v => {
            if (v) {
                props.value.height = props.value.width;
            }
        });

        return {
            heightLock
        };
    }
});
</script>

<style lang="stylus" scoped>
.button-spacer
    padding-bottom .5rem
    color transparent
    line-height 1.5
</style>
