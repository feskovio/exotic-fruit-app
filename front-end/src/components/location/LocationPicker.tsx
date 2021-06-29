import {AutoComplete} from 'antd';
import React, {useState} from 'react';
import {gql} from '@apollo/client';
import client from '../../graphql/client/client';

export interface FindLocationResult {
    findLocation: LocationsList;
}

export interface LocationsList {
    locations: Location[];
}

export interface Location {
    id: string;
    city: City;
}

export interface City {
    id: string;
    name: string;
    code: string;
}

export interface AutoCompleteOption {
    value: string;
    label: string;
}

export interface LocationPickerProps {
    onLocationSelected?: (option: AutoCompleteOption) => void;
    placeHolder?: string;
}

export function LocationPicker(props: LocationPickerProps): React.ReactElement {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState<AutoCompleteOption[]>([]);


    const onSearch = (searchText: string) => {
        if (searchText?.length) {
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
            .then(({ data }: { data: FindLocationResult }) => {
                const locations: Location[] = data?.findLocation?.locations;
                const uniqueOptions = locations
                    //.filter((loc: Location, pos: number, arr: Location[]) => arr.indexOf(loc) === pos)
                    .map((loc: Location, i: number) => ({value: `${loc.city.id}`, label: `${loc.city.name} (${loc.id})`, key: i}));
                setOptions(uniqueOptions);
            });
        }
    };

    const onSelect = (value: string, option: AutoCompleteOption) => {
        setValue(option.label);
        props.onLocationSelected?.(option);
    };

    const onChange = (value: string) => {
        setValue(value);
    };

    return (
        <AutoComplete
            value={value}
            options={options}
            style={{width: 300}}
            // @ts-ignore
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
            placeholder={props.placeHolder || "Start typing..."}
        />
    );
}

export default LocationPicker;
