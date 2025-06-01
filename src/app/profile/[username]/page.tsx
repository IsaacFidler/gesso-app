export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  return <div>Profile Page for username: {params.username} (placeholder)</div>;
}
