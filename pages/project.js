import {
  Atom,
  AudioLines,
  Cat,
  Cpu,
  Ghost,
  Grip,
  LibraryBig,
  ListTodo,
  MountainSnow,
  PawPrint,
  Radiation,
  Receipt,
  Rss,
  Ship,
  User,
  Gamepad2
} from 'lucide-react'; // https://lucide.dev/icons/gamepad-2
import Head from 'next/head';
import Footer from '../components/Footer';
import Item from '../components/Project/Item';
import Wrapper from '../components/Wrapper';
import styles from '../styles/Project.module.css';

const Project = () => {
  return (
    <Wrapper>
      <Head>
        <title>My Projects</title>
      </Head>
      <div className={styles.container}>
        <p className={styles.title}>游戏项目</p>
        <div className={styles.list}>
          <Item
            name='风之幻想曲'
            description='冒险 / 独立 / 角色扮演'
            repo='https://store.steampowered.com/app/645690/Fantasia_of_the_Wind/'
          >
            {/* <img 
              src='https://shared.st.dl.eccdnx.com/store_item_assets/steam/apps/645690/header.jpg?t=1680426736'
              className={styles.imgIcon}
            ></img> */}
            <Gamepad2 className={styles.icon}/>
          </Item>
          <Item
            name='风之幻想曲2'
            description='冒险 / 独立 / 角色扮演'
            repo='https://store.steampowered.com/app/1006400/Fantasia_of_the_Wind_2/'
          >
            {/* <img 
              src='https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1006400/header.jpg?t=1680426793 '
              className={styles.imgIcon}
            ></img> */}
            <Gamepad2 className={styles.icon}/>
          </Item>
        </div>
        {/* <p className={styles.title}>Tools</p>
        <div className={styles.list}>
          <Item
            name='hackernews-cli-tool'
            description='A Hacker News CLI tool.'
            repo='https://github.com/KelvinQiu802/hackernews-cli-tool'
          >
            <Rss className={styles.icon} />
          </Item>
          <Item
            name='163-music-downloader'
            description='A tampermonkey script to download 163 music.'
            repo='https://github.com/KelvinQiu802/163MusicDownloaderScript'
          >
            <AudioLines className={styles.icon} />
          </Item>
        </div>
        <p className={styles.title}>Demo</p>
        <div className={styles.list}>
          <Item
            name='micro-react'
            description='A micro React that implements React core concepts.'
            repo='https://github.com/KelvinQiu802/micro-react'
          >
            <Atom className={styles.icon} />
          </Item>
          <Item
            name='mini-redux'
            description='Use the most simple Javascript to implement Redux core functions.'
            repo='https://github.com/KelvinQiu802/mini-redux'
          >
            <Radiation className={styles.icon} />
          </Item>
          <Item
            name='react-dnd-playground'
            description='React drag and drop examples playground.'
            repo='https://github.com/KelvinQiu802/react-dnd-playground'
          >
            <Grip className={styles.icon} />
          </Item>
        </div> */}
      </div>
      <Footer />
    </Wrapper>
  );
};

export default Project;
