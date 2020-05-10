declare module "*.vue" {
    import Vue from "vue";
    export default Vue;
}

declare module "save-svg-as-png" {
    const saveSvg: (el: Element, filename: string) => void;
    const saveSvgAsPng: (el: Element, filename: string) => void;
}
