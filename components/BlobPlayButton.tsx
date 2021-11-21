import Blob from "./blob";
import { FiPlay } from "react-icons/fi"
import styles from '../styles/BlobPlayButton.module.css'

type Props = {
  onClick: () => void;
}

const BlobPlayButton = ({ onClick }: Props) => {
  return (
    <div className={styles.wrapper} style={{
      height: 200,
      width: 200,
    }}>
      <div className={styles.blob}>
        <Blob color="#126BFB" size={150} />
      </div>
      <div className={styles.blob}>
        <Blob color="#126BFB" opacity={0.18} size={200} />
      </div>
      <button type="button" className={styles.button} onClick={onClick}>
        <FiPlay />
      </button>
    </div>
  )
}

export default BlobPlayButton
