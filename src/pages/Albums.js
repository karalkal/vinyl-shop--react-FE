import { useLocation, useParams } from 'react-router-dom';

import Card from '../components/Card';
import styles from "./Albums.module.css"


const Albums = ({ selectedSubReddit, selectedCriterion }) => {
    const location = useLocation()
    const searchQuery = location.state.searchQuery
    const postsArray = location.state.postsArray

    if (!postsArray) {
        console.log("Nada!")
        return
    }
    return (
        <>
            <div className={styles.galleryTitle}>
                <span className={styles.galleryCriterion}>{displayedCriterion}
                    &nbsp;in&nbsp;
                </span>
                <img src={selectedSubReddit.icon} alt={selectedSubReddit.name} className={styles.galleryIcon}></img>
                <span className={styles.galleryRedditName}>r/{selectedSubReddit.name}</span>
            </div>

            <h2 className={styles.gallerySubtitle} title={titleOnHover}>{displayedSubtitle}</h2>

            <div className={styles.galleryContainer}>
                {postsArray.map(rslt =>
                    <Card result={rslt} key={rslt.id} />
                )}

            </div>
        </>
    );
};

export default Albums;
