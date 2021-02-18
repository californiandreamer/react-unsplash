import React, { useEffect, useState } from "react";
import s from "./Results.module.css";
import { instanse } from "../../api/axios";
import ModalWindow from "../../misc/ModalWindow/ModalWindow";
import placeholoderImg from "../../assets/images/placeholder.png";
import noResImg from "../../assets/images/nores.png";

const Results = ({ value }) => {
    const apiKey = "rQaeytv5AYTE_8FgQt80rqbqp6mvw0WZSwy5fLbqbAs";
    const [defValue, setDefValue] = useState(value);
    const [modalProps, setModalProps] = useState({ visibility: false });
    const [results, setResults] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    console.log("res", results);

    const getPhotos = () => {
        if (value) {
            instanse
                .get(
                    `/search?query=${value}&per_page=12&page=${pageNumber}&client_id=${apiKey}`
                )
                .then((res) => {
                    if (defValue === value) {
                        setResults([...results, ...res.data.photos.results]);
                    } else {
                        setResults(res.data.photos.results);
                    }
                });
        }
    };

    const onClose = () => {
        setModalProps({ visibility: false });
    };

    const loadMore = () => {
        setPageNumber((prev) => prev + 1);
        getPhotos();
    };

    const handleItemClick = (id, index) => {
        setModalProps({
            visibility: true,
            id: id,
            onClose,
        });
    };

    useEffect(() => {
        setResults([]);
        setPageNumber(1);
        getPhotos();
        setDefValue(value);
    }, [value]);

    return (
        <div>
            <ModalWindow {...modalProps} />
            <div className={s.resultsWrapper}>
                {results.length > 0 ? (
                    results.map((res, index) => (
                        <button
                            className={s.resultsItem}
                            key={index}
                            onClick={() => handleItemClick(res.id, index)}
                        >
                            <img
                                className={s.resultsItemImg}
                                src={res.urls.regular || placeholoderImg}
                            />
                            <div className={s.categoriesRow}>
                                {res.categories.length > 0 ? (
                                    <div className={s.categoriesItem}>
                                        {res.categories}
                                    </div>
                                ) : null}
                            </div>
                        </button>
                    ))
                ) : (
                    <div className={s.resultsAlert}>
                        <img
                            className={s.resultsAlertImg}
                            src={noResImg}
                            alt="nothing found"
                        />
                    </div>
                )}
                <div className={s.loadMoreRow}>
                    <button className={s.loadMoreBtn} onClick={loadMore}>
                        Load more...
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;
