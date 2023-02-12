import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App"

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

//Q1, Q2 Today's date + Today's emotion => From Util folder
import {getStringDate} from "../util/date";
import {emotionList} from "../util/emotion";

//isEdit, originData FROM Edit.js
//Edit = isEdit(true) / Create = isEdit(false)
const DiaryEditor = ({isEdit, originData}) => {
    
    //1.DATE
    const [date, setDate] = useState(getStringDate(new Date()));
    const navigate = useNavigate();

    //2.EMOTIOM
    const [emotion, setEmotion] = useState(3);
    //Selected emotion => props
    //onClick id data => EmotionItem id data
    const handleClickEmote = useCallback((emotion) => {
        setEmotion(emotion);
      }, []);

    //3. CONTENT
    const [content, setContent] = useState("");
    const contentRef = useRef();  //"Blank" content => focus()
    //4. SAVE
    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);
    const handleSubmit = () => {
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }
        if(
            window.confirm(
                isEdit ? "Do you want to edit this diary?" : "Do you want to write new diary?"
                )
            ){
                if(!isEdit) {
                    onCreate(date,content,emotion);
                }else{
                    onEdit(originData.id, date, content, emotion);
                }
            }
            navigate('/', {replace:true}); //Prevent going back
    };

    const handleRemove = () => {
        if (window.confirm("Do you want to delete?"+originData.id)) {
          onRemove(originData.id);
          navigate("/", { replace: true });
        }
    };

    useEffect(() => {
        if(isEdit){
            //show original date
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData])

    return(
        <div className="">
            {/* Header */}
            <MyHeader 
            headText={isEdit ? "Edit your diary" : "Write new diary"}
            leftchild={
                <MyButton 
                text={"Back"}
                onClick={() => navigate(-1)}
                />
                }
            rightchild={ isEdit &&
                <MyButton 
                text={"Delete"}
                type={"negative"}
                onClick={handleRemove}
                />
            }    
            />
            <div className="DiaryEditor">
                {/* Q1 */}
                <section>
                    <h4>What is the date today?</h4>
                    <div className="input_box">
                        <input 
                        className="input_date"
                        value={date} 
                        type="date" 
                        onChange={(e)=>setDate(e.target.value)}
                        />
                    </div>
                </section>
                {/* Q2 */}
                <section>
                    <h4>Today's feeling</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem 
                            key={it.emotion_id} {...it} 
                            onClick={handleClickEmote}
                            isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                {/* Q3 */}
                <section>
                    <h4>Today's Diary</h4>
                    <div className="input_box text_wrapper">
                        <textarea 
                        placeholder="How was your day?"
                        ref={contentRef} value={content}
                        onChange={(e) => setContent(e.target.value)}/>
                    </div>
                </section>
                {/* Q4 */}
                <section>
                    <div className="control_box">
                        <MyButton text={'Cancel'} 
                        onClick={()=>navigate(-1)}/>
                        <MyButton text={'Save'} 
                        type={'positive'} onClick={handleSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DiaryEditor;