import styles from './Card1.module.scss';

const Card1 = ({ style, className, ...props }) => {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {props.children}
    </div>
  );
};

export default Card1;
