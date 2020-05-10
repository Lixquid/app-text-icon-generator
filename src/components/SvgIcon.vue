<template lang="pug">
    svg(:width="value.document.width", :height="value.document.height")
        defs
            mask#mainSvgMask
                rect(x=0, y=0, width="100%", height="100%")
                rect(
                    x=0
                    y=0
                    width="100%"
                    height="100%"
                    fill="white"
                    :rx="value.background.radiusX"
                    :ry="value.background.radiusY"
                )
                text#mainSvgText(
                    x="50%"
                    y="50%"
                    text-anchor="middle"
                    dominant-baseline="central"
                    fill="black"
                    :font-size="fontSize"
                    :font-family="'\"' + value.text.font + '\"'"
                    :font-weight="value.text.fontWeight"
                    v-if="value.text.color.knockout"
                ) {{value.text.text}}
        rect(
            x=0
            y=0
            width="100%"
            height="100%"
            :fill="value.background.color.fill"
            mask="url(#mainSvgMask)"
        )
        text#mainSvgText(
            x="50%"
            y="50%"
            text-anchor="middle"
            dominant-baseline="central"
            :fill="value.text.color.fill"
            :font-size="fontSize"
            :font-family="'\"' + value.text.font + '\"'"
            :font-weight="value.text.fontWeight"
            v-if="!value.text.color.knockout"
        ) {{value.text.text}}
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "@vue/composition-api";
import { IIcon } from "./types";

export default defineComponent({
    props: {
        value: {
            type: (Object as unknown) as () => IIcon,
            required: true
        }
    },
    setup(props, instance) {
        const fontSize = ref(20);

        watch(
            () => props.value,
            v => {
                if (v.text.text === "") return;
                setTimeout(() => {
                    const el = document.getElementById("mainSvgText");
                    if (!el) {
                        return;
                    }

                    const computedSize = ((el as unknown) as SVGTextContentElement).getComputedTextLength();
                    fontSize.value = Math.min(
                        Math.max(
                            Math.floor(
                                (fontSize.value *
                                    v.document.width *
                                    v.text.sizeRatio) /
                                    computedSize
                            ),
                            1
                        ),
                        v.document.height * v.text.sizeRatio
                    );
                });
            },
            { deep: true }
        );

        return { fontSize };
    }
});
</script>
