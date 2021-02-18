import React, { useEffect, useState } from "react";
import s from "./MainPage.module.css";
import PlaceholderImg from "../../assets/images/placeholder.png";
import Search from "../../misc/Search/Search";
import { Link } from "react-router-dom";
import { instanse } from "../../api/axios";

const MainPage = () => {
    const apiKey = "rQaeytv5AYTE_8FgQt80rqbqp6mvw0WZSwy5fLbqbAs";
    const [backgroundPhotoUrl, setBackgroundPhotoUrl] = useState("");
    const [trends] = useState([
        "flower",
        "wallpapers",
        "backgrounds",
        "happy",
        "love",
    ]);
    const [searchProps, setSearchProps] = useState({ hideResults: true });

    const getBackgroundPhoto = () => {
        instanse
            .get(
                `/photos/random?query=wallpapers&orientation=landscape&client_id=${apiKey}`
            )
            .then((res) => {
                setBackgroundPhotoUrl(res.data.urls.regular);
            });
    };

    const handleTrendClick = (trend) => {
        setSearchProps({ ...searchProps, trend });
    };

    useEffect(() => {
        getBackgroundPhoto();
    }, []);

    return (
        <div className={s.mainPageWrapper}>
            <div className={s.backgroundWrapper}>
                <img
                    className={s.backgroundImg}
                    src={backgroundPhotoUrl || PlaceholderImg}
                    alt="background"
                />
                <div className={s.backgroundMask}>
                    <div className={s.contentWrapper}>
                        <div className={s.title}>Unsplash</div>
                        <div className={s.subTitle}>
                            The internet source of freely-usable images.
                        </div>
                        <div className={s.poweredBy}>
                            Powered by creators everywhere.
                        </div>
                        <Search {...searchProps} />
                        <div className={s.trends}>
                            Trending:{" "}
                            {trends.map((trend, index) => (
                                <Link
                                    to={`/results/${trend}`}
                                    className={s.trendsItem}
                                    key={index}
                                    onClick={() => handleTrendClick(trend)}
                                >
                                    {trend}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
