import React from 'react'

export default function InfoMain(props) {
    console.log('info',props.projectDetail.members)
    const renderAvatar =() =>{
        return props.projectDetail.members?.map((user,index)=>{
            return(
                <div className='avatar' key={index}>
                    <img src={user.avatar} alt={user.avatar} />
                </div>
            )
        })
    }
    return (
        <>
            <h3>Cyber Board</h3>
            <div className="info" style={{ display: 'flex' }}>
                <div className="search-block">
                    <input className="search" />
                    <i className="fa fa-search" />
                </div>
                <div className="avatar-group" style={{ display: 'flex' }}>
                    {renderAvatar()}
                </div>
                <div style={{ marginLeft: 20 }} className="text">Only My Issues</div>
                <div style={{ marginLeft: 20 }} className="text">Recently Updated</div>
            </div>
        </>

    )
}
