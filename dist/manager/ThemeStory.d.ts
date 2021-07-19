import React from 'react';
import { Theme } from '../models';
interface Props {
    iframeId: string;
    selectedTheme: Theme;
    themes: Theme[];
    target?: string;
}
export declare const ThemeStory: React.FC<Props>;
export {};
