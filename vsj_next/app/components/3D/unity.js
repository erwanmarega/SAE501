import dynamic from "next/dynamic";

const UnityViewer = dynamic(() => import("../components/UnityViewer"), {
  ssr: false,
});

export default function UnityPage() {
  return (
    <div>
      <h1>Visualisation 3D</h1>
      <UnityViewer />
    </div>
  );
}