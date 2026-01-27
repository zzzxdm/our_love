// 首页主逻辑
const DATES = {
  met: '2020-08-21',
  married: '2021-01-18',
  baby: '2024-12-30'
};

// 情话文案池（20+ 条）
const loveQuotes = [
  "谢谢你选择了我，也谢谢你让我学会了更好地爱。",
  "从遇见你的那天起，时间开始有了甜味。",
  "我不是每天都浪漫，但我每天都在更爱你。",
  "你的名字，是我最短的情诗。",
  "我们把平凡的日子，过成了闪闪发光的纪念日。",
  "你一笑，我就想把全世界的玫瑰都送给你。",
  "家因为有你，才叫家。",
  "我会一直牵着你，去看更多的日出与晚风。",
  "感谢你让我成为丈夫，也成为爸爸。",
  "我们的故事不需要惊天动地，只要一直在一起。",
  "余生很长，我想和你一起慢慢走。",
  "你是我的软肋，也是我的铠甲。",
  "遇见你之后，所有的星星都落在了我的眼睛里。",
  "我爱你，不是因为你是谁，而是因为和你在一起时我是谁。",
  "你是我今生最美的风景，也是我永远的归宿。",
  "陪伴是最长情的告白，而你就是我最想守护的人。",
  "我想和你一起，把生活过成诗。",
  "你的笑容，是我每天最期待的阳光。",
  "感谢命运让我们相遇，感谢时光让我们相守。",
  "我会用一生的时间，来爱你这一个人。",
  "你是我的今天，也是我所有的明天。",
  "有你的地方，就是我的全世界。",
  "我们一起经历的每一个瞬间，都是我最珍贵的回忆。"
];

let currentQuoteIndex = 0;

// 更新统计数据
function updateStats() {
  const now = new Date();
  
  // 相识时长
  const metDate = new Date(DATES.met + 'T00:00:00');
  const metDiff = now - metDate;
  const metDays = Math.floor(metDiff / 86400000);
  const metHours = Math.floor((metDiff % 86400000) / 3600000);
  const metMinutes = Math.floor((metDiff % 3600000) / 60000);
  
  document.getElementById('metDays').innerHTML = 
    `<span class="number">${metDays}</span> 天 <span class="number">${metHours}</span> 小时 <span class="number">${metMinutes}</span> 分钟`;
  
  // 结婚天数
  const marriedDate = new Date(DATES.married + 'T00:00:00');
  const marriedDays = Math.floor((now - marriedDate) / 86400000);
  document.getElementById('marriedDays').innerHTML = `<span class="number">${marriedDays}</span> 天`;
  
  // 宝宝天数
  const babyDate = new Date(DATES.baby + 'T00:00:00');
  const babyDays = Math.floor((now - babyDate) / 86400000);
  document.getElementById('babyDays').innerHTML = `<span class="number">${babyDays}</span> 天`;
}

// 情话轮播
function rotateQuote() {
  const quoteElement = document.getElementById('quoteText');
  quoteElement.style.animation = 'none';
  setTimeout(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % loveQuotes.length;
    quoteElement.textContent = loveQuotes[currentQuoteIndex];
    quoteElement.style.animation = 'fadeIn 1s ease-in-out';
  }, 50);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  // 显示第一条情话
  document.getElementById('quoteText').textContent = loveQuotes[0];
  
  // 更新统计
  updateStats();
  setInterval(updateStats, 60000); // 每分钟更新一次
  
  // 每 5 秒切换情话
  setInterval(rotateQuote, 5000);
  
  // 点击交互：生成玫瑰粒子
  document.addEventListener('click', createClickRose);
});

// 点击生成玫瑰效果
function createClickRose(e) {
  const rose = document.createElement('div');
  rose.textContent = '🌹';
  rose.style.position = 'fixed';
  rose.style.left = e.clientX + 'px';
  rose.style.top = e.clientY + 'px';
  rose.style.fontSize = '24px';
  rose.style.pointerEvents = 'none';
  rose.style.zIndex = '9999';
  rose.style.animation = 'roseFloat 1s ease-out forwards';
  document.body.appendChild(rose);
  
  setTimeout(() => rose.remove(), 1000);
}

// 添加点击玫瑰动画
const style = document.createElement('style');
style.textContent = `
  @keyframes roseFloat {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-50px) scale(0.5); opacity: 0; }
  }
`;
document.head.appendChild(style);
