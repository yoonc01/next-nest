"use client";

import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export default function ClientTest() {
  const api = useApi();

  const { data, isLoading } = useQuery({
    queryKey: ["user-test"],
    queryFn: () => api.getUserTest(),
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  const message = data?.data?.message ?? "";

  return (
    <div>
      <h1>API test</h1>
      <h2>server component API test result</h2>
      <pre>{message}</pre>
    </div>
  );
}
