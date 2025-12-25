import * as api from "@/lib/api";
import ClientTest from "@/app/api-test/client-test";

export default async function ApiTestPage() {
  const apiResult = await api.getUserTest();

  return (
    <div>
      <h1>API test</h1>
      <h2>server component API test result</h2>
      <pre>{apiResult}</pre>
      <ClientTest />
    </div>
  );
}
