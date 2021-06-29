import React, {useState} from 'react';
import * as moment from 'moment';
import './App.css';
import {Button, Col, DatePicker, Empty, Layout, Row, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {ApolloProvider} from "@apollo/client";
import LocationPicker, {AutoCompleteOption} from './components/location/LocationPicker';
import {FlightList, isSearchReady} from './components/flight-list/FlightList';
import {QueryFindFlightArgs} from './types/generated/graphql';
import client from './graphql/client/client';


const {Header, Content} = Layout;
const {RangePicker} = DatePicker;

const App: React.FC = () => {
    const initialState: QueryFindFlightArgs = {
        dateFrom: "",
        dateTo: "",
        flyFrom: "",
        to: ""
    };
    const [
        intermediateSearchProps,
        setIntermediateSearchProps
    ] = useState<QueryFindFlightArgs>(initialState);
    const [
        searchProps,
        setSearchProps
    ] = useState<QueryFindFlightArgs>(initialState);

    const handleSetFrom = (opt: AutoCompleteOption): void => setIntermediateSearchProps((prevState => ({
        ...prevState,
        flyFrom: opt.value
    })));
    const handleSetTo = (opt: AutoCompleteOption): void => setIntermediateSearchProps((prevState => ({
        ...prevState,
        to: opt.value
    })));
    const handleSetRange = (dates: moment.Moment[]): void => {
        if (!dates?.length) {
            setIntermediateSearchProps((prevState => ({...prevState, dateFrom: '', dateTo: ''})));
            return;
        }
        const [dateFrom, dateTo] = dates?.map(d => encodeURIComponent(d.format('DD/MM/YYYY')));
        setIntermediateSearchProps((prevState => ({...prevState, dateFrom, dateTo})));
    };

    const handleSearch = () => {
        if (isSearchReady(intermediateSearchProps)) {
            setSearchProps(intermediateSearchProps);
        }
    };

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Layout>
                    <Header>
                        <Row>
                            <Col span={20} offset={2}>
                                <Space size={"middle"}>
                                    <LocationPicker placeHolder="From" onLocationSelected={handleSetFrom}/>
                                    <LocationPicker placeHolder="To" onLocationSelected={handleSetTo}/>
                                    {/*
                                    // @ts-ignore */}
                                    <RangePicker onChange={handleSetRange}/>
                                    <Button type="primary" icon={<SearchOutlined/>} onClick={handleSearch}>
                                        Search
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Header>
                    <Content>
                        {isSearchReady(searchProps) ? <FlightList {...searchProps} /> : <Empty/>}
                    </Content>
                </Layout>
            </div>
        </ApolloProvider>
    );
};

export default App;
