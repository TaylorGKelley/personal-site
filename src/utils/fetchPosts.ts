import matter from "gray-matter";

export type Post = {
  youtube_url?: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  content: string;
};

type GitHubFile = {
  type: string;
  name: string;
};

export async function fetchPostSlugs(
  owner: string,
  repo: string,
  options: {
    branch: string;
    path: string;
    token?: string; // (Optional) - GitHub Personal Access Token
  } = { branch: "main", path: "posts" },
): Promise<string[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (options.token) {
    headers["Authorization"] = `token ${options.token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${options.path}?ref=${options.branch}`,
      { headers },
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch repo tree: ${response.status} ${response.statusText}`,
      );
    }
    const data = await response.json();

    // Step 3: Filter for Markdown files
    const posts = (data as GitHubFile[])
      .filter((file) => file.type === "blob" && file.name.endsWith(".md"))
      .map((file) => file.name.replace(/\.md$/, "")); // Return file names as slugs

    return posts;
  } catch (error) {
    console.error(
      "Error fetching posts from GitHub:",
      (error as Error).message,
    );
    return [];
  }
}

export async function fetchPost(
  owner: string,
  repo: string,
  fileName: string,
  options: {
    branch: string;
    path: string;
  } = { branch: "main", path: "posts" },
): Promise<Post | null> {
  const rawBaseUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main`;
  const fileUrl = `${rawBaseUrl}/${options.path}/${fileName}`;

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const markdown: string = await response.text();

    // Replace the relative image path with the direct GitHub URL
    const targetPath = "content/images/";
    const githubImagePath = `${rawBaseUrl}/content/images/`;

    const escapedPath = targetPath.replace(/\./g, "\\.");
    const imageRegex = new RegExp(escapedPath, "g");

    const rawMarkdown = markdown.replace(imageRegex, githubImagePath);

    const { data, content } = matter(rawMarkdown);

    return {
      ...(data as Omit<Post, "content" | "date">),
      date: new Date(data.date), // Parse date string into object
      content,
    };
  } catch (error) {
    console.error("Error processing markdown:", error);
    return null;
  }
}
