import { log } from "./logging";

export async function getTwitchUsers(users: string[]) {
  const rawResp = await fetch("https://gql.twitch.tv/gql", {
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
      variables: {},
    }),
  });

  const jsonResp = await rawResp.json();

  log("getTwitchUsers", jsonResp);

  return jsonResp;
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
