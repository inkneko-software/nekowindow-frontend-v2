import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@theme/theme'
import "./globals.css"
import localFont from 'next/font/local';

import { cookies } from 'next/headers'
import { env } from 'process';
export const metadata = {
  title: 'NekoWindow - 墨云视窗',
  description: 'NekoWindow is a online video website. You can share, watch video and chat on the video with people who are wathing the same video.',
};

/**
 * 检查站点策略，是否只有在登录后才进入网站
 */

// function checkSitePolicy() {
//   var requireLogin = false;
//   var cookie = cookies()
//   var userId = cookie.get("userId");
//   var sessionToken = cookie.get('sessionToken');
//   if (userId === null || sessionToken === null) {
//     requireLogin = true;
//   }
// //fix: 错误的逻辑，应当使用条件渲染
//   if (requireLogin) {
//     window.location.href = "/login";
//   }
// }

const roboto = localFont({
    src: "../../public/font/roboto.woff2",
})
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  //await checkSitePolicy();
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
