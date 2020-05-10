export interface IIcon {
    document: IDocumentSettings;
    background: IBackgroundSettings;
    text: ITextSettings;
}

export interface IDocumentSettings {
    name: string;
    width: number;
    height: number;
}

export interface IBackgroundSettings {
    color: IColorPlain;
    radiusX: string;
    radiusY: string;
}

export interface ITextSettings {
    text: string;
    font: string;
    fontWeight: string;
    sizeRatio: number;
    color: IColorPlain | IColorKnockout;
}

export interface IColorPlain {
    fill: string;
}

export interface IColorKnockout {
    knockout: true;
}
