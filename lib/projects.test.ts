import { expect, test } from "bun:test";
import { splitProjects, type RepoNode } from "./projects";

function repo(name: string, extra: Partial<RepoNode> = {}): RepoNode {
  return {
    name,
    description: `${name} desc`,
    url: `https://github.com/kacigaya/${name}`,
    homepageUrl: null,
    isArchived: false,
    repositoryTopics: { nodes: [{ topic: { name: "typescript" } }] },
    ...extra,
  };
}

test("pinned repos are excluded from more, archived dropped", () => {
  const { pinned, more } = splitProjects({
    pinnedItems: { nodes: [repo("binje", { homepageUrl: "https://binje.app" })] },
    repositories: {
      nodes: [repo("binje"), repo("bangs"), repo("old", { isArchived: true })],
    },
  });

  expect(pinned.map((p) => p.name)).toEqual(["binje"]);
  expect(pinned[0].homepage).toBe("https://binje.app");
  expect(pinned[0].stack).toEqual(["typescript"]);
  expect(more.map((p) => p.name)).toEqual(["bangs"]);
});

test("empty description and homepage normalize", () => {
  const { pinned } = splitProjects({
    pinnedItems: { nodes: [repo("x", { description: null, homepageUrl: "" })] },
    repositories: { nodes: [] },
  });

  expect(pinned[0].desc).toBe("");
  expect(pinned[0].homepage).toBeUndefined();
});
