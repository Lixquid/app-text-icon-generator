<template lang="pug">
    .card
        .card-header Text Settings
        .card-body
            .form-group
                label Text
                input.form-control(
                    v-model="value.text"
                )
            .row
                .col-8
                    .form-group
                        label Font Family
                        .input-group
                            input.form-control(
                                v-model="value.font"
                            )
                            .input-group-append
                                button.btn.btn-secondary.dropdown-toggle(data-toggle="dropdown")
                                .dropdown-menu
                                    each f in ["Open Sans", "Raleway", "Arial", "Font Awesome 5 Free", "Font Awesome 5 Pro"]
                                        a.dropdown-item(
                                            href="#"
                                            @click.prevent="value.font = \"" + f + "\""
                                        )= f
                .col-4
                    .form-group
                        label Weight
                        .input-group
                            input.form-control(
                                v-model="value.fontWeight"
                            )
                            .input-group-append
                                button.btn.btn-secondary.dropdown-toggle(data-toggle="dropdown")
                                .dropdown-menu
                                    each i in [1,2,3,4,5,6,7,8,9]
                                        a.dropdown-item(
                                            href="#"
                                            @click.prevent="value.fontWeight = " + i * 100
                                        )= i * 100
            .form-group
                label Size Ratio
                input.form-control(
                    v-model.number="value.sizeRatio"
                    type="number"
                    min="0.01"
                    max="1"
                    step="0.01"
                )
            .form-group
                label Color
                select.custom-select(v-model="colorInputs.type")
                    option(value=1) Plain
                    option(value=2) Knockout
                ColorPicker(v-model="colorInputs.plain", v-if="colorInputs.type == '1'")

</template>

<script lang="ts">
import { defineComponent, ref, watch } from "@vue/composition-api";
import { ITextSettings } from "./types";
import ColorPicker from "./ColorPicker.vue";

enum ColorType {
    Plain = "1",
    Knockout = "2"
}

export default defineComponent({
    components: {
        ColorPicker
    },
    props: {
        value: {
            type: (Object as unknown) as () => ITextSettings,
            required: true
        }
    },
    setup(props) {
        const colorInputs = ref({
            type: ColorType.Plain,
            plain: { fill: "white" }
        });

        watch(
            colorInputs,
            t => {
                switch (t.type) {
                    case ColorType.Plain:
                        props.value.color = {
                            fill: t.plain.fill
                        };
                        break;
                    case ColorType.Knockout:
                        props.value.color = {
                            knockout: true
                        };
                        break;
                }
            },
            { deep: true }
        );

        return { colorInputs };
    }
});
</script>
