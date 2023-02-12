import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
    //Whole list data from parent
    const diaryList = useContext(DiaryStateContext);
    //curDate's data
    const [data, setData] = useState([]);
    //Selected Month => curDate
    const [curDate, setCurDate] = useState(new Date());
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ];
    const headText = `${months[curDate.getMonth()]} ${curDate.getFullYear()}`;

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();
            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();
    
            setData(
                diaryList.filter((it) => 
                firstDay <= it.date && it.date <= lastDay)
            ); //console.log(new Date(lastDay));
        }
    }, [diaryList, curDate]); //Only when curDate is changed

    const increaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
        );
    };

    const decreaseMonth = () => {
        setCurDate(
            new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
        );
    };

    return(
        <div>
            <MyHeader
                headText={headText}
                leftchild={<MyButton text={"<"} onClick={decreaseMonth} />}
                rightchild={<MyButton text={">"} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data}/>
        </div>
    );
};

export default Home;