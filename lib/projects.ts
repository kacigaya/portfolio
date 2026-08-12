import { GITHUB_LOGIN } from "@/lib/socials";
import { REVALIDATE } from "@/lib/site";

const MORE_PROJECTS_LIMIT = 18;

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
        first: 24
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
    .map(toProject)
    .slice(0, MORE_PROJECTS_LIMIT);
  return { pinned, more };
}

export async function getProjects() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return getPublicProjects();

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_LOGIN } }),
    next: { revalidate: REVALIDATE },
  });
  if (!res.ok) return getPublicProjects();

  const json = await res.json();
  if (json.errors) return getPublicProjects();

  return splitProjects(json.data.user as UserRepos);
}

async function getPublicProjects() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_LOGIN}/repos?type=owner&sort=pushed&per_page=24`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE },
    },
  );
  if (!res.ok) return { pinned: [], more: [] };

  const repos = (await res.json()) as Array<{
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    archived: boolean;
    fork: boolean;
    topics: string[];
  }>;
  const projects = repos
    .filter((repo) => !repo.archived && !repo.fork)
    .map((repo) => ({
      name: repo.name,
      desc: repo.description ?? "",
      url: repo.html_url,
      homepage: repo.homepage || undefined,
      stack: repo.topics,
    }));

  return {
    // The public REST API does not expose pinned repositories, so recent work
    // is a stable no-token fallback for previews and deploys.
    pinned: projects.slice(0, 6),
    more: projects.slice(6, 6 + MORE_PROJECTS_LIMIT),
  };
}
