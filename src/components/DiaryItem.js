import React from "react";
import { useNavigate } from "react-router-dom";
import { getStringDate } from "../util/date";
import MyButton from "./MyButton";


const DiaryItem = ({id, emotion, content, date}) => {
    const navigate = useNavigate();
    //const env = process.env;
    //env.PUBLIC_URL = env.PUBLIC_URL || "";
    const strDate = getStringDate(new Date(parseInt(date)));
    const goDetail = () => {
        navigate(`/diary/${id}`);
    }
    const goEdit = () => {
        navigate(`/edit/${id}`);
    }

    return (
        <div className="DiaryItem">
            <div onClick={goDetail}
            className={[
                "emotion_img_wrapper", 
                `emotion_img_wrapper_${emotion}`
                ].join(" ")}>
                <img src={process.env.PUBLIC_URL  + `assets/emotion${emotion}.png`}
                alt={`emotion_img_wrapper_${emotion}`}/>
            </div>
            <div onClick={goDetail} className="info_wrapper">
                <div className="diary_date">{strDate}</div>
                <div className="diary_content_preview">{content.slice(0, 25)}</div>
            </div>
            <div className="btn_wrapper">
                <MyButton onClick={goEdit} text={"Edit"}/>
            </div>
        </div>
    );
};
export default React.memo(DiaryItem);