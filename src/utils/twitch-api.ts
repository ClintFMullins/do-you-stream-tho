import { log } from "./logging";

export function getTwitchUsers(users: string[]) {
  log("getTwitchUsers", users.map(eachUser).join("\n"));

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
  profileImageURL: string;
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
      profileImageURL(width: 70)
      stream {
        id
      }
  }`;
}
