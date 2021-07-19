import { API } from '@storybook/api';
import { Theme, ThemeConfig } from './models';
export declare const defaultOptions: ThemeConfig;
export declare function getConfigFromApi(api: API): ThemeConfig;
export declare function getConfig(parameters: ThemeConfig | Theme[]): ThemeConfig;
export declare function getSelectedThemeName(list: Theme[], defaultTheme?: string, currentSelectedValue?: string): string;
export declare function getSelectedTheme(list: Theme[], themeName: string): Theme;
