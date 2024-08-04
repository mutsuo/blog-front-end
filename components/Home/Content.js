import Link from 'next/link';
import styles from '../../styles/Content.module.css';
import utilStyles from '../../styles/util.module.css';
import Divider from '../Divider';
import navStyles from '../../styles/Nav.module.css';
import { Github, Mail } from 'lucide-react';
import avatarStyles from '../../styles/Avatar.module.css';


const Content = () => {
  return (
    <div className={`${styles.content} ${utilStyles.plain}`}>
      <article>
        <p>
          你好，我是『睦生』，很高兴认识你👋
        </p>
        <p>
          本人目前主要从事{' '}
          <span className={utilStyles.stress}>
            后端开发
          </span>{' '}
          相关的工作，业余时间在做{' '}
          <span className={utilStyles.stress}>
          计算机视觉
          </span>{' '}
          相关的研究，待成果发表后考虑重拾{' '}
          <span className={utilStyles.stress}>
          游戏文案策划
          </span>{' '}
          的工作。
        </p>
        <p>目标是能在多个领域都有所涉猎，实现自由而全面的发展😉✌️</p>
      </article>
      <Divider />
      {/* <article>
        <p>
          ※ 或许有朋友会对『游戏文案策划』这组字眼感兴趣，其实列在这里兴许有点冠冕堂皇了，因为本人也不过是在大学时期为游戏制作组提供过一些设定案、撰写过一些文本而已。
          因此能有这些参与制作的机会，真的非常荣幸，感谢铃铛老师和制作组的小伙伴们🫰。
        </p>
        <p>
          我们的游戏在steam上架，可以在博客的{' '}
          <Link href='/project'>
            <a className={utilStyles.textLink}>project栏目</a>
          </Link>{' '}
          找到steam商店主页的链接。
        </p>
      </article>
      <Divider /> */}
      <article>
        <p>
          本站的前端部分基于{' '}
          <a
            href='https://github.com/kelvinqiu802'
            rel='noreferrer'
            target='_blank'
            className={utilStyles.textLink}
          >
            Kelvin Qiu
          </a>{' '}
          的开源项目进行二次开发，特此鸣谢。
        </p>
      </article>
      <Divider />
    </div>
  );
};

export default Content;
