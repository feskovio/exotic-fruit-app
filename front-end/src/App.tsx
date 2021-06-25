import React, {ReactElement, useState} from 'react';
import './App.css';
import {Button, Col, DatePicker, Layout, List, Row, Space, Timeline} from 'antd';
import { AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ArrowDownOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

const { RangePicker } = DatePicker;

const mockVal = (str: string, repeat: number = 1) => ({
  value: str.repeat(repeat),
});

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const App: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const onSearch = (searchText: string) => {
    setOptions(
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };

  const onSelect = (data: string) => {
    console.log('onSelect', data);
  };

  const onFromChange = (data: string) => {
    setFrom(data);
  };

  const onToChange = (data: string) => {
    setTo(data);
  };

  const getListItem = (data: string): ReactElement => {
    return  <List.Item>
      <Timeline mode="left">
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item dot={<ArrowDownOutlined style={{ fontSize: '16px' }} />}>
          {data}
        </Timeline.Item>
        <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
      </Timeline>
    </List.Item>
  };

  return (
      <div className="App">
        <Layout>
          <Header>
            <Row>
              <Col span={20} offset={2}>
                <Space size={"middle"}>
                  <AutoComplete
                      value={from}
                      options={options}
                      style={{ width: 300 }}
                      onSelect={onSelect}
                      onSearch={onSearch}
                      onChange={onFromChange}
                      placeholder="From"
                  />
                  <AutoComplete
                      value={to}
                      options={options}
                      style={{ width: 300 }}
                      onSelect={onSelect}
                      onSearch={onSearch}
                      onChange={onToChange}
                      placeholder="To"
                  />
                  <RangePicker />
                  <Button type="primary" icon={<SearchOutlined />}>
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
                    dataSource={data}
                    renderItem={item => getListItem(item)}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
  );
};

export default App;
