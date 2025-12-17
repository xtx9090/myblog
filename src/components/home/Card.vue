<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
  hover?: boolean
  animationType?: 'fade' | 'scale' | 'flip'
}

withDefaults(defineProps<Props>(), {
  hover: true,
  animationType: 'fade'
})

const cardRef = ref<HTMLElement>()

onMounted(() => {
  // 使用 Intersection Observer 触发动画
  if (cardRef.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )
    observer.observe(cardRef.value)
  }
})
</script>

<template>
  <div
    ref="cardRef"
    class="card"
    :class="[
      `card-${animationType}`,
      { 'card-hover': hover }
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.card {
  padding: 24px;
  background: var(--surface-2);
  border-radius: 16px;
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Fade 动画 */
.card-fade {
  opacity: 0;
  transform: translateY(20px);
}

.card-fade.animate-in {
  opacity: 1;
  transform: translateY(0);
  animation: fade-in 0.5s ease forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale 动画 */
.card-scale {
  opacity: 0;
  transform: scale(0.9);
}

.card-scale.animate-in {
  opacity: 1;
  transform: scale(1);
  animation: scale-in 0.5s ease forwards;
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Flip 动画 */
.card-flip {
  opacity: 0;
  transform: translateY(30px) rotateX(10deg);
  perspective: 1000px;
}

.card-flip.animate-in {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
  animation: flip-in 0.6s ease forwards;
}

@keyframes flip-in {
  from {
    opacity: 0;
    transform: translateY(30px) rotateX(10deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

/* 悬停效果 */
.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  border-color: var(--brand);
}

.card-flip.card-hover:hover {
  transform: translateY(-8px) rotateX(-2deg) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.card-scale.card-hover:hover {
  transform: translateY(-6px) scale(1.05);
}
</style>

