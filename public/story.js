// 故事页逻辑
document.addEventListener('DOMContentLoaded', () => {
  // 滚动到结尾时触发玫瑰雨
  const ending = document.getElementById('storyEnding');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        triggerRoseRain();
      }
    });
  }, { threshold: 0.5 });
  
  if (ending) {
    observer.observe(ending);
  }
  
  // 点击交互
  document.addEventListener('click', createClickRose);
});

// 触发玫瑰雨效果（增加粒子密度）
function triggerRoseRain() {
  if (window.roseAnimation) {
    window.roseAnimation.increaseIntensity();
  }
}

// 点击生成玫瑰
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

const style = document.createElement('style');
style.textContent = `
  @keyframes roseFloat {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-50px) scale(0.5); opacity: 0; }
  }
`;
document.head.appendChild(style);
