import {AutoComplete} from 'antd';
import React, {useState} from 'react';
import client from '../../graphql/client/client';
import {Query, Location} from '../../types/generated/graphql';
import {Maybe} from 'graphql/jsutils/Maybe';
import {FIND_LOCATION} from '../../graphql/location.gql';

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
                query: FIND_LOCATION,
                variables: { searchText }
            })
            .then(({ data }: { data: Query }) => {
                const locations = data?.findLocation?.locations;
                const uniqueOptions = locations
                    .map((loc: Maybe<Location>, i: number) => ({
                        value: `${loc?.city.id}`,
                        label: `${loc?.city.name} (${loc?.id})`,
                        key: i
                    }));
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
