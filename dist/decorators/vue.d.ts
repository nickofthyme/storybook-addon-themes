import { Theme } from '../models';
export declare const ThemeDecorator: {
    beforeDestroy(): void;
    computed: {
        theme(): Theme;
        themeClasses(): string;
    };
    data(): {
        themeName: any;
    };
    methods: {
        setThemeName(themeName: string): void;
    };
    mounted(): void;
    props: string[];
    template: string;
};
