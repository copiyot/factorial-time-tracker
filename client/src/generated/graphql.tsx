import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateWorkLogInput = {
  description: Scalars['String']['input'];
  endTime: Scalars['DateTime']['input'];
  startTime: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type EditWorkLogInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['Float']['input'];
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createWorkLog?: Maybe<WorkLog>;
  deleteWorkLog?: Maybe<WorkLog>;
  editWorkLog?: Maybe<WorkLog>;
};


export type MutationCreateWorkLogArgs = {
  options: CreateWorkLogInput;
};


export type MutationDeleteWorkLogArgs = {
  id: Scalars['Float']['input'];
};


export type MutationEditWorkLogArgs = {
  options: EditWorkLogInput;
};

export type Query = {
  __typename?: 'Query';
  workLog: WorkLog;
  workLogs: Array<WorkLog>;
};


export type QueryWorkLogArgs = {
  id: Scalars['Float']['input'];
};

export type WorkLog = {
  __typename?: 'WorkLog';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  endTime: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  startTime: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type CreateWorkLogMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  startTime: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
}>;


export type CreateWorkLogMutation = { __typename?: 'Mutation', createWorkLog?: { __typename?: 'WorkLog', id: number, title: string, description: string, updatedAt: string, startTime: any, endTime: any } | null };

export type EditWorkLogMutationVariables = Exact<{
  Id: Scalars['Float']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  startTime: Scalars['DateTime']['input'];
  endTime: Scalars['DateTime']['input'];
}>;


export type EditWorkLogMutation = { __typename?: 'Mutation', editWorkLog?: { __typename?: 'WorkLog', id: number, title: string, description: string, updatedAt: string, startTime: any, endTime: any } | null };

export type WorkLogQueryVariables = Exact<{
  Id: Scalars['Float']['input'];
}>;


export type WorkLogQuery = { __typename?: 'Query', workLog: { __typename?: 'WorkLog', id: number, title: string, description: string, startTime: any, endTime: any } };

export type WorkLogsQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkLogsQuery = { __typename?: 'Query', workLogs: Array<{ __typename?: 'WorkLog', id: number, title: string, description: string, startTime: any, endTime: any }> };


export const CreateWorkLogDocument = gql`
    mutation CreateWorkLog($title: String!, $description: String!, $startTime: DateTime!, $endTime: DateTime!) {
  createWorkLog(
    options: {title: $title, description: $description, startTime: $startTime, endTime: $endTime}
  ) {
    id
    title
    description
    updatedAt
    startTime
    endTime
  }
}
    `;
export type CreateWorkLogMutationFn = Apollo.MutationFunction<CreateWorkLogMutation, CreateWorkLogMutationVariables>;

/**
 * __useCreateWorkLogMutation__
 *
 * To run a mutation, you first call `useCreateWorkLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkLogMutation, { data, loading, error }] = useCreateWorkLogMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *   },
 * });
 */
export function useCreateWorkLogMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkLogMutation, CreateWorkLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkLogMutation, CreateWorkLogMutationVariables>(CreateWorkLogDocument, options);
      }
export type CreateWorkLogMutationHookResult = ReturnType<typeof useCreateWorkLogMutation>;
export type CreateWorkLogMutationResult = Apollo.MutationResult<CreateWorkLogMutation>;
export type CreateWorkLogMutationOptions = Apollo.BaseMutationOptions<CreateWorkLogMutation, CreateWorkLogMutationVariables>;
export const EditWorkLogDocument = gql`
    mutation EditWorkLog($Id: Float!, $title: String!, $description: String!, $startTime: DateTime!, $endTime: DateTime!) {
  editWorkLog(
    options: {id: $Id, title: $title, description: $description, startTime: $startTime, endTime: $endTime}
  ) {
    id
    title
    description
    updatedAt
    startTime
    endTime
  }
}
    `;
export type EditWorkLogMutationFn = Apollo.MutationFunction<EditWorkLogMutation, EditWorkLogMutationVariables>;

/**
 * __useEditWorkLogMutation__
 *
 * To run a mutation, you first call `useEditWorkLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditWorkLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editWorkLogMutation, { data, loading, error }] = useEditWorkLogMutation({
 *   variables: {
 *      Id: // value for 'Id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *   },
 * });
 */
export function useEditWorkLogMutation(baseOptions?: Apollo.MutationHookOptions<EditWorkLogMutation, EditWorkLogMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditWorkLogMutation, EditWorkLogMutationVariables>(EditWorkLogDocument, options);
      }
export type EditWorkLogMutationHookResult = ReturnType<typeof useEditWorkLogMutation>;
export type EditWorkLogMutationResult = Apollo.MutationResult<EditWorkLogMutation>;
export type EditWorkLogMutationOptions = Apollo.BaseMutationOptions<EditWorkLogMutation, EditWorkLogMutationVariables>;
export const WorkLogDocument = gql`
    query WorkLog($Id: Float!) {
  workLog(id: $Id) {
    id
    title
    description
    startTime
    endTime
  }
}
    `;

/**
 * __useWorkLogQuery__
 *
 * To run a query within a React component, call `useWorkLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkLogQuery({
 *   variables: {
 *      Id: // value for 'Id'
 *   },
 * });
 */
export function useWorkLogQuery(baseOptions: Apollo.QueryHookOptions<WorkLogQuery, WorkLogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkLogQuery, WorkLogQueryVariables>(WorkLogDocument, options);
      }
export function useWorkLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkLogQuery, WorkLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkLogQuery, WorkLogQueryVariables>(WorkLogDocument, options);
        }
export type WorkLogQueryHookResult = ReturnType<typeof useWorkLogQuery>;
export type WorkLogLazyQueryHookResult = ReturnType<typeof useWorkLogLazyQuery>;
export type WorkLogQueryResult = Apollo.QueryResult<WorkLogQuery, WorkLogQueryVariables>;
export const WorkLogsDocument = gql`
    query WorkLogs {
  workLogs {
    id
    title
    description
    startTime
    endTime
  }
}
    `;

/**
 * __useWorkLogsQuery__
 *
 * To run a query within a React component, call `useWorkLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkLogsQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorkLogsQuery(baseOptions?: Apollo.QueryHookOptions<WorkLogsQuery, WorkLogsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkLogsQuery, WorkLogsQueryVariables>(WorkLogsDocument, options);
      }
export function useWorkLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkLogsQuery, WorkLogsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkLogsQuery, WorkLogsQueryVariables>(WorkLogsDocument, options);
        }
export type WorkLogsQueryHookResult = ReturnType<typeof useWorkLogsQuery>;
export type WorkLogsLazyQueryHookResult = ReturnType<typeof useWorkLogsLazyQuery>;
export type WorkLogsQueryResult = Apollo.QueryResult<WorkLogsQuery, WorkLogsQueryVariables>;