import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/character")({
  component: Character,
});

function Character() {
  return <h2>Character Explorer</h2>;
}
