/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import s from "./ModalWindow.module.css";
import { instanse } from "../../api/axios";
import closeImg from "../../assets/icons/close.svg";
import pinImg from "../../assets/icons/pin.svg";
import placeholoderImg from "../../assets/images/placeholder.png";

const ModalWindow = ({ visibility, id, onClose }) => {
    const apiKey = "rQaeytv5AYTE_8FgQt80rqbqp6mvw0WZSwy5fLbqbAs";
    const [photoData, setPhotoData] = useState({
        authorImg: null,
        authorName: null,
        authorNickname: null,
        image: null,
        location: null,
    });

    const closeModalWindow = () => {
        onClose();
        setPhotoData({
            authorImg: null,
            authorName: null,
            authorNickname: null,
            image: null,
            location: null,
        });
    };

    const getPhotoById = () => {
        instanse.get(`/photos/${id}/?client_id=${apiKey}`).then((res) => {
            const data = res.data;
            setPhotoData({
                authorImg: data.user.profile_image.medium,
                authorName: data.user.name,
                authorNickname: data.user.username,
                image: data.urls.regular,
                location: data.location.title,
            });
        });
    };

    useEffect(() => {
        getPhotoById();
    }, [visibility]);

    return (
        <div
            className={s.modalWindow}
            style={{ display: visibility ? "flex" : "none" }}
        >
            <button className={s.modalWindowClose} onClick={closeModalWindow}>
                <img
                    className={s.modalWindowCloseImg}
                    src={closeImg}
                    alt="close"
                />
            </button>
            <div className={s.modalWindowContent}>
                <div className={s.modalTopRow}>
                    <div className={s.author}>
                        <img
                            className={s.authorImg}
                            src={photoData.authorImg || placeholoderImg}
                        />
                        <div className={s.authorInfo}>
                            <div className={s.authorName}>
                                {photoData.authorName}
                            </div>
                            <div className={s.authorNickname}>
                                @{photoData.authorNickname}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ fontSize: 12 }}>{photoData.image}</div>
                <img
                    className={s.modalWindowImg}
                    src={photoData.image || placeholoderImg}
                />
                <div className={s.bottomRow}>
                    {photoData.location !== null ? (
                        <img
                            className={s.photoPlaceImg}
                            src={pinImg}
                            alt="pin"
                        />
                    ) : null}
                    <div className={s.photoPlaceText}>{photoData.location}</div>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
