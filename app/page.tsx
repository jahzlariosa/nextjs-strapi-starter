import LoadMorePosts from "./posts/postWithLoadMore"

export default function Home() {
  return (
    <main className="">
      <div className="container mx-auto">
        <LoadMorePosts />
      </div>
    </main>
  )
}
