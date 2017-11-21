/**
 * Created by YouHan on 2017/11/20.
 */
import React from "react";
import {Carousel} from "antd";
import styles from "./HomePage.css";

const HomePage = () => {
  return (
    <div className={styles.root}>
      home page
    </div>
  );
  return (
    <div className={styles.root}>
      <Carousel effect="fade" autoplay className={styles.carousel}>
        <img
          src='https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-180987.png'
          className={styles.image}
        />
        <img src='https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-38641.png' />
        <img src='https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-180987.png' />
        <img src='https://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-180987.png' />
      </Carousel>
    </div>
  );
};

export default HomePage;
