// global.d.ts

declare module "*.svg" {
    const content: React.FC<React.SVGProps<SVGSVGElement>>;

    export default content;
}

declare namespace JSX {
    interface IntrinsicElements {
        "dbox-widget": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement>,
            HTMLElement
        > & {
            campaign?: string;
            type?: string;
            "enable-auto-scroll"?: string | boolean;
        };
    }
}
