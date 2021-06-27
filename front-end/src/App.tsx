import React, {ReactElement, useState} from 'react';
import './App.css';
import {Button, Col, DatePicker, Layout, List, Row, Space, Timeline} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {ArrowDownOutlined} from '@ant-design/icons';
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    useQuery,
    gql
} from "@apollo/client";
import LocationPicker from './components/location/LocationPicker';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

const {Header, Footer, Sider, Content} = Layout;
const {RangePicker} = DatePicker;

const mockVal = (str: string, repeat: number = 1) => ({
    value: str.repeat(repeat),
});

const mockData = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

interface QueryFindLocationArgs {
    term: string;
    location_types: string;
}

interface LocationsList {
    locations: Location[];
    results_retrieved: number;
}

interface Location {
    id: string;
    city: City;
}

interface City {
    id: string;
    name: string;
    code: string;
}

const App: React.FC = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [options, setOptions] = useState<{ value: string }[]>([]);

    const ListItem = (label: string): ReactElement => {
        return <List.Item>
            <Timeline mode="left">
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item dot={<ArrowDownOutlined style={{fontSize: '16px'}}/>}>
                    {label}
                </Timeline.Item>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            </Timeline>
        </List.Item>
    };

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Layout>
                    <Header>
                        <Row>
                            <Col span={20} offset={2}>
                                <Space size={"middle"}>
                                    <LocationPicker />
                                    <LocationPicker />
                                    <RangePicker/>
                                    <Button type="primary" icon={<SearchOutlined/>}>
                                        Search
                                    </Button>
                                </Space>
                            </Col>
                        </Row>
                    </Header>
                    <Content>
                        <Row>
                            <Col span={20} offset={2}>
                                <List
                                    size="large"
                                    header={"Search Results"}
                                    bordered
                                    dataSource={mockData}
                                    renderItem={item => ListItem(item)}
                                />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        </ApolloProvider>
    );
};

export default App;
