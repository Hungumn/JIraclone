import React from 'react'
import { useEffect } from 'react'
import ContentMain from '../../../components/Cyberbugs/Main/ContentMain'
import HeaderMain from '../../../components/Cyberbugs/Main/HeaderMain'
import InfoMain from '../../../components/Cyberbugs/Main/InfoMain'

export default function indexCyberBugs() {
    console.log(localStorage.getItem('USER_LOGIN'))
    return (
        <div className="main">
            <HeaderMain />

            <InfoMain />

            <ContentMain />
        </div>

    )
}
