// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { useState } from 'react';
import '../styles/globals.css';
import Header from '../component/Header';



function MyApp({ Component, pageProps }: AppProps) {
  // 이렇게 해야 서로 다른 사용자와 요청 사이에 데이터가 공유되지 않는다.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Header></Header>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
