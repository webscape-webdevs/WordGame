import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./board.css";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../layout/Loader/Loader";

import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData";

import { clearErrors, getAllUsers } from "../../actions/userAction";
import { Avatar } from "@material-ui/core";



export default function Board() {

    const dispatch = useDispatch();

    const alert = useAlert();

    const { loading, error, users } = useSelector((state) => state.allUsers);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getAllUsers());
    }, [dispatch, alert, error]);

    const columns = [
        {
            field: "Rank",
            headerName: "Rank",
            minWidth: 80,
            flex: 0.1,
            sortable: false,
            disableColumnMenu: true,
        },

        {
            field: "Name",
            headerName: "Player",
            minWidth: 300,
            flex: 0.3,
            renderCell: (params) => {

                return (
                    <>
                        <Avatar src={params.value.avatar} />
                        {params.value.name}
                    </>
                );
            },
            sortable: false,
            disableColumnMenu: true,
        },
        {
            field: "GamesPlayed",
            headerName: "Games Played",
            minWidth: 80,
            flex: 0.1,
            sortable: false,
            disableColumnMenu: true,

        },

        {
            field: "Score",
            headerName: "Score",
            minWidth: 80,
            flex: 0.1,
            sortable: false,
            disableColumnMenu: true,
        },

    ];
    const rows = [];

    function sort(data) {

        let filter = data.filter(val => {

            return val;

        })

        // sort with asending order
        return filter.sort((a, b) => {
            if (a.score === b.score) {
                return b.highestscore - a.highestscore;
            } else {
                return b.highestscore - a.highestscore;
            }
        })

    }

    let sortedData = sort(users);

    sortedData &&
        sortedData.forEach((value, index) => {
            rows.push({
                id: value._id,
                Rank: ++index,
                Name: {
                    name: value.name,
                    avatar: value.avatar.url,
                },
                GamesPlayed: value.gamesPlayed,
                Score: value.highestscore,

            });

        });



    return (
        <div className='main'>
            <div className="board">

                <h1 className='leaderboard-title'>Leaderboard</h1>


                <Fragment>
                    <MetaData title={'Leaderboard'} />

                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="leaderboard-data">

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                rowsPerPage={10}
                                disableSelectionOnClick
                                className="leaderboard-data-table"
                                autoHeight
                            />


                        </div>
                    )}
                </Fragment>

            </div>
        </div>

    )
}



