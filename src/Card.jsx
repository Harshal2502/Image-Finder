import React, { useState } from "react";
import Modal from 'react-modal';
import { LazyLoadImage } from "react-lazy-load-image-component";
import './App.css'

function Card({ user, urls, alt_description, likes }) {

    const [modalOpen, setmodalOpen] = useState(false)
    return (

        <div className='image'>
            <div>
                <p>{likes} Likes</p>
            </div>

            <div onClick={() => setmodalOpen(true)} style={{ cursor: "pointer" }}>
                <LazyLoadImage wrapperClass="image-wrapper" src={urls !== 'N/A' ? urls.raw : 'https://via.placeholder.com/400'} alt="image" />
            </div>

            <div onClick={() => setmodalOpen(true)} style={{ cursor: "pointer" }}>
                <h3>by {user.name}</h3>
            </div>

            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setmodalOpen(false)}
                style={{
                    content: {
                        margin: "auto 200px",
                        display: "grid",
                        justifyItems: "center",
                        textAlign: "center",
                        backgroundColor: "#212426",
                        color: "#ffffffd4"
                    },
                    overlay: {
                        backgroundColor: "rgba(123, 123, 123, 0.84)"
                    }
                }}
            >
                <h2 style={{ margin: "10px", marginBottom: 0, fontWeight: "bolder" }}>{user.name}</h2>
                <p>Total Likes: {likes}</p>
                <img style={{ width: "310px", margin: "10px", borderRadius: "10px" }} src={urls !== 'N/A' ? urls.raw : 'https://via.placeholder.com/400'} alt="image" />
                <p style={{ width: "80%" }}>[ {alt_description} ]</p>

                <h4 style={{ margin: "25px auto", fontWeight: "bold" }}>A little about Artist</h4>
                <img src={user.profile_image.medium} style={{ float: "left", margin: "5px 20px 5px 0" }}></img>
                <p style={{ margin: "5px auto" }}><span style={{ fontWeight: "bold" }}>Country of Origin: </span>{user.location == null ? "Photographer" : user.location}<br />
                    <span style={{ fontWeight: "bold" }}>Instagram: </span>{user.social.instagram_username == null ? "Unavailable" : "@" + user.social.instagram_username}<br />
                    <span style={{ fontWeight: "bold" }}>Bio: </span>{user.bio == null ? "didn't specify" : user.bio}</p>

                <button className="btn btn-light" onClick={() => setmodalOpen(false)}>Close</button>
            </Modal>
        </div>
    )
}

export default Card;