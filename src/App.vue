<template lang="pug">
    .container-fluid.p-0.d-flex.flex-column.h-100
        nav.navbar.navbar-expand-md.navbar-light.bg-light.border-bottom
            span.navbar-brand.pr-3 Text Icon Generator
            ul.navbar-nav.mr-auto
                li.nav-item
                    a.nav-link(href="#", title="New", @click.prevent="fileNew()")
                        | #[span.fas.fa-file.fa-fw] New
                li.nav-item
                    a.nav-link(href="#", title="Save SVG", @click.prevent="fileSaveSVG()")
                        | #[span.fas.fa-save.fa-fw] Save SVG
                li.nav-item
                    a.nav-link(href="#", title="Save PNG", @click.prevent="fileSavePNG()")
                        | #[span.fas.fa-image.fa-fw] Save PNG
            a.btn.btn-outline-primary.btn-sm.my-2(href="https://lixquid.com")
                | lixquid.com
        .d-md-flex.flex-grow-1
            .input-column.bg-light.p-2.h-100.border-right
                DocumentSettings.mb-2(v-model="current.document")
                BackgroundSettings.mb-2(v-model="current.background")
                TextSettings(v-model="current.text")
            .output-column.flex-grow-1.position-relative.h-100(:class="outputBgDark ? 'bg-dark' : 'bg-light'")
                SvgIcon(v-model="current", ref="iconRef")
                button.btn.btn-secondary.output-bg-button(@click.passive="outputBgDark = !outputBgDark")
                    span.fas.fa-adjust
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";
import DocumentSettings from "./components/DocumentSettings.vue";
import BackgroundSettings from "./components/BackgroundSettings.vue";
import TextSettings from "./components/TextSettings.vue";
import SvgIcon from "./components/SvgIcon.vue";
import { saveSvg, saveSvgAsPng } from "save-svg-as-png";
import { IIcon } from "./components/types";

function cleanIcon() {
    return {
        document: {
            name: "Icon",
            width: 256,
            height: 256
        },
        background: {
            color: { fill: "black" },
            radiusX: "",
            radiusY: ""
        },
        text: {
            text: "Aa",
            font: "Open Sans",
            fontWeight: "400",
            sizeRatio: 0.7,
            color: { fill: "white" }
        }
    };
}

export default defineComponent({
    components: {
        DocumentSettings,
        BackgroundSettings,
        TextSettings,
        SvgIcon
    },
    setup(_, instance) {
        const outputBgDark = ref(false);
        const current = ref(cleanIcon());
        const iconRef = ref<Vue>(null);

        function fileNew() {
            current.value = cleanIcon();
        }

        function fileSaveSVG() {
            const icon = iconRef.value?.$el;
            if (!icon) {
                return;
            }
            saveSvg(icon, current.value.document.name + ".svg");
        }

        function fileSavePNG() {
            const icon = iconRef.value?.$el;
            if (!icon) {
                return;
            }
            saveSvgAsPng(icon, current.value.document.name + ".png");
        }

        return {
            outputBgDark,
            current,
            iconRef,
            fileNew,
            fileSaveSVG,
            fileSavePNG
        };
    }
});
</script>

<style lang="stylus" scoped>
.input-column
    width 24rem

    @media (max-width: 767px)
        width 100%

.output-column
    overflow scroll

.output-bg-button
    position absolute
    top 1rem
    right 1rem

svg
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
</style>
