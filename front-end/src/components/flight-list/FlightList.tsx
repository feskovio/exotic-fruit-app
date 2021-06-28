import React, {ReactElement, useState} from 'react';
import {Col, List, Row, Spin, Timeline} from 'antd';
import {ArrowDownOutlined} from '@ant-design/icons';
import {
    useQuery,
    gql
} from "@apollo/client";

interface FlightSearchResult {
    findFlight: FlightList;
}

interface FlightList {
    search_id: string;
    currency: string
    data: Flight[];
}

interface Flight {
    id: string;
    flyFrom: string;
    flyTo: string;
    cityFrom: string;
    cityTo: string;
    dTime: number;
    aTime: number;
    fly_duration: string;
    price: number;
}

export interface FlightSearchArgs {
    flyFrom: string;
    to: string;
    dateFrom: string;
    dateTo: string;
}

export const isSearchReady = (args: FlightSearchArgs) => Object.keys(args)
    .every(key => Boolean(args[key as keyof FlightSearchArgs]));

export function FlightList(props: FlightSearchArgs): React.ReactElement {

    const FIND_FLIGHT = gql`
        query FindFlight($flyFrom: String!, $to: String!, $dateFrom: String!, $dateTo: String!) {
            findFlight(flyFrom: $flyFrom, to: $to, dateFrom: $dateFrom, dateTo: $dateTo) {
                currency,
                data {
                    id,
                    flyFrom,
                    flyTo,
                    cityFrom,
                    cityTo,
                    dTime,
                    aTime,
                    fly_duration,
                    price
                }
            }
        }
    `;

    const {loading, data} = useQuery<FlightSearchResult, FlightSearchArgs>(
        FIND_FLIGHT,
        {variables: {...props}}
    );

    const ListItem = (flight: Flight): ReactElement => {
        return <List.Item>
            <Timeline mode="left">
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<ArrowDownOutlined style={{fontSize: '16px'}}/>}>
                    {flight.cityFrom}
                </Timeline.Item>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            </Timeline>
        </List.Item>
    };

    return (
        <Row>
            <Col span={20} offset={2}>
                {
                    isSearchReady(props) && data?.findFlight?.data ?
                        <List
                            size="large"
                            header={"Search Results"}
                            bordered
                            dataSource={data.findFlight.data}
                            renderItem={item => ListItem(item)}
                        />
                        : (loading && <Spin />)
                }
            </Col>
        </Row>
    );
}
