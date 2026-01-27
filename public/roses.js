// 玫瑰花瓣动画系统（Canvas 实现）
class RoseAnimation {
  constructor() {
    this.canvas = document.getElementById('roseCanvas');
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.petals = [];
    this.intensity = 1; // 强度倍数
    
    // 检测是否降低动画
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    this.resize();
    this.init();
    
    window.addEventListener('resize', () => this.resize());
    
    if (!this.reducedMotion) {
      this.animate();
    }
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    // 根据屏幕大小调整粒子数量（增加到原来的 2-3 倍）
    const isMobile = window.innerWidth < 768;
    const baseCount = isMobile ? 40 : 80;
    
    for (let i = 0; i < baseCount; i++) {
      this.petals.push(this.createPetal());
    }
  }
  
  createPetal() {
    return {
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height - this.canvas.height,
      size: Math.random() * 25 + 20, // 增大尺寸：20-45px
      speedY: Math.random() * 1 + 0.5,
      speedX: Math.random() * 0.5 - 0.25,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      opacity: Math.random() * 0.6 + 0.4, // 提高透明度
      emoji: Math.random() > 0.2 ? '🌹' : '🌸' // 更多玫瑰
    };
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.petals.forEach((petal, index) => {
      // 更新位置
      petal.y += petal.speedY * this.intensity;
      petal.x += petal.speedX + Math.sin(petal.y * 0.01) * 0.5;
      petal.rotation += petal.rotationSpeed;
      
      // 重置超出屏幕的花瓣
      if (petal.y > this.canvas.height + 50) {
        this.petals[index] = this.createPetal();
      }
      
      // 绘制花瓣
      this.ctx.save();
      this.ctx.globalAlpha = petal.opacity;
      this.ctx.font = `${petal.size}px Arial`;
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate(petal.rotation * Math.PI / 180);
      this.ctx.fillText(petal.emoji, 0, 0);
      this.ctx.restore();
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  increaseIntensity() {
    // 玫瑰雨效果：增加强度和数量
    this.intensity = 2.5;
    const additionalPetals = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < additionalPetals; i++) {
      this.petals.push(this.createPetal());
    }
    
    // 5 秒后恢复正常
    setTimeout(() => {
      this.intensity = 1;
      this.petals = this.petals.slice(0, window.innerWidth < 768 ? 40 : 80);
    }, 5000);
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  window.roseAnimation = new RoseAnimation();
});
