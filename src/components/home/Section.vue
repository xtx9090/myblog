<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'

interface Props {
  title?: string
  delay?: number
  animationClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  animationClass: 'animate-in'
})

const isVisible = ref(false)
let observer: IntersectionObserver | null = null
const sectionRef = ref<HTMLElement>()

onMounted(() => {
  // 延迟显示动画
  setTimeout(() => {
    isVisible.value = true
  }, props.delay)

  // 滚动触发动画
  if (sectionRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(props.animationClass)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<template>
  <section ref="sectionRef" class="home-section" :class="{ visible: isVisible }">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <div class="section-content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.home-section {
  padding: 60px 28px;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.home-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-content {
  width: 100%;
}

.section-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  color: var(--text-primary);
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  width: 100%;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--brand), transparent);
  border-radius: 2px;
  animation: line-expand 1s ease forwards;
}

@keyframes line-expand {
  from {
    width: 0;
  }
  to {
    width: 60px;
  }
}

@media (max-width: 480px) {
  .home-section {
    padding: 40px 20px;
  }
}
</style>

