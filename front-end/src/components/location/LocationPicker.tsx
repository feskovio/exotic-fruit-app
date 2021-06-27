import {AutoComplete} from 'antd';
import React, { useState} from 'react';
import { gql } from '@apollo/client';
import client from '../../graphql/client/client';

export interface LocationPickerProps {
    onLocationSelected?: Function
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

export function LocationPicker(props: LocationPickerProps): React.ReactElement {
        const [ value, setValue] = useState("");
        const [options, setOptions] = useState<{ value: string }[]>([]);

    const mockVal = (str: string, repeat: number = 1) => ({
        value: str.repeat(repeat),
    });

    const onChange = (data: string) => {
        setValue(data);
    };
        const OnSearch = (searchText: string) => {
            setOptions(
                !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
            );


            if(searchText.length < 3) {
                //setOptions([]);
            } else {
                client
                .query({
                    query: gql`
                        query {
                            findLocation(term: "${searchText}", location_types: "airport") {
                                locations {
                                    id,
                                    city {
                                        id, name, code
                                    }
                                }
                            }
                        }
                    `
                })
                .then(result => {
                    const results = result.data.findLocation.locations
                        .filter((loc: Location, pos: number, arr: Location[]) => arr.indexOf(loc) === pos)
                        .map((loc: Location, i: number) => ({ value: `${loc.city.name} (${loc.id})` }));
                    setOptions(results);
                });
            }
        };

        const onSelect = (data: string) => {
            console.log('onSelect', data);
        };

        return (
            <AutoComplete
                value={value}
                options={options}
                style={{width: 300}}
                onSelect={onSelect}
                onSearch={OnSearch}
                onChange={onChange}
                placeholder="From"
            />
        );

}

export default LocationPicker;
