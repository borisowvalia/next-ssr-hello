export default function Home({ deployId, projectId, ts, hostHeader }) {
  return (
    <main style={{ fontFamily: 'system-ui', margin: 48, color: '#444' }}>
      <h1>Layero Next.js Sample</h1>
      <p>Server-side rendered at: <code>{ts}</code></p>
      <ul>
        <li>deploy_id: <code>{deployId}</code></li>
        <li>project_id: <code>{projectId}</code></li>
        <li>host: <code>{hostHeader}</code></li>
      </ul>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: {
      deployId: process.env.LAYERO_DEPLOY_ID || 'local',
      projectId: process.env.LAYERO_PROJECT_ID || 'local',
      ts: new Date().toISOString(),
      hostHeader: req.headers['host'] || '',
    },
  };
}
