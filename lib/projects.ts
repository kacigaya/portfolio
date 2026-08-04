export type Project = {
  name: string;
  desc: string;
  url: string;
  homepage?: string;
  stack: string[];
};

export type RepoNode = {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  isArchived: boolean;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
};

export type UserRepos = {
  pinnedItems: { nodes: RepoNode[] };
  repositories: { nodes: RepoNode[] };
};

const LOGIN = "kacigaya";

const QUERY = `
  fragment repo on Repository {
    name
    description
    url
    homepageUrl
    isArchived
    repositoryTopics(first: 10) { nodes { topic { name } } }
  }
  query($login: String!) {
    user(login: $login) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes { ... on Repository { ...repo } }
      }
      repositories(
        first: 100
        privacy: PUBLIC
        isFork: false
        ownerAffiliations: OWNER
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes { ...repo }
      }
    }
  }
`;

function toProject(repo: RepoNode): Project {
  return {
    name: repo.name,
    desc: repo.description ?? "",
    url: repo.url,
    homepage: repo.homepageUrl || undefined,
    stack: repo.repositoryTopics.nodes.map((n) => n.topic.name),
  };
}

export function splitProjects(user: UserRepos) {
  const pinned = user.pinnedItems.nodes.map(toProject);
  const pinnedUrls = new Set(pinned.map((p) => p.url));
  const more = user.repositories.nodes
    .filter((repo) => !repo.isArchived && !pinnedUrls.has(repo.url))
    .map(toProject);
  return { pinned, more };
}

export async function getProjects() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN missing: pinned repos need GraphQL");

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: LOGIN } }),
  });
  if (!res.ok) throw new Error(`github graphql: ${res.status}`);

  const json = await res.json();
  if (json.errors) throw new Error(`github graphql: ${json.errors[0].message}`);

  return splitProjects(json.data.user as UserRepos);
}
