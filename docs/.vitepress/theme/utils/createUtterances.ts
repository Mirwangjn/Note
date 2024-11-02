const UTTERANCES_SRC = 'https://utteranc.es/client.js';
const UTTERANCES_ORIGIN = 'https://utteranc.es';

/**
 * 创建并配置 Utterances 评论组件
 */
export const createUtterances = () => {
    try {
        // 创建并配置 Utterances 评论组件的脚本
        const utterances = window.document.createElement('script');
        utterances.type = 'text/javascript';
        utterances.async = true;

        // 设置 issue-term 为 pathname，即使用 URL 的路径部分作为 issue 标题
        utterances.setAttribute('issue-term', 'pathname');

        // 设置 issue 标签，此标签必须存在于你的 GitHub 仓库中
        utterances.setAttribute('label', 'Note');

        // 根据当前网站主题设置 Utterances 主题
        const isDark = [...document.documentElement.classList].includes('dark');
        const theme = isDark ? 'github-dark' : 'github-light';
        utterances.setAttribute('theme', theme);

        // 设置 GitHub 仓库地址
        utterances.setAttribute('repo', 'Mirwangjn/Note');

        // 设置跨域属性
        utterances.crossOrigin = 'anonymous';

        // 设置 Utterances 脚本的来源
        utterances.src = UTTERANCES_SRC;

        // 缓存查询结果
        const commentElement = window.document.getElementById('comment');
        const switchAppearanceElement = document.querySelector('.VPSwitchAppearance');

        // 将 Utterances 脚本添加到页面中
        if (commentElement) {
            commentElement.appendChild(utterances);
        } else {
            console.error('Element with id "comment" not found');
        }

        // 当主题切换时，同步 Utterances 主题
        if (switchAppearanceElement) {
            switchAppearanceElement.addEventListener('click', () => {
                // 获取当前主题
                const isDark = [...document.documentElement.classList].includes('dark');
                const theme = isDark ? 'github-dark' : 'github-light';

                // 构建消息以切换 Utterances 主题
                const message = {
                    type: 'set-theme',
                    theme: theme,
                };

                // 查找 Utterances iframe 元素
                const utteranc = document.querySelector('.utterances-frame') as HTMLIFrameElement;
                if (utteranc) {
                    // 发送消息到 Utterances iframe 以应用新主题
                    utteranc.contentWindow?.postMessage(message, UTTERANCES_ORIGIN);
                } else {
                    console.error('Element with class "utterances-frame" not found');
                }
            });
        } else {
            console.error('Element with class "VPSwitchAppearance" not found');
        }

        
    } catch (error) {
        console.error('Error creating Utterances:', error);
    }
    
    
}