import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";


//!!! Same structure as Edit.js <Create 'diary/id' address part> 
const Diary = () => {
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();
    const [data, setData] = useState();

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `Emotion Diary - Diary ${id}`;
        // eslint-disable-next-line
      }, []);

    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            ); 
            if(targetDiary){
                setData(targetDiary);
            }else{ 
                alert("Invalid path");
                navigate('/', {replace:true});
            }
        }
        // eslint-disable-next-line
    },[diaryList, id]);

    if(!data){
        return <div className="DiaryPage">Loading...</div>;
    }else{
        const curEmotionData = emotionList.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        return (
        <div className="DiaryPage">
            <MyHeader 
            headText={`${getStringDate(new Date(data.date))} Diary`}
            leftchild={<MyButton text={"Back"} onClick={()=>navigate(-1)} />}
            rightchild={<MyButton text={"Edit"} onClick={()=>navigate(`/edit/${data.id}`)} />}
            />
            <article>
                <section>
                    <h4>Today's feeling</h4>
                    <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                        <img src={curEmotionData.emotion_img} alt={`${data.emotion}`} />
                        <div className="emotion_descript">
                            {curEmotionData.emotion_descript}
                        </div>
                    </div>
                </section>
                <section>
                    <h4>Today's Diary</h4>
                    <div className="diary_content_wrapper">
                        <p>{data.content}</p>
                    </div>
                </section>
            </article>
        </div>
        );
    }
};
export default Diary;