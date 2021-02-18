import React, { useEffect, useState } from "react";
import s from "./Search.module.css";
import { instanse } from "../../api/axios";
import Results from "../Results/Results";
import { useHistory } from "react-router-dom";

const Search = ({ hideResults, trend, grayBg }) => {
    const history = useHistory();
    const apiKey = "rQaeytv5AYTE_8FgQt80rqbqp6mvw0WZSwy5fLbqbAs";
    const [val, setVal] = useState("");
    const [relatedSearches, setRelatedSearches] = useState({
        isRelatedVisible: false,
        relatedSearches: [],
    });
    const [resultsProps, setResultsProps] = useState({});

    const getRelatedWords = (value) => {
        if (value.length >= 3) {
            instanse
                .get(`/search/?query=${value}&client_id=${apiKey}`)
                .then((res) => {
                    setRelatedSearches({
                        isRelatedVisible: true,
                        relatedSearches: res.data.related_searches,
                    });
                });
        } else {
            setRelatedSearches({
                ...relatedSearches,
                isRelatedVisible: false,
            });
        }
    };

    const getSearchWord = () => {
        const path = history.location.pathname;
        const directories = path.split("/");
        const lastDirecotry = directories[directories.length - 1];
        setVal(lastDirecotry);
        setResultsProps({ value: lastDirecotry });
    };

    const handleRelatedWordClick = (val) => {
        handleLocation(val);
        setResultsProps({ value: val });
        setVal(val);
    };

    const handleEnterPress = (e) => {
        if (e.key === "Enter") {
            handleLocation(e.target.value);
            setResultsProps({ value: e.target.value });
        }
    };

    const handleLocation = (directory) => {
        if (history.location.pathname === "/") {
            history.push(`results/${directory}`);
        }
    };

    useEffect(() => {
        getSearchWord();
        getRelatedWords(trend || []);
        setVal(trend);
    }, [trend]);

    return (
        <div className={s.searchWrapper}>
            <div className={s.inputWrapper}>
                <input
                    className={grayBg ? s.searchInputGray : s.searchInput}
                    placeholder="Search free high-resolution photos"
                    value={val}
                    onChange={(e) => {
                        getRelatedWords(e.target.value);
                        setVal(e.target.value);
                    }}
                    onKeyDown={(e) => handleEnterPress(e)}
                />
            </div>
            <div
                style={{
                    display: relatedSearches.isRelatedVisible
                        ? "block"
                        : "none",
                }}
                className={s.relatedSearch}
            >
                {relatedSearches.relatedSearches.length > 0 ? (
                    relatedSearches.relatedSearches.map((val, index) => (
                        <button
                            className={s.relatedSearchItem}
                            key={index}
                            onClick={() => handleRelatedWordClick(val.title)}
                        >
                            {val.title}
                        </button>
                    ))
                ) : (
                    <div className={s.relatedSearchAlert}>No results...</div>
                )}
            </div>

            {hideResults ? null : (
                <div>
                    <div className={s.searchTitle}>
                        {val || resultsProps.value}
                    </div>{" "}
                    <Results {...resultsProps} />
                </div>
            )}
        </div>
    );
};

export default Search;
