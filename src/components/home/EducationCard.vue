<script setup lang="ts">
import Card from './Card.vue'

interface Props {
  degree: string
  school: string
  major: string
}

defineProps<Props>()
</script>

<template>
  <Card animation-type="scale">
    <template #default>
      <div class="education-degree">{{ degree }}</div>
      <div class="education-school">{{ school }}</div>
      <div class="education-major">{{ major }}</div>
    </template>
  </Card>
</template>

<style scoped>
.education-degree {
  font-size: 16px;
  font-weight: 600;
  color: var(--brand);
  margin-bottom: 8px;
}

.education-school {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.education-major {
  font-size: 14px;
  color: var(--text-muted);
}
</style>

