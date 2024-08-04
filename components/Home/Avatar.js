import Image from 'next/image';
import React from 'react';
import styles from '../../styles/Avatar.module.css';
import utilStyles from '../../styles/util.module.css';
import { Github, Mail } from 'lucide-react';

const Avatar = () => {
  const [index, setIndex] = React.useState(0);
  const ref = React.useRef();
  const words = ['睦 生'];

  setTimeout(() => {
    if (ref.current) {
      ref.current.classList.add(styles.out);
    }
  }, 2900);

  const handleEnd = () => {
    ref.current.classList.remove(styles.out);
    setIndex((prev) => (prev + 1 === words.length ? 0 : prev + 1));
  };

  return (
    <div className={styles.container}>
      <Image
        src='/avatar.gif'
        width={85}
        height={85}
        priority
        className={styles.avatar}
        alt='Avatar'
      />
      <div className={styles.description}>
        <h1 className={styles.name}>
          <span className={styles.name} ref={ref} onTransitionEnd={handleEnd}>{words[index]}</span>
          &nbsp;&nbsp;
          <a
              href='https://github.com/mutsuo'
              rel='noreferrer'
              target='_blank'
              className={utilStyles.textLink}
            >
            <Github className={styles.icon} />
          </a>
          &nbsp;
          <a
            href='mailto:outakashi@163.com'
            rel='noreferrer'
            target='_blank'
            className={utilStyles.textLink}
          >
            <Mail className={styles.icon} />
          </a>
        </h1>
        <p className={styles.tag}>后端开发工程师 / 游戏文案策划 / 计算机视觉领域学徒</p>
      </div>
    </div>
  );
};

export default Avatar;
