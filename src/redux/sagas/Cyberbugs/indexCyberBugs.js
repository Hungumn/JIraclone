import React from 'react'
import { useEffect } from 'react'
import { Router } from 'react-router-dom'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain'
import { history } from '../../../util/history'

const checkLogin = () => {
    if(localStorage.getItem('USER_LOGIN') !== null){
        return true
    }
    return false
}
// useEffect(() =>{
//     try {
//         if (!checkLogin()){
//             Router.push('/login')
//         }
//     } catch (error) {
//         console.log(error)
//     }
// },[])

export default function indexCyberBugs() {

    console.log(checkLogin())

    return (
        <div className="main">
            <HeaderMain />

            <InfoMain />

            <ContentMain />
        </div>

    )
}
