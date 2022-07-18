import React from 'react'

export default function Profiles({ Leaderboard }) {
    return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
    )
}

function Item(data) {
    return (

        <>
            {
                data.map((value, index) => (
                    <div className="flex" key={index}>
                        <div className="rank">
                            <span>{++index}</span>

                        </div>

                        <div className="players-profile">
                            <img src={value.avatar.url} alt="" />

                            <div className="info">
                                <h3 className='name text-dark'>{value.name}</h3>

                            </div>
                        </div>

                        <div className="gamesPlayed">
                            <span>{value.gamesPlayed}</span>

                        </div>

                        <div className="score">
                            <span>{value.highestscore}</span>

                        </div>

                    </div>
                )
                )
            }
        </>


    )
}
