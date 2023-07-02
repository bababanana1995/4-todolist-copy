import React, {useState} from 'react';
import s from './Todolist.module.css'
import {CardStudentsType, CommentsStateType} from "../../App";

type TaskType = {}

type PropsType = {
    cardStudents: CardStudentsType[]
    comments: CommentsStateType
    cardId: string
    name: string
    avatar: string
    removeComments: (comId: string, cardId: string) => void
    addComments: (smsText: string, cardId: string) => void
    commentChangeLikes:(comId:string,check:boolean,cardId:string)=>void
}

export function Todolist(props: PropsType) {
    const {
        comments,
        cardId,
        name,
        avatar,
        removeComments,
        addComments,
        commentChangeLikes
    } = props
    const [comment, setComment]=useState('')
    const removeCommentsHandler = (id: string) => {
        removeComments(id, cardId)
    }
    const addCommentsHandler=()=>{
        addComments(comment,cardId)
        setComment('')
    }
    const changeCommentHandler=(sms:string)=>{
        setComment(sms)
    }
    const commentChangeLikesHandler=(check:boolean,id:string)=>{
        commentChangeLikes(id,check,cardId)
    }
    const mapSms = comments[cardId].map((el, key) =>
        <div key={key}>
            <input onChange={(e)=>commentChangeLikesHandler(e.currentTarget.checked,el.id)}  checked={el.likes} type="checkbox"/>
            <button onClick={() => removeCommentsHandler(el.id)}>x</button>
            <span>{el.sms}</span>
        </div>
    )
    return (
        <div className={s.wrapp}>
            <div className={s.container_1}>
                <div>
                    <img src={avatar} alt="photo"/>
                </div>
                <div>
                    <h2>{name}</h2>
                    <div>
                        <input value={comment} onChange={(e)=>changeCommentHandler(e.currentTarget.value)} type="text"/>
                        <button onClick={addCommentsHandler}>add</button>
                    </div>
                </div>
            </div>
            <div>
                <ol>
                    {mapSms}
                </ol>
            </div>
        </div>
    )
}
