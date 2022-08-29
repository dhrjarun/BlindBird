import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  DateTime: any;
};

export type Chat = {
  __typename?: 'Chat';
  createAt: Scalars['DateTime'];
  firstPerson?: Maybe<User>;
  id: Scalars['Float'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String'];
  revealGender: Scalars['Boolean'];
  secondPerson: User;
};

export enum CursorType {
  After = 'AFTER',
  Before = 'BEFORE'
}

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  chatId?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  isSeen: Scalars['Boolean'];
  sender: Sender;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: Chat;
  createMessage: Message;
  markSeen: Scalars['Boolean'];
};


export type MutationCreateChatArgs = {
  name: Scalars['String'];
  revealGender: Scalars['Boolean'];
  secondPersonTId: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  body: Scalars['String'];
  chatId: Scalars['Float'];
};


export type MutationMarkSeenArgs = {
  messageId: Scalars['Float'];
};

export type PublicMetrics = {
  __typename?: 'PublicMetrics';
  followersCount: Scalars['Int'];
  followingCount: Scalars['Int'];
  listedCount: Scalars['Int'];
  tweetCount: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  chat?: Maybe<Chat>;
  chatWithUnreadMsgs?: Maybe<Chat>;
  chats: Array<Chat>;
  chatsWithUnreadMsgs: Array<Chat>;
  hello: Scalars['String'];
  me: User;
  messages: Array<Message>;
  user?: Maybe<User>;
};


export type QueryChatArgs = {
  id: Scalars['Float'];
};


export type QueryChatWithUnreadMsgsArgs = {
  id: Scalars['Float'];
};


export type QueryMessagesArgs = {
  chatId: Scalars['Float'];
  cursor?: InputMaybe<Scalars['Float']>;
  cursorType?: InputMaybe<CursorType>;
  limit?: InputMaybe<Scalars['Float']>;
};


export type QueryUserArgs = {
  tUsername: Scalars['String'];
};

export enum Sender {
  FirstPerson = 'FIRST_PERSON',
  SecondPerson = 'SECOND_PERSON'
}

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type User = {
  __typename?: 'User';
  createAt?: Maybe<Scalars['DateTime']>;
  isRegistered?: Maybe<Scalars['Boolean']>;
  publicMetrics?: Maybe<PublicMetrics>;
  tId: Scalars['String'];
  tName: Scalars['String'];
  tPfp?: Maybe<Scalars['String']>;
  tUsername: Scalars['String'];
};

export type ChatWithUnreadMsgsQueryVariables = Exact<{
  chatId: Scalars['Float'];
}>;


export type ChatWithUnreadMsgsQuery = { __typename?: 'Query', chatWithUnreadMsgs?: { __typename?: 'Chat', id: number, name: string, createAt: any, revealGender: boolean, firstPerson?: { __typename?: 'User', tUsername: string, tName: string, tId: string, tPfp?: string | null } | null, secondPerson: { __typename?: 'User', tUsername: string, tName: string, tId: string, tPfp?: string | null }, messages?: Array<{ __typename?: 'Message', id: number }> | null } | null };

export type ChatQueryVariables = Exact<{
  chatId: Scalars['Float'];
}>;


export type ChatQuery = { __typename?: 'Query', chat?: { __typename?: 'Chat', id: number, createAt: any, firstPerson?: { __typename?: 'User', tUsername: string, tName: string, tId: string, tPfp?: string | null } | null, secondPerson: { __typename?: 'User', tId: string, tUsername: string, tName: string, tPfp?: string | null } } | null };

export type ChatsWithUnreadMsgsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsWithUnreadMsgsQuery = { __typename?: 'Query', chatsWithUnreadMsgs: Array<{ __typename?: 'Chat', id: number, name: string, createAt: any, revealGender: boolean, messages?: Array<{ __typename?: 'Message', id: number }> | null, firstPerson?: { __typename?: 'User', tId: string, tName: string } | null, secondPerson: { __typename?: 'User', tId: string, tName: string, tUsername: string, tPfp?: string | null } }> };

export type ChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChatsQuery = { __typename?: 'Query', chats: Array<{ __typename?: 'Chat', id: number, createAt: any, firstPerson?: { __typename?: 'User', tUsername: string, tName: string, tId: string, tPfp?: string | null } | null, secondPerson: { __typename?: 'User', tId: string, tUsername: string, tName: string, tPfp?: string | null } }> };

export type CreateMessageMutationVariables = Exact<{
  body: Scalars['String'];
  chatId: Scalars['Float'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', id: number, createdAt: any, isSeen: boolean, body: string, sender: Sender } };

export type MarkSeenMutationVariables = Exact<{
  messageId: Scalars['Float'];
}>;


export type MarkSeenMutation = { __typename?: 'Mutation', markSeen: boolean };

export type MessagesQueryVariables = Exact<{
  chatId: Scalars['Float'];
  limit?: InputMaybe<Scalars['Float']>;
  cursorType?: InputMaybe<CursorType>;
  cursor?: InputMaybe<Scalars['Float']>;
}>;


export type MessagesQuery = { __typename?: 'Query', messages: Array<{ __typename?: 'Message', id: number, createdAt: any, isSeen: boolean, body: string, chatId?: number | null, sender: Sender }> };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage: { __typename?: 'Message', id: number, createdAt: any, isSeen: boolean, body: string, sender: Sender, chatId?: number | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', createAt?: any | null, tId: string, tPfp?: string | null, tUsername: string, tName: string } };

export type UserQueryVariables = Exact<{
  tUsername: Scalars['String'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', createAt?: any | null, tId: string, tPfp?: string | null, tUsername: string, tName: string, isRegistered?: boolean | null, publicMetrics?: { __typename?: 'PublicMetrics', followersCount: number, followingCount: number } | null } | null };


export const ChatWithUnreadMsgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatWithUnreadMsgs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatWithUnreadMsgs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"revealGender"}},{"kind":"Field","name":{"kind":"Name","value":"firstPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}},{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}},{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<ChatWithUnreadMsgsQuery, ChatWithUnreadMsgsQueryVariables>;
export const ChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Chat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}},{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}}]}}]}}]}}]} as unknown as DocumentNode<ChatQuery, ChatQueryVariables>;
export const ChatsWithUnreadMsgsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatsWithUnreadMsgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatsWithUnreadMsgs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"revealGender"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"firstPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}},{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}}]}}]}}]}}]} as unknown as DocumentNode<ChatsWithUnreadMsgsQuery, ChatsWithUnreadMsgsQueryVariables>;
export const ChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"firstPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}},{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}}]}},{"kind":"Field","name":{"kind":"Name","value":"secondPerson"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}}]}}]}}]}}]} as unknown as DocumentNode<ChatsQuery, ChatsQueryVariables>;
export const CreateMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isSeen"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}}]}}]}}]} as unknown as DocumentNode<CreateMessageMutation, CreateMessageMutationVariables>;
export const MarkSeenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkSeen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markSeen"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"messageId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"messageId"}}}]}]}}]} as unknown as DocumentNode<MarkSeenMutation, MarkSeenMutationVariables>;
export const MessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Messages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursorType"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CursorType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursorType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursorType"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isSeen"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}}]}}]}}]} as unknown as DocumentNode<MessagesQuery, MessagesQueryVariables>;
export const NewMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"NewMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newMessage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isSeen"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"sender"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}}]}}]}}]} as unknown as DocumentNode<NewMessageSubscription, NewMessageSubscriptionVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}},{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tUsername"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tUsername"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tUsername"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAt"}},{"kind":"Field","name":{"kind":"Name","value":"tId"}},{"kind":"Field","name":{"kind":"Name","value":"tPfp"}},{"kind":"Field","name":{"kind":"Name","value":"tUsername"}},{"kind":"Field","name":{"kind":"Name","value":"tName"}},{"kind":"Field","name":{"kind":"Name","value":"publicMetrics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followersCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isRegistered"}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;