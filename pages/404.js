import Image from 'next/image';
import error from '../public/Image/error.png';
import styles from '../styles/Notfound.module.css';

function notfound() {
  return <Image alt="err" src={error} className={styles.img} />;
}

export default notfound;
