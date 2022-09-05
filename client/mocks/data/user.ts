import { User } from '../../src/graphql/generated';

export const userI: User = {
  __typename: 'User',
  tName: 'Dhiraj Arun',
  tUsername: 'dhrjarun',
  tId: '262733993003',
  tPfp: 'https://pbs.twimg.com/profile_images/1542162292627820544/5hz422mK_normal.jpg',
  publicMetrics: {
    followersCount: 1000,
    followingCount: 100,
    tweetCount: 1000,
    listedCount: 3,
  },
  isRegistered: true,
};

export const userII: User = {
  __typename: 'User',
  tName: 'Kunal Shah',
  tId: '38494047362729',
  tUsername: 'kunalCred',
  tPfp: 'https://pbs.twimg.com/profile_images/1190747917998546944/D3U5FNa7_400x400.jpg',
  publicMetrics: {
    followersCount: 1000,
    followingCount: 100,
    tweetCount: 2000,
    listedCount: 4,
  },
  isRegistered: true,
};

export const userIII: User = {
  __typename: 'User',
  tName: 'Kalpana Chawla',
  tId: '4748490433637',
  tUsername: 'kalpanaSpace',
  tPfp: 'https://images.firstpost.com/wp-content/uploads/2019/02/KC_1.jpg',
  publicMetrics: {
    followersCount: 200,
    followingCount: 10,
    tweetCount: 20,
    listedCount: 0,
  },
  isRegistered: false,
};

export const userIV: User = {
  __typename: 'User',
  tName: 'Elon Musk',
  tId: '3838939387730',
  tUsername: 'elonTesla',
  tPfp: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg',
  publicMetrics: {
    followersCount: 1000,
    followingCount: 100,
    tweetCount: 599,
    listedCount: 2,
  },
  isRegistered: true,
};

export const userV: User = {
  __typename: 'User',
  tName: 'Steve Jobs',
  tId: '373292003777',
  tUsername: 'steveApple',
  tPfp: 'https://d1oqwsnd25kjn6.cloudfront.net/production/curio_primary_images/12566/original/Feb._25_2018-SteveJobs.jpg?1518809726',
  publicMetrics: {
    followersCount: 1000,
    followingCount: 10,
    tweetCount: 100,
    listedCount: 2,
  },
  isRegistered: true,
};

export const userVI: User = {
  __typename: 'User',
  tName: 'Hermione Granger',
  tId: '18383933003030',
  tUsername: 'hermGr',
  tPfp: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Hermione_Granger_poster.jpg/220px-Hermione_Granger_poster.jpg',
  publicMetrics: {
    followersCount: 1000,
    followingCount: 20,
    tweetCount: 20,
    listedCount: 4,
  },
  isRegistered: true,
};

export const users = [userI, userII, userIII, userIV, userV, userVI];

export const unRegisteredUser = userIII;
