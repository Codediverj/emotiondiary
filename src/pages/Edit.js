import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const {id} = useParams(); 
    const diaryList = useContext(DiaryStateContext);

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerHTML = `Emotion Diary - Edit Diary ${id}`;
        // eslint-disable-next-line
      }, []);
    
    useEffect(()=>{
        if(diaryList.length >= 1){
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            ); //it.id is from useParams(id)
            if(targetDiary){
                setOriginData(targetDiary);
            }else{ //undefined or No-data id
                alert("Invalid path");
                navigate('/', {replace:true}); //Prevent going back
            }
        }
        // eslint-disable-next-line
    },[diaryList, id]); 

    //Bring DiaryEditor, if it has originData
    return(
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    );
};
export default Edit;