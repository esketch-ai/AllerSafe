// app/not-found.tsx

// 404 Not Found 페이지 컴포넌트
export default function NotFound() {
    return (
      // flex 컨테이너를 사용하여 내용을 수직 및 수평으로 중앙에 배치합니다.
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        {/* 404 에러 코드를 표시합니다. */}
        <h1 className="text-5xl md:text-5xl font-semibold text-gray-100">404</h1>
        {/* 페이지가 생성되지 않았음을 알리는 메시지를 표시합니다. */}
        <h1 className="text-2xl md:text-3xl font-semibold mt-6">This page has not been generated</h1>
        {/* 사용자에게 원하는 페이지 내용을 알려달라는 메시지를 표시합니다. */}
        <p className="mt-4 text-xl md:text-2xl text-gray-500">Tell me what you would like on this page</p>
      </div>
    );
  }
