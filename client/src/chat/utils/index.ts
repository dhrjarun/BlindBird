import { Chat } from 'graphql/generated';

export function getDisplayNameAndPfp(data: Chat): {
  name: string;
  pfp: string | null;
} {
  return {
    name: data?.firstPerson
      ? data.secondPerson.tName
      : data.name
      ? data.name
      : `unknown #${data.id}`,
    pfp: data?.firstPerson ? data.secondPerson.tPfp || null : null,
  };
}
