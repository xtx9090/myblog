<script setup lang="ts">
import Card from './Card.vue'
import { ref, onMounted } from 'vue'

interface Props {
  title: string
  skills: Array<{ name: string; years?: number | null }>
  experienceCount?: number
  experienceLabel?: string
}

const props = defineProps<Props>()

const tagRefs = ref<(HTMLElement | null)[]>([])

onMounted(() => {
  // 为每个标签添加延迟动画
  setTimeout(() => {
    tagRefs.value.forEach((el, index) => {
      if (el) {
        el.style.animationDelay = `${index * 0.1}s`
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate-in')
              }
            })
          },
          { threshold: 0.1 }
        )
        observer.observe(el)
      }
    })
  }, 100)
})
</script>

<template>
  <Card animation-type="fade" class="skill-category">
    <template #default>
      <h3 class="category-title">{{ title }}</h3>
      <div class="skill-tags">
        <span
          v-for="skill in skills"
          :key="skill.name"
          ref="tagRefs"
          class="skill-tag"
        >
          {{ skill.name }}
          <span v-if="skill.years && experienceCount !== undefined" class="years">
            {{ experienceCount }}{{ experienceLabel }}
          </span>
        </span>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.skill-category {
  position: relative;
  overflow: hidden;
}

.skill-category::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent);
  transition: left 0.5s ease;
}

.skill-category:hover::before {
  left: 100%;
}

.category-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 14px;
  color: var(--text-primary);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.skill-tag.animate-in {
  opacity: 1;
  transform: translateY(0) scale(1);
  animation: tag-pop-in 0.5s ease forwards;
}

@keyframes tag-pop-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.skill-tag:hover {
  background: var(--brand);
  color: var(--bg);
  transform: scale(1.1) rotate(2deg);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.years {
  font-size: 12px;
  opacity: 0.7;
  margin-left: 4px;
}
</style>

