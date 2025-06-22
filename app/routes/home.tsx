import { Welcome } from "../components/welcome";

export function meta() {
  return [
    { title: "Grocery App" },
    { name: "description", content: "Organization App" },
  ];
}

export default function Home() {
  return <Welcome />;
}
