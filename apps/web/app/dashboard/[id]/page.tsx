export default async function DashboardDetailPage({
  params, searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{code: string}>;
}) {
  const { id } = await params;
  const {code } = await searchParams;
  console.log(id);
  return <main>Dashboard Detail Page id: {id} code: {code}</main>;
}