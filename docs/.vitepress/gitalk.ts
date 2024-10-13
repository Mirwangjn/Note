import Gitalk from 'gitalk';
import 'gitalk/dist/gitalk.css';

export default function createGitalk(path: string) {
    const gitalk = new Gitalk({
        clientID: 'f3c2300c17cf97cc6a4e',
        clientSecret: '5ff8d815e41fe1b09f639073be20773040dc263a',
        repo: 'Note',
        owner: 'Mirwangjn',
        admin: ['Mirwangjn'],
        id: path,      // 确保唯一性和长度小于 50
        distractionFreeMode: false,  // 类似 facebook 的无干扰模式
        createIssueManually: false
    });
    gitalk.render('gitalk-container');
}