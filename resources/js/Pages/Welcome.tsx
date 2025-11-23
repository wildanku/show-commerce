import Layout from '@/Components/section/Layout';
import { PageProps } from '@/types';

export default function Welcome({ auth }: PageProps) {
  return (
    <Layout title="Welcome">
      <span>It's Work men!s</span>
    </Layout>
  );
}
