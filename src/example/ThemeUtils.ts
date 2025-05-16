/**
 * 同步主题模式到 body 的 data-theme-mode 属性
 * @param themeMode 主题模式 'light' | 'dark'
 */
export const syncThemeMode = (themeMode: 'light' | 'dark') => {
  document.body.setAttribute('data-theme-mode', themeMode);
}; 