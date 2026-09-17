/**
 * 兰西彭氏灯彩 · 数字交互毕设
 * 主控制器 v2.0 — 六专栏交互
 */

// -------------------- 工具函数 --------------------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const config = {
  // 5 个工艺步骤的配置
  craftSteps: {
    1: {
      tag: '步骤 01',
      name: '扎骨架',
      en: 'Binding · 柳条 / 铁丝',
      desc: '选用东北本地旱柳条，经水煮、晾干后弯成所需弧度，辅以细铁丝绑扎定型。彭氏祖传「三道扣」绑扎法，可让骨架承重 30 公斤而不变形，是灯彩百年不塌的关键。',
      time: '2 — 4 小时',
      level: '★★★★☆',
      tools: '柳条 · 铁丝 · 钳',
      next: '下一步 · 裱糊布面'
    },
    2: {
      tag: '步骤 02',
      name: '裱糊布面',
      en: 'Mounting · 宣纸 / 绸缎',
      desc: '将宣纸或绸缎按骨架形状裁剪，用彭氏独门「三浆法」——稀浆打底、中浆粘合、稠浆封边——糊裱于骨架之上。北方冬季干燥，裱糊时需在室内加湿，避免纸张脆裂。',
      time: '1 — 2 小时',
      level: '★★★☆☆',
      tools: '宣纸 · 浆糊 · 棕刷',
      next: '下一步 · 手绘纹样'
    },
    3: {
      tag: '步骤 03',
      name: '手绘纹样',
      en: 'Painting · 矿物颜料',
      desc: '彭氏灯彩最出彩的工序。以朱砂、石黄、群青、铅白等矿物颜料，在糊好的布面上手绘龙凤、福寿、瑞兽、锦鲤等传统纹样。每一笔都要在烛光下反复调整色相浓淡。',
      time: '4 — 8 小时',
      level: '★★★★★',
      tools: '矿物颜料 · 毛笔 · 砚台',
      next: '下一步 · 组装配饰'
    },
    4: {
      tag: '步骤 04',
      name: '组装配饰',
      en: 'Assembly · 流苏 / 穗子',
      desc: '在灯体上下加装木盖、铜环，并在底部缀以红黄流苏、锦缎穗子。彭氏的「双鱼穗」「盘龙结」是独有工艺，让灯彩在风中摇曳时更具灵动感。',
      time: '1 — 2 小时',
      level: '★★☆☆☆',
      tools: '木盖 · 流苏 · 铜环',
      next: '下一步 · 内置光源'
    },
    5: {
      tag: '步骤 05',
      name: '内置光源',
      en: 'Lighting · LED / 烛火',
      desc: '传统用蜡烛，现代多改用 LED 灯串。从灯笼顶部预留孔洞穿入光源，确保光线均匀且不产生阴影。最后接通电源，灯彩瞬间通电点亮——百年匠艺在这一刻苏醒。',
      time: '0.5 — 1 小时',
      level: '★★☆☆☆',
      tools: 'LED 灯串 · 蜡烛 · 电池',
      next: '已完成 · 返回首屏'
    }
  },

  // Maker 控制器
  maker: {
    frames: {
      ball:    { name: '圆球骨架', svg: '<ellipse cx="180" cy="240" rx="100" ry="110" fill="#C8102E" opacity="0.4"/><ellipse cx="180" cy="240" rx="100" ry="110" fill="none" stroke="#C8102E" stroke-width="3"/><line x1="80" y1="240" x2="280" y2="240" stroke="#C8102E" stroke-width="1.5" opacity="0.5"/><line x1="180" y1="130" x2="180" y2="350" stroke="#C8102E" stroke-width="1.5" opacity="0.5"/>' },
      barrel:  { name: '桶形骨架', svg: '<path d="M 110 160 Q 110 130 180 130 Q 250 130 250 160 L 250 320 Q 250 350 180 350 Q 110 350 110 320 Z" fill="#C8102E" opacity="0.4"/><path d="M 110 160 Q 110 130 180 130 Q 250 130 250 160 L 250 320 Q 250 350 180 350 Q 110 350 110 320 Z" fill="none" stroke="#C8102E" stroke-width="3"/>' },
      hex:     { name: '六角骨架', svg: '<polygon points="180,130 250,180 250,300 180,350 110,300 110,180" fill="#C8102E" opacity="0.4"/><polygon points="180,130 250,180 250,300 180,350 110,300 110,180" fill="none" stroke="#C8102E" stroke-width="3"/>' },
      diamond: { name: '菱形骨架', svg: '<polygon points="180,130 270,240 180,350 90,240" fill="#C8102E" opacity="0.4"/><polygon points="180,130 270,240 180,350 90,240" fill="none" stroke="#C8102E" stroke-width="3"/>' },
      gourd:   { name: '葫芦骨架', svg: '<ellipse cx="180" cy="190" rx="65" ry="55" fill="#C8102E" opacity="0.4"/><ellipse cx="180" cy="190" rx="65" ry="55" fill="none" stroke="#C8102E" stroke-width="3"/><ellipse cx="180" cy="295" rx="85" ry="65" fill="#C8102E" opacity="0.4"/><ellipse cx="180" cy="295" rx="85" ry="65" fill="none" stroke="#C8102E" stroke-width="3"/>' }
    },
    patterns: {
      cloud:   { name: '祥云纹', svg: '<path d="M 140 220 Q 150 200 170 205 Q 180 195 195 205 Q 215 200 220 220 Q 225 240 210 245 Q 195 250 180 245 Q 165 250 150 245 Q 135 240 140 220 Z" fill="none" stroke="#E8C268" stroke-width="2.5"/><circle cx="180" cy="225" r="3" fill="#E8C268"/>' },
      fish:    { name: '锦鲤纹', svg: '<ellipse cx="180" cy="240" rx="40" ry="18" fill="none" stroke="#E8C268" stroke-width="2.5"/><polygon points="220,240 240,225 240,255" fill="#E8C268"/><circle cx="155" cy="235" r="3" fill="#E8C268"/><path d="M 145 240 Q 175 245 210 240" fill="none" stroke="#E8C268" stroke-width="1.5"/>' },
      dragon:  { name: '瑞龙纹', svg: '<path d="M 130 220 Q 140 200 160 210 Q 170 195 185 205 Q 200 195 215 215 Q 230 230 220 245" fill="none" stroke="#E8C268" stroke-width="2.5"/><circle cx="180" cy="220" r="4" fill="none" stroke="#E8C268" stroke-width="2"/><path d="M 178 215 L 175 210 M 182 215 L 185 210 M 175 220 L 170 222 M 185 220 L 190 222" stroke="#E8C268" stroke-width="1.5"/>' },
      phoenix: { name: '凤凰纹', svg: '<path d="M 140 240 Q 160 215 180 230 Q 200 215 220 240" fill="none" stroke="#E8C268" stroke-width="2.5"/><path d="M 180 230 L 180 260 M 175 245 L 185 245 M 170 255 L 190 255" stroke="#E8C268" stroke-width="2"/><circle cx="180" cy="225" r="3" fill="#E8C268"/>' },
      bat:     { name: '福蝠纹', svg: '<path d="M 145 240 Q 140 215 155 215 Q 165 220 170 230 Q 175 220 180 215 Q 185 220 190 230 Q 195 220 205 215 Q 220 215 215 240 Q 210 250 200 245 Q 190 250 180 245 Q 170 250 160 245 Q 150 250 145 240 Z" fill="none" stroke="#E8C268" stroke-width="2"/>' }
    },
    colors: {
      red:    { name: '朱红', hex: '#C8102E', glow: 'rgba(200,16,46,0.45)' },
      gold:   { name: '暖金', hex: '#E8C268', glow: 'rgba(232,194,104,0.5)' },
      purple: { name: '紫韵', hex: '#6B2C7C', glow: 'rgba(107,44,124,0.45)' },
      green:  { name: '松绿', hex: '#2E7D5B', glow: 'rgba(46,125,91,0.45)' },
      ink:    { name: '水墨', hex: '#2A2A2A', glow: 'rgba(150,150,150,0.35)' }
    }
  },

  // 作品展厅数据
  gallery: [
    {
      cat: 'traditional', catLabel: '传统老灯彩',
      name: '「福寿双全」方形宫灯',
      meta: '1950s · 第二代传人彭福临制',
      desc: '彭氏第二代传人彭福临的代表作之一，方形宫灯，正面书「福」「寿」二字。承载了新中国初期民间工艺与红色叙事的双重记忆。'
    },
    {
      cat: 'traditional', catLabel: '传统老灯彩',
      name: '「吉祥如意」圆形纱灯',
      meta: '1972 · 庙会供奉款',
      desc: '椭圆形纱灯，正中朱红团「吉」字，藏传佛教寺庙供奉款。纱面透光柔和，夜间远观如一轮红月。'
    },
    {
      cat: 'traditional', catLabel: '传统老灯彩',
      name: '「八卦瑞兽」菱形灯',
      meta: '1985 · 第三代传人彭志远制',
      desc: '彭志远在传统六角形基础上发展出的菱形灯，内饰八卦方位图，象征驱邪纳福。'
    },
    {
      cat: 'festival', catLabel: '现代大型灯组',
      name: '「金玉满堂」大型灯组',
      meta: '2018 · 哈尔滨冰雪灯会主灯',
      desc: '高 8 米、宽 6 米的巨型灯组，以金元宝为主体，融合十二生肖剪影，是哈尔滨冰雪灯会标志性作品。'
    },
    {
      cat: 'festival', catLabel: '现代大型灯组',
      name: '「朱门锦户」门楼灯组',
      meta: '2020 · 兰西县春节灯展',
      desc: '仿东北传统民居「门楼」造型，整组可拆装运输，夜间通电后朱红贴金、富贵逼人。'
    },
    {
      cat: 'festival', catLabel: '现代大型灯组',
      name: '「春回大地」鼓型灯组',
      meta: '2022 · 哈尔滨冰雪大世界',
      desc: '鼓型灯组直径 6 米，鼓面绘「春」字，鼓钉 16 颗 LED 灯珠齐亮，象征春回大地、吉祥如意。'
    },
    {
      cat: 'aigc', catLabel: 'AIGC 新创作',
      name: '「灵韵四方」菱形紫光灯',
      meta: '2026 · 本毕设 AIGC 衍生 · SD 训练',
      desc: '本毕设 AIGC 衍生作品之一。用 Stable Diffusion 训练的东北民俗纹样 LoRA 模型生成草图，人工筛选后落地制作。首次引入紫光色作为彭氏灯彩主色。'
    },
    {
      cat: 'aigc', catLabel: 'AIGC 新创作',
      name: '「极光锦鲤」圆形纹样灯',
      meta: '2026 · 本毕设 AIGC 衍生 · ControlNet',
      desc: '使用 ControlNet 进行线稿约束生成的锦鲤纹样，叠加极光渐变背景，是彭氏灯彩「形」与「意」的当代表达。'
    },
    {
      cat: 'aigc', catLabel: 'AIGC 新创作',
      name: '「叠彩纹章」抽象纹样灯',
      meta: '2026 · 本毕设 AIGC 衍生 · LoRA',
      desc: '通过 LoRA 微调让模型掌握彭氏家传的圆环叠纹语言，生成的几何抽象图案充满民俗仪式感。'
    }
  ]
};

// -------------------- 全局 Toast --------------------
const Toast = {
  show(msg, duration = 2200) {
    const toast = $('#globalToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add('is-show'));
    clearTimeout(this._t);
    this._t = setTimeout(() => {
      toast.classList.remove('is-show');
      setTimeout(() => { toast.hidden = true; }, 300);
    }, duration);
  }
};

// -------------------- 滚动监听 --------------------
class ScrollSpy {
  constructor(sections, callback) {
    this.sections = sections;
    this.callback = callback;
    this.currentIndex = -1;
    this.observer = null;
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      this.bindScrollFallback();
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = this.sections.findIndex(s => s.id === entry.target.id);
          if (index !== -1 && index !== this.currentIndex) {
            this.currentIndex = index;
            this.callback(index);
          }
        }
      });
    }, {
      root: null,
      rootMargin: `-72px 0px -50% 0px`,
      threshold: 0
    });
    this.sections.forEach(section => this.observer.observe(section));
  }

  bindScrollFallback() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const scrollPos = window.scrollY + 172;
        let activeIndex = 0;
        this.sections.forEach((section, index) => {
          if (scrollPos >= section.offsetTop) activeIndex = index;
        });
        if (activeIndex !== this.currentIndex) {
          this.currentIndex = activeIndex;
          this.callback(activeIndex);
        }
        ticking = false;
      });
      ticking = true;
    }, { passive: true });
  }
}

// -------------------- 导航控制器 --------------------
class NavigationController {
  constructor() {
    this.nav = $('#topNav');
    this.menu = $('#navMenu');
    this.toggle = $('#navMobileToggle');
    this.items = $$('.nav-item');
    this.progress = $('#navProgress');
    this.chapter = $('#navChapter');
    this.isOpen = false;
    this.chapters = ['卷首', '溯源', '工艺', '展厅', '创作', '展望'];
    this.bindEvents();
  }

  bindEvents() {
    this.items.forEach((item, index) => {
      item.addEventListener('click', e => this.handleNavClick(e, index));
    });
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleMobileMenu());
    }
    document.addEventListener('click', e => {
      if (this.isOpen && !this.nav.contains(e.target)) this.closeMobileMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) this.closeMobileMenu();
    });
  }

  handleNavClick(e, index) {
    e.preventDefault();
    const target = $(e.currentTarget.getAttribute('href'));
    if (target) {
      const offset = (this.nav?.offsetHeight || 72) + 8;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    this.setActiveItem(index);
    this.closeMobileMenu();
  }

  setActiveItem(index) {
    this.items.forEach((item, i) => {
      const dot = item.querySelector('.nav-dot');
      if (i === index) {
        item.classList.remove('nav-item-default');
        item.classList.add('nav-item-active');
        if (!dot) {
          const newDot = document.createElement('span');
          newDot.className = 'nav-dot';
          newDot.setAttribute('aria-hidden', 'true');
          item.appendChild(newDot);
        }
      } else {
        item.classList.remove('nav-item-active');
        item.classList.add('nav-item-default');
        if (dot) dot.remove();
      }
    });
    if (this.progress) this.progress.textContent = `${String(index + 1).padStart(2, '0')} / 06`;
    if (this.chapter) this.chapter.textContent = this.chapters[index] || '卷首';
  }

  toggleMobileMenu() {
    this.isOpen = !this.isOpen;
    this.menu.classList.toggle('open', this.isOpen);
    this.toggle.setAttribute('aria-expanded', String(this.isOpen));
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isOpen = false;
    this.menu.classList.remove('open');
    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

// -------------------- 首页·鼠标灯笼点亮 --------------------
class VisionFireflies {
  constructor() {
    this.container = $('#mouseFireflies');
    this.scene = $('.scene-vision');
    this.lastFireTime = 0;
    this.throttle = 50;
    if (this.container && this.scene) this.bindEvents();
  }

  bindEvents() {
    this.scene.addEventListener('mousemove', e => this.handleMove(e));
    this.scene.addEventListener('touchmove', e => {
      if (e.touches.length) this.handleMove(e.touches[0]);
    }, { passive: true });
  }

  handleMove(e) {
    const now = Date.now();
    if (now - this.lastFireTime < this.throttle) return;
    this.lastFireTime = now;

    const rect = this.scene.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    // 随机生成 1-3 个小灯笼
    const count = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * 60;
      const offsetY = (Math.random() - 0.5) * 60;
      this.spawn(x + offsetX, y + offsetY);
    }
  }

  spawn(x, y) {
    const el = document.createElement('div');
    el.className = 'firefly';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    const size = 12 + Math.random() * 16;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    this.container.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  }
}

// -------------------- 工艺步骤切换 --------------------
class CraftStepper {
  constructor() {
    this.steps = $$('.craft-step');
    this.label = $('#diagStepLabel');
    this.tagEl = $('#craftStepTag');
    this.nameEl = $('#craftName');
    this.enEl = $('#craftEn');
    this.descEl = $('#craftDesc');
    this.timeEl = $('#craftTime');
    this.levelEl = $('#craftLevel');
    this.toolsEl = $('#craftTools');
    this.nextBtn = $('#craftNext');
    this.view = $('.craft-view');
    this.diagram = $('#craftDiagram');
    this.currentStep = 1;
    this.bindEvents();
  }

  bindEvents() {
    this.steps.forEach(step => {
      step.addEventListener('click', () => this.activate(parseInt(step.dataset.step, 10)));
      step.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.activate(parseInt(step.dataset.step, 10));
        }
      });
    });
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.goNext());
  }

  activate(step) {
    if (step === this.currentStep) return;
    const cfg = config.craftSteps[step];
    if (!cfg) return;

    this.currentStep = step;

    // 切换 step 激活态
    this.steps.forEach(s => {
      const isActive = parseInt(s.dataset.step, 10) === step;
      s.classList.toggle('is-active', isActive);
      s.setAttribute('aria-selected', String(isActive));
    });

    // 更新右侧文字
    this.tagEl.textContent = cfg.tag;
    this.nameEl.textContent = cfg.name;
    this.enEl.textContent = cfg.en;
    this.descEl.textContent = cfg.desc;
    this.timeEl.textContent = cfg.time;
    this.levelEl.textContent = cfg.level;
    this.toolsEl.textContent = cfg.tools;
    this.nextBtn.textContent = step === 5 ? '已完成 · 返回首屏 ↻' : cfg.next;

    // 更新示意图：重新触发动画 + 切换 step5 时点亮灯光
    this.updateDiagram(step);

    // 同步 view 状态 class
    this.view.className = 'craft-view is-step-' + step;
  }

  updateDiagram(step) {
    if (!this.diagram) return;
    // 重置 SVG 内容
    const svg = this.diagram.querySelector('svg');
    if (svg) {
      // 触发重新挂载动画（克隆替换）
      const clone = svg.cloneNode(true);
      svg.replaceWith(clone);
      // 步骤 5 点亮灯光
      const lightGroup = clone.querySelector('.diag-light');
      if (lightGroup) {
        lightGroup.style.opacity = step === 5 ? '1' : '0';
      }
      // 更新步骤标签
      const label = clone.querySelector('#diagStepLabel');
      if (label) label.textContent = `步骤 0${step} · ${config.craftSteps[step].name}`;
      // 重新添加 lightGlow gradient defs
      if (!clone.querySelector('#lightGlow')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
          <radialGradient id="lightGlow">
            <stop offset="0%" stop-color="#FFE4A8" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#E8C268" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#E8C268" stop-opacity="0"/>
          </radialGradient>`;
        clone.insertBefore(defs, clone.firstChild);
      }
    }
  }

  goNext() {
    if (this.currentStep === 5) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    this.activate(this.currentStep + 1);
    this.steps[this.currentStep - 1]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// -------------------- 展厅筛选 + Modal --------------------
class GalleryController {
  constructor() {
    this.items = $$('.gallery-item');
    this.filters = $$('.gfilter');
    this.modal = $('#galleryModal');
    this.modalMask = $('#modalMask');
    this.modalClose = $('#modalClose');
    this.modalImg = $('#modalImg');
    this.modalCat = $('#modalCat');
    this.modalName = $('#modalName');
    this.modalMeta = $('#modalMeta');
    this.modalDesc = $('#modalDesc');
    this.bindEvents();
  }

  bindEvents() {
    this.filters.forEach(btn => {
      btn.addEventListener('click', () => this.filter(btn.dataset.filter));
    });
    this.items.forEach((item, idx) => {
      item.addEventListener('click', () => this.openModal(idx));
    });
    if (this.modalClose) {
      this.modalClose.addEventListener('click', e => {
        e.stopPropagation();
        this.closeModal();
      });
    }
    if (this.modalMask) {
      this.modalMask.addEventListener('click', () => this.closeModal());
    }
    // 点击卡片本体时阻止冒泡到 mask，避免误关
    const modalCard = this.modal ? this.modal.querySelector('.modal-card') : null;
    if (modalCard) {
      modalCard.addEventListener('click', e => e.stopPropagation());
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !this.modal.hidden) this.closeModal();
    });
  }

  filter(cat) {
    this.filters.forEach(b => b.classList.toggle('is-active', b.dataset.filter === cat));
    this.items.forEach(item => {
      if (cat === 'all' || item.dataset.cat === cat) {
        item.classList.remove('is-hidden');
      } else {
        item.classList.add('is-hidden');
      }
    });
  }

  openModal(idx) {
    const visible = this.items.filter(i => !i.classList.contains('is-hidden'));
    const realIdx = this.items.indexOf(visible[idx]);
    const item = this.items[realIdx];
    if (!item) return;

    const svg = item.querySelector('.gallery-img svg');
    const data = config.gallery[realIdx] || {};

    if (svg && this.modalImg) this.modalImg.innerHTML = svg.outerHTML;
    if (this.modalCat) this.modalCat.textContent = data.catLabel || '';
    if (this.modalName) this.modalName.textContent = data.name || '';
    if (this.modalMeta) this.modalMeta.textContent = data.meta || '';
    if (this.modalDesc) this.modalDesc.textContent = data.desc || '';

    this.modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.modal.hidden = true;
    document.body.style.overflow = '';
  }
}

// -------------------- AIGC 灯彩创作器 --------------------
class LanternMaker {
  constructor() {
    this.frameEl = $('#previewFrameShape');
    this.patternEl = $('#previewPattern');
    this.glowEl = $('#previewGlow');
    this.bodyEl = $('#previewBody');
    this.signatureEl = $('#previewSignature');
    this.nameEl = $('#previewName');
    this.configEl = $('#previewConfig');
    this.slider = $('#lightSlider');
    this.sliderValue = $('#lightValue');
    this.resetBtn = $('#previewReset');
    this.saveBtn = $('#previewSave');
    this.collectionWrap = $('#makerCollection');
    this.collectionList = $('#collectionList');
    this.collectionCount = $('#collectionCount');
    this.collection = [];

    this.state = {
      frame: 'ball',
      pattern: 'cloud',
      color: 'red',
      light: 75,
      savedName: ''
    };

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    // 骨架选择
    $$('.cg-options[data-control="frame"] .cg-option').forEach(opt => {
      opt.addEventListener('click', () => {
        $$('.cg-options[data-control="frame"] .cg-option').forEach(o => o.classList.remove('is-active'));
        opt.classList.add('is-active');
        this.state.frame = opt.dataset.value;
        this.render();
      });
    });
    // 纹样选择
    $$('.cg-options[data-control="pattern"] .cg-option').forEach(opt => {
      opt.addEventListener('click', () => {
        $$('.cg-options[data-control="pattern"] .cg-option').forEach(o => o.classList.remove('is-active'));
        opt.classList.add('is-active');
        this.state.pattern = opt.dataset.value;
        this.render();
      });
    });
    // 配色选择
    $$('.cg-options-color .cg-option-color').forEach(opt => {
      opt.addEventListener('click', () => {
        $$('.cg-options-color .cg-option-color').forEach(o => o.classList.remove('is-active'));
        opt.classList.add('is-active');
        this.state.color = opt.dataset.value;
        this.render();
      });
    });
    // 亮度滑块
    if (this.slider) {
      this.slider.addEventListener('input', () => {
        this.state.light = parseInt(this.slider.value, 10);
        if (this.sliderValue) this.sliderValue.textContent = `${this.state.light}%`;
        this.renderGlow();
      });
    }
    // 重置
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.reset());
    }
    // 收藏
    if (this.saveBtn) {
      this.saveBtn.addEventListener('click', () => this.save());
    }
  }

  render() {
    this.renderFrame();
    this.renderPattern();
    this.renderGlow();
    this.renderInfo();
  }

  renderFrame() {
    if (!this.frameEl) return;
    const f = config.maker.frames[this.state.frame];
    const c = config.maker.colors[this.state.color];
    if (!f || !c) return;
    // 替换骨架，套用当前配色
    this.frameEl.innerHTML = f.svg.replace(/C8102E/g, c.hex).replace(/fill="#C8102E"/g, `fill="${c.hex}" opacity="0.4"`).replace(/stroke="#C8102E"/g, `stroke="${c.hex}"`);
  }

  renderPattern() {
    if (!this.patternEl) return;
    const p = config.maker.patterns[this.state.pattern];
    if (!p) return;
    this.patternEl.innerHTML = p.svg;
  }

  renderGlow() {
    if (!this.glowEl) return;
    const c = config.maker.colors[this.state.color];
    if (!c) return;
    const intensity = this.state.light / 100;
    this.glowEl.innerHTML = `<circle cx="180" cy="240" r="${60 + intensity * 80}" fill="${c.hex}" opacity="${intensity * 0.5}"/>`;
  }

  renderInfo() {
    const f = config.maker.frames[this.state.frame];
    const p = config.maker.patterns[this.state.pattern];
    const c = config.maker.colors[this.state.color];
    if (this.nameEl) this.nameEl.textContent = this.state.savedName || '未命名 · 基础款';
    if (this.configEl) this.configEl.textContent = `${f.name} · ${p.name} · ${c.name}配色 · 亮度 ${this.state.light}%`;
  }

  reset() {
    this.state.frame = 'ball';
    this.state.pattern = 'cloud';
    this.state.color = 'red';
    this.state.light = 75;
    this.state.savedName = '';
    // 重置按钮状态
    $$('.cg-options[data-control="frame"] .cg-option').forEach(o => o.classList.toggle('is-active', o.dataset.value === 'ball'));
    $$('.cg-options[data-control="pattern"] .cg-option').forEach(o => o.classList.toggle('is-active', o.dataset.value === 'cloud'));
    $$('.cg-options-color .cg-option-color').forEach(o => o.classList.toggle('is-active', o.dataset.value === 'red'));
    if (this.slider) this.slider.value = '75';
    if (this.sliderValue) this.sliderValue.textContent = '75%';
    this.render();
    Toast.show('已重置为初始配置');
  }

  save() {
    const f = config.maker.frames[this.state.frame];
    const p = config.maker.patterns[this.state.pattern];
    const c = config.maker.colors[this.state.color];
    const name = `${c.name}${f.name}${p.name}`;
    this.state.savedName = name;

    const item = {
      name,
      state: { ...this.state },
      svg: this.bodyEl?.innerHTML || ''
    };
    this.collection.unshift(item);
    if (this.collection.length > 12) this.collection = this.collection.slice(0, 12);
    this.renderCollection();
    this.renderInfo();

    if (this.collectionWrap) this.collectionWrap.hidden = false;
    Toast.show(`已收藏「${name}」♥`);
  }

  renderCollection() {
    if (!this.collectionList) return;
    if (this.collectionCount) this.collectionCount.textContent = this.collection.length;
    this.collectionList.innerHTML = this.collection.map((it, i) => `
      <div class="collection-item" data-idx="${i}">
        <div class="collection-item-img">${this.miniSVG(it)}</div>
        <div class="collection-item-name">${it.name}</div>
      </div>
    `).join('');

    // 绑定点击重新配置
    $$('.collection-item', this.collectionList).forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.dataset.idx, 10);
        const item = this.collection[idx];
        if (!item) return;
        Object.assign(this.state, item.state);
        this.state.savedName = item.name;
        // 同步 UI
        $$('.cg-options[data-control="frame"] .cg-option').forEach(o => o.classList.toggle('is-active', o.dataset.value === this.state.frame));
        $$('.cg-options[data-control="pattern"] .cg-option').forEach(o => o.classList.toggle('is-active', o.dataset.value === this.state.pattern));
        $$('.cg-options-color .cg-option-color').forEach(o => o.classList.toggle('is-active', o.dataset.value === this.state.color));
        if (this.slider) this.slider.value = String(this.state.light);
        if (this.sliderValue) this.sliderValue.textContent = `${this.state.light}%`;
        this.render();
        Toast.show(`已加载「${item.name}」`);
      });
    });
  }

  miniSVG(item) {
    const c = config.maker.colors[item.state.color];
    return `<svg viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="65" r="35" fill="${c.hex}" opacity="0.5"/>
      <circle cx="50" cy="65" r="20" fill="${c.glow}" opacity="0.7"/>
    </svg>`;
  }
}

// -------------------- 溯源时间线（横向可拖动） --------------------
class OriginTimeline {
  constructor() {
    this.lane = $('#timelineLane');
    if (!this.lane) return;

    this.handle = $('#timelineHandle');
    this.fill = $('#timelineFill');
    this.yearEl = $('#timelineYear');
    this.nameEl = $('#timelineName');
    this.infos = Array.from(this.lane.querySelectorAll('.timeline-node-info'));
    this.dots = Array.from(this.lane.querySelectorAll('.timeline-dot'));
    this.nodes = Array.from(document.querySelectorAll('.timeline-stops .timeline-node'));
    this.cards = Array.from($$('#scene-origin .origin-grid .origin-card'));

    this.names = this.nodes.map(n =>
      n.querySelector('.timeline-node-name').textContent.trim()
    );

    this.count = this.nodes.length;
    this.index = 0;
    this.percent = 0;
    this.dragging = false;

    this.bind();
    this.apply(0, true);
  }

  bind() {
    // 指针拖动：pointerdown 落点既可以是手柄，也可以是轨道任意位置
    this.lane.addEventListener('pointerdown', e => {
      this.dragging = true;
      this.lane.classList.add('is-dragging');
      this.lane.setPointerCapture(e.pointerId);
      this.percentFromEvent(e);
    });

    this.lane.addEventListener('pointermove', e => {
      if (!this.dragging) return;
      this.percentFromEvent(e);
    });

    const endDrag = e => {
      if (!this.dragging) return;
      this.dragging = false;
      this.lane.classList.remove('is-dragging');
      // 松手吸附到最近节点
      this.setIndex(this.nearestIndex());
      this.swing();
    };

    this.lane.addEventListener('pointerup', endDrag);
    this.lane.addEventListener('pointercancel', endDrag);

    // 键盘可达性：手柄聚焦后方向键切换
    this.handle.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = Math.min(this.index + 1, this.count - 1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = Math.max(this.index - 1, 0);
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = this.count - 1;
      if (next !== null) {
        e.preventDefault();
        this.setIndex(next);
        this.swing();
      }
    });

    // 点击节点 / 卡片均可跳转
    this.nodes.forEach(n => {
      n.addEventListener('click', () => {
        this.setIndex(parseInt(n.dataset.index, 10));
        this.swing();
      });
    });

    this.cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = this.cards.indexOf(card);
        if (idx >= 0) { this.setIndex(idx); this.swing(); }
      });
    });
  }

  percentFromEvent(e) {
    const rect = this.lane.getBoundingClientRect();
    const p = ((e.clientX - rect.left) / rect.width) * 100;
    this.setPercent(Math.max(0, Math.min(100, p)));
  }

  nearestIndex() {
    return Math.round((this.percent / 100) * (this.count - 1));
  }

  setIndex(i) {
    const clamped = Math.max(0, Math.min(this.count - 1, i));
    this.setPercent((clamped / (this.count - 1)) * 100);
  }

  setPercent(p) {
    this.percent = p;
    this.handle.style.left = `${p}%`;
    this.fill.style.width = `${p}%`;
    const idx = this.nearestIndex();
    if (idx !== this.index) this.apply(idx);
  }

  apply(idx, silent) {
    this.index = idx;
    const lit = i => i <= idx;

    this.infos.forEach((el, i) => el.classList.toggle('is-lit', lit(i)));
    this.dots.forEach((el, i) => el.classList.toggle('is-lit', lit(i)));
    this.nodes.forEach((el, i) => el.classList.toggle('is-active', i === idx));

    // 卡片联动：当前节点高亮，其余压暗
    this.cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === idx);
      card.classList.toggle('is-dim', i !== idx);
    });

    const year = this.nodes[idx].querySelector('.timeline-node-year').textContent.trim();
    const name = this.cards[idx] ? this.cards[idx].querySelector('.origin-card-name').textContent.trim() : this.names[idx];
    if (this.yearEl) this.yearEl.textContent = year;
    if (this.nameEl) this.nameEl.textContent = name;
    this.handle.setAttribute('aria-valuenow', String(idx));
    this.handle.setAttribute('aria-valuetext', `${year} ${name}`);
    if (!silent) Toast.show(`${year} · ${name}`);
  }

  swing() {
    this.handle.classList.remove('is-swing');
    // 强制重排以重启动画
    void this.handle.offsetWidth;
    this.handle.classList.add('is-swing');
  }
}

// -------------------- 主应用 --------------------
class LanternApp {
  constructor() {
    this.navController = new NavigationController();
    this.visionFireflies = new VisionFireflies();
    this.craftStepper = new CraftStepper();
    this.galleryController = new GalleryController();
    this.lanternMaker = new LanternMaker();
    this.originTimeline = new OriginTimeline();

    this.sections = [
      $('#scene-vision'),
      $('#scene-origin'),
      $('#scene-craft'),
      $('#scene-gallery'),
      $('#scene-maker'),
      $('#scene-heritage')
    ].filter(Boolean);

    this.scrollSpy = new ScrollSpy(this.sections, index => {
      this.navController.setActiveItem(index);
    });

    this.setInitialActiveState();
  }

  setInitialActiveState() {
    this.navController.setActiveItem(0);
  }
}

// -------------------- 启动 --------------------
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new LanternApp());
} else {
  new LanternApp();
}