import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type City = {
  __typename?: 'City';
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
};

export type Flight = {
  __typename?: 'Flight';
  id: Scalars['ID'];
  flyFrom: Scalars['String'];
  flyTo: Scalars['String'];
  cityFrom: Scalars['String'];
  cityTo: Scalars['String'];
  dTime: Scalars['Int'];
  aTime: Scalars['Int'];
  fly_duration: Scalars['String'];
  price: Scalars['Int'];
};

export type FlightList = {
  __typename?: 'FlightList';
  search_id: Scalars['ID'];
  currency: Scalars['String'];
  data: Array<Maybe<Flight>>;
};

export type Location = {
  __typename?: 'Location';
  id: Scalars['ID'];
  city: City;
};

export type LocationsList = {
  __typename?: 'LocationsList';
  locations: Array<Maybe<Location>>;
  results_retrieved: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  findLocation: LocationsList;
  findFlight: FlightList;
};


export type QueryFindLocationArgs = {
  term: Scalars['String'];
  location_types: Scalars['String'];
};


export type QueryFindFlightArgs = {
  flyFrom: Scalars['String'];
  to: Scalars['String'];
  dateFrom: Scalars['String'];
  dateTo: Scalars['String'];
};
