import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

const generateId = (path) => {
    return path
        .split('/') // 按照 / 切分
        .pop() // 取最后一个部分
        .replace(/\.html$/, ''); // 去掉结尾的 .html
};

export default function createGitalk(path: string) {
    const gitalk = new Gitalk({
        clientID: 'f3c2300c17cf97cc6a4e',
        clientSecret: '5ff8d815e41fe1b09f639073be20773040dc263a',
        repo: 'Note',
        owner: 'Mirwangjn',
        admin: ['Mirwangjn'],
        // 此id很重要, 此id对应着GitHub issue标签, 只有通过issue标签才可以显示对应的评论
        id: generateId(path),      // 确保唯一性和长度小于 50
        distractionFreeMode: false,  // 类似 facebook 的无干扰模式
    });

    gitalk.render('gitalk-container');
}