import Searchbar from "./Searchbar/Searchbar";
import styles from "./app.module.scss";
export const App = () => {
  return (
    <div className={styles.App}>
      React homework template
      <Searchbar/> 
    </div>
  );
};
