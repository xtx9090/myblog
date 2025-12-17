<script setup lang="ts">
import Card from './Card.vue'

interface Props {
  name: string
  period: string
  role: string
  desc: string
}

defineProps<Props>()
</script>

<template>
  <Card animation-type="flip">
    <template #default>
      <div class="project-header">
        <h3 class="project-name">{{ name }}</h3>
        <span class="project-period">{{ period }}</span>
      </div>
      <div class="project-role">{{ role }}</div>
      <p class="project-desc">{{ desc }}</p>
    </template>
  </Card>
</template>

<style scoped>
.project-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;
}

.project-name {
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: var(--text-primary);
  flex: 1;
}

.project-period {
  font-size: 14px;
  color: var(--text-muted);
  white-space: nowrap;
}

.project-role {
  font-size: 14px;
  color: var(--text-subtle);
  margin-bottom: 16px;
}

.project-desc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

@media (max-width: 768px) {
  .project-header {
    flex-direction: column;
    gap: 8px;
  }

  .project-period {
    align-self: flex-start;
  }
}
</style>

