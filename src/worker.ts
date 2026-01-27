// Cloudflare Workers 入口
export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    
    // API 路由：返回动态计算的日期统计
    if (url.pathname === '/api/stats') {
      return handleStats();
    }
    
    // 静态资源处理
    try {
      // 尝试使用 ASSETS 绑定（生产环境）
      if (env.ASSETS) {
        return env.ASSETS.fetch(request);
      }
      
      // 本地开发环境回退
      return new Response('Static assets not available in dev mode. Please check wrangler configuration.', {
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    } catch (error) {
      return new Response('Error serving static assets', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};

// 核心日期配置
const DATES = {
  met: '2020-08-21',
  married: '2021-01-18',
  baby: '2024-12-30'
};

function handleStats(): Response {
  const now = new Date();
  
  // 计算相识时长（精确到秒）
  const metDate = new Date(DATES.met + 'T00:00:00');
  const metDiff = now.getTime() - metDate.getTime();
  const metSeconds = Math.floor(metDiff / 1000);
  const metDays = Math.floor(metSeconds / 86400);
  const metHours = Math.floor((metSeconds % 86400) / 3600);
  const metMinutes = Math.floor((metSeconds % 3600) / 60);
  const metSecs = metSeconds % 60;
  
  // 计算结婚天数
  const marriedDate = new Date(DATES.married + 'T00:00:00');
  const marriedDiff = now.getTime() - marriedDate.getTime();
  const marriedDays = Math.floor(marriedDiff / 86400000);
  
  // 计算宝宝天数
  const babyDate = new Date(DATES.baby + 'T00:00:00');
  const babyDiff = now.getTime() - babyDate.getTime();
  const babyDays = Math.floor(babyDiff / 86400000);
  
  const stats = {
    met: {
      days: metDays,
      hours: metHours,
      minutes: metMinutes,
      seconds: metSecs,
      totalSeconds: metSeconds
    },
    married: {
      days: marriedDays,
      totalDays: marriedDays
    },
    baby: {
      days: babyDays,
      totalDays: babyDays
    },
    dates: DATES,
    timestamp: now.toISOString()
  };
  
  return new Response(JSON.stringify(stats, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
}
