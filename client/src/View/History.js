import React from "react";
import {connect}from 'react-redux';
import {Table, Card,} from "react-bootstrap";
import {FormatDate} from "../Functions";


const History = ({data})=>{
    return (
        <Card>
            <Card.Header>
                <h4>Daily Updates</h4>
            </Card.Header>
            <Card.Body>
                <Table striped hover size="sm">
                    <thead>
                    <tr>
                        <td>Day No</td>
                        <td>Date</td>
                        <td>Level</td>
                        <td>Confirmed</td>
                        <td>Difference</td>
                        <td>Deaths</td>
                        <td>Daily Deaths</td>
                        <td>Recoveries</td>
                        <td>Daily Recoveries</td>
                        <td>Active</td>
                        <td>Daily Active</td>
                    </tr>
                    </thead>
                    <tbody>
                    {data.reverse().map((entry,i)=>{
                        const {dayNo, timestamp,confirmed,difference,deaths,dailyDeaths,recoveries,dailyRecoveries,active,dailyActive,lockDownLevel}=entry;
                        return (
                            <tr key={dayNo}>
                                <td>{dayNo}</td>
                                <td>{FormatDate(timestamp)}</td>
                                <td>{lockDownLevel}</td>
                                <td>{confirmed}</td>
                                <td>{difference}</td>
                                <td>{deaths}</td>
                                <td>{dailyDeaths}</td>
                                <td>{recoveries}</td>
                                <td>{dailyRecoveries}</td>
                                <td>{active}</td>
                                <td>{dailyActive}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </Card.Body>

        </Card>

    )
}
const mapStateToProps=state=>{
    return {data:state.Entries.data}
}
export default connect(mapStateToProps)(History);