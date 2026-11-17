import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RM" },
      { name: "description", content: "A simple page displaying RM." },
      { property: "og:title", content: "RM" },
      { property: "og:description", content: "A simple page displaying RM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-9xl font-bold tracking-tight text-foreground">RM</h1>
    </main>
  );
}
