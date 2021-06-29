import React, {ReactElement, useState} from 'react';
import {Col, List, Row, Spin, Timeline} from 'antd';
import {ArrowDownOutlined} from '@ant-design/icons';
import { useQuery } from "@apollo/client";
import {FIND_FLIGHT} from '../../graphql/flight-list.gql';
import {Flight, QueryFindFlightArgs, Query} from '../../generated/graphql';


export const isSearchReady = (args: QueryFindFlightArgs) => Object.keys(args)
    .every(key => Boolean(args[key as keyof QueryFindFlightArgs]));

export function FlightList(props: QueryFindFlightArgs): React.ReactElement {

    const {loading, data} = useQuery<Query, QueryFindFlightArgs>(
        FIND_FLIGHT, {variables: {...props}}
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
                            renderItem={item => item ? ListItem(item) : null}
                        />
                        : (loading && <Spin />)
                }
            </Col>
        </Row>
    );
}
