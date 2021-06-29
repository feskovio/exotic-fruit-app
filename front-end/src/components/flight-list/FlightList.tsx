import React, {ReactElement} from 'react';
import {Alert, Col, List, Row, Spin, Timeline, Typography} from 'antd';
import {ClockCircleOutlined} from '@ant-design/icons';
import { useQuery } from "@apollo/client";
import {FIND_FLIGHT} from '../../graphql/flight-list.gql';
import {Flight, QueryFindFlightArgs, Query} from '../../types/generated/graphql';
import moment from 'moment';

const {Text} = Typography;


export const isSearchReady = (args: QueryFindFlightArgs) => Object.keys(args)
    .every(key => Boolean(args[key as keyof QueryFindFlightArgs]));

export function FlightList(props: QueryFindFlightArgs): React.ReactElement {

    const {loading, data} = useQuery<Query, QueryFindFlightArgs>(
        FIND_FLIGHT, {variables: {...props}}
    );

    const toReadableTimestamp = (seconds: number): string => moment(seconds * 1000).format("DD MMM YYYY hh:mm");

    const ListItem = (flight: Flight, currency: string = "EUR"): ReactElement => {
        return <List.Item>
            <List.Item.Meta
                title={<Alert message={`${flight.price} ${currency}`} type="info" showIcon />}
                description={
                    <div style={{"margin": "10px"}}>
                        <Timeline mode="left">
                            <Timeline.Item>
                                {toReadableTimestamp(flight.dTime)} - {flight.cityFrom} ({flight.flyFrom})
                            </Timeline.Item>
                            <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}>
                                <Text mark>{flight.fly_duration}</Text>
                            </Timeline.Item>
                            <Timeline.Item>{toReadableTimestamp(flight.aTime)} - {flight.cityTo} ({flight.flyTo})</Timeline.Item>
                        </Timeline>
                    </div>
                }
            />
        </List.Item>
    };

    return (
        <Row>
            <Col span={20} offset={2}>
                {
                    isSearchReady(props) && data?.findFlight?.data ?
                        <List
                            size="large"
                            header={<h4>Search Results</h4>}
                            bordered
                            dataSource={data.findFlight.data}
                            renderItem={item => item ? ListItem(item, data.findFlight.currency) : null}
                        />
                        : (loading && <Spin />)
                }
            </Col>
        </Row>
    );
}
