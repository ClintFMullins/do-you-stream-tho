// TODO: now that fetching works, remove a bunch of "return true"
// from random places

export function getTwitchUsers(users: string[]) {
  return fetch("https://gql.twitch.tv/gql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Client-Id": "kimne78kx3ncx6brgo4mv6wki5h1ko",
    },
    body: JSON.stringify({
      query: `
          query {    
              ${users.map(eachUser).join("\n")}
          }
      `,
    }),
  }).then((resp) => resp.json());
}

export interface TwitchUser {
  id: string;
  login: string;
  displayName: string;
  profile;
  stream: {
    id: string | null;
  };
}

function eachUser(user: string) {
  return `
    ${user}: user(login: "${user}") {
      id
      login
      displayName
      stream {
        id
      }
  }`;
}

// profileImageURL(width: 70)
