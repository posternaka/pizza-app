import React from 'react';

import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <h1 className={styles.root}> 
        <span>😕</span>
        <h1>Not found :(</h1>
        <p className={styles.description}>К сожалению данная страница отсутствует в нашем магазине</p>
    </h1>
  )
}

export default NotFoundBlock;