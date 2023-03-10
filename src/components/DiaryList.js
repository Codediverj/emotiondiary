import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";


const sortOptionList = [
    {value: "latest", name:"latest"},
    {value: "oldest", name:"oldest"},
];
const filterOptionList = [
    {value: "all", name:"All"},
    {value: "good", name:"Good"},
    {value: "bad", name:"Bad"},
];

//filtering
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((it, idx) => (
                <option key={idx} value={it.value}>
                    {it.name}
                </option>
            ))}
        </select>
    );
});

const DiaryList = ({ diaryList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");

    const getProcessedDiaryList = () => {
        const filterCallBack = (item) => {
            if(filter === "good") {
                return parseInt(item.emotion) <= 3;
            }else {
                return parseInt(item.emotion) > 3;
            }
        }

        const compare = (a,b) => {
            if(sortType === "latest"){
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        //DiaryList의 깊은복사
        //stringify (make string) => parse (JSON style)
        const copyList = JSON.parse(JSON.stringify(diaryList));
        //filtering emotion num, if isn't all, bring matching items
        const filteredList = filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));
        //1. filtering emotion => 2. lastest or oldest
        const sortedList = filteredList.sort(compare);
        return sortedList; 
    }

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu 
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu 
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton 
                        type={'positive'} 
                        text={'Write new diary'} 
                        onClick={() => navigate('/new')}
                    />
                </div>
            </div>
            
            {getProcessedDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it}/>
            ))}
        </div>
    );
};
DiaryList.defaultProps = {
    diaryList: [],
};
export default DiaryList;