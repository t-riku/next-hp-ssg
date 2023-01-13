import Link from "next/link";
import Layout from "components/Layout";
import { getAllPostIds, getPostData } from "lib/post";

export default function Post({ post }) {
  // postデータがない場合
  if (!post) {
    return <div>Loading...</div>;
  }

  // postデータがある場合
  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID : "}
        {post.id}
      </p>
      <p className="mb-8 text-xl font-bold">{post.title}</p>
      <p className="px-10">{post.body}</p>

      {/* blogのページに戻るためのLink */}
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

// この引数のparamsはpost.jsの取ってきたそれぞれのid
export async function getStaticProps({ params }) {
  //const { post: post } = await getPostData(params.id);
  const post = await getPostData(params.id);
  //   props:とすることでpropsとして他のコンポーネントで使えることができる
  return {
    props: {
      post,
    },
  };
}
