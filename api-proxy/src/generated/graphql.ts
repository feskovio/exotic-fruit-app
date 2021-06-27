import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  findFlight: FlightList;
  findLocation: LocationsList;
};


export type QueryFindFlightArgs = {
  flyFrom: Scalars['String'];
  to: Scalars['String'];
  dataFrom: Scalars['String'];
  dateTo: Scalars['String'];
};


export type QueryFindLocationArgs = {
  term: Scalars['String'];
  location_types: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  City: ResolverTypeWrapper<City>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Flight: ResolverTypeWrapper<Flight>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  FlightList: ResolverTypeWrapper<FlightList>;
  Location: ResolverTypeWrapper<Location>;
  LocationsList: ResolverTypeWrapper<LocationsList>;
  Query: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  City: City;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Flight: Flight;
  Int: Scalars['Int'];
  FlightList: FlightList;
  Location: Location;
  LocationsList: LocationsList;
  Query: {};
  Boolean: Scalars['Boolean'];
};

export type CityResolvers<ContextType = any, ParentType extends ResolversParentTypes['City'] = ResolversParentTypes['City']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlightResolvers<ContextType = any, ParentType extends ResolversParentTypes['Flight'] = ResolversParentTypes['Flight']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  flyFrom?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  flyTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityFrom?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cityTo?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  aTime?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fly_duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FlightListResolvers<ContextType = any, ParentType extends ResolversParentTypes['FlightList'] = ResolversParentTypes['FlightList']> = {
  search_id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Array<Maybe<ResolversTypes['Flight']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['City'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LocationsListResolvers<ContextType = any, ParentType extends ResolversParentTypes['LocationsList'] = ResolversParentTypes['LocationsList']> = {
  locations?: Resolver<Array<Maybe<ResolversTypes['Location']>>, ParentType, ContextType>;
  results_retrieved?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  findFlight?: Resolver<ResolversTypes['FlightList'], ParentType, ContextType, RequireFields<QueryFindFlightArgs, 'flyFrom' | 'to' | 'dataFrom' | 'dateTo'>>;
  findLocation?: Resolver<ResolversTypes['LocationsList'], ParentType, ContextType, RequireFields<QueryFindLocationArgs, 'term' | 'location_types'>>;
};

export type Resolvers<ContextType = any> = {
  City?: CityResolvers<ContextType>;
  Flight?: FlightResolvers<ContextType>;
  FlightList?: FlightListResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  LocationsList?: LocationsListResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
