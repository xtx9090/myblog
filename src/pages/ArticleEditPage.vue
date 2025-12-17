<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getArticleById } from '@/data/articles'
import { useArticleEditor } from '@/composables/useArticleEditor'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const isEditMode = computed(() => !!route.params.id)
const articleId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})

const { form, isSubmitting, loadArticle, handleSubmitAndRedirect, resetForm } = useArticleEditor()

const categories = computed(() => [
  { key: 'dit', label: t('categories.dit') },
  { key: 'luna', label: t('categories.luna') },
  { key: 'note', label: t('categories.note') },
  { key: 'art', label: t('categories.art') },
  { key: 'travel', label: t('categories.travel') }
])

const coverPresets = [
  'linear-gradient(135deg, #0a0f26 0%, #0c1a4d 35%, #032c5f 65%, #0c1a4d 100%)',
  'linear-gradient(135deg, #0d121f 0%, #132642 50%, #243c5a 100%)',
  'linear-gradient(135deg, #101820 0%, #1f1f2f 50%, #2c2c3b 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
]

onMounted(() => {
  if (isEditMode.value && articleId.value) {
    const article = getArticleById(articleId.value)
    if (article) {
      loadArticle(article)
    } else {
      router.push({ name: 'articles' })
    }
  } else {
    resetForm()
  }
})

const handleCancel = () => {
  if (isEditMode.value && articleId.value) {
    router.push({ name: 'articleDetail', params: { id: articleId.value } })
  } else {
    router.push({ name: 'articles' })
  }
}
</script>

<template>
  <main class="layout edit-layout">
    <section class="hero">
      <h1>{{ isEditMode ? t('article.editTitle') : t('article.createTitle') }}</h1>
      <p>{{ isEditMode ? t('article.editDesc') : t('article.createDesc') }}</p>
    </section>

    <section class="edit-content">
      <form class="article-form" @submit.prevent="handleSubmitAndRedirect">
        <div class="form-section">
          <label class="form-label">
            {{ t('article.title') }}
            <input v-model="form.title" type="text" :placeholder="t('article.titlePlaceholder')" />
          </label>
        </div>

        <div class="form-section">
          <label class="form-label">
            {{ t('article.description') }}
            <textarea
              v-model="form.description"
              rows="3"
              :placeholder="t('article.descriptionPlaceholder')"
            ></textarea>
          </label>
        </div>

        <div class="form-row">
          <div class="form-section">
            <label class="form-label">
              {{ t('article.category') }}
              <select v-model="form.categoryKey">
                <option v-for="cat in categories" :key="cat.key" :value="cat.key">
                  {{ cat.label }}
                </option>
              </select>
            </label>
          </div>

          <div class="form-section">
            <label class="form-label">
              {{ t('article.tag') }}
              <input v-model="form.tag" type="text" :placeholder="t('article.tagPlaceholder')" />
            </label>
          </div>
        </div>

        <div class="form-row">
          <div class="form-section">
            <label class="form-label">
              {{ t('article.date') }}
              <input v-model="form.date" type="date" />
            </label>
          </div>

          <div class="form-section">
            <label class="form-label">
              {{ t('article.platform') }}
              <input v-model="form.platform" type="text" :placeholder="t('article.platformPlaceholder')" />
            </label>
          </div>
        </div>

        <div class="form-row">
          <div class="form-section">
            <label class="form-label">
              {{ t('article.badge') }}
              <input v-model="form.badge" type="text" :placeholder="t('article.badgePlaceholder')" />
            </label>
          </div>

          <div class="form-section">
            <label class="form-label">
              {{ t('article.cover') }}
              <input v-model="form.cover" type="text" :placeholder="t('article.coverPlaceholder')" />
            </label>
          </div>
        </div>

        <div class="form-section">
          <label class="form-label">
            {{ t('article.coverPresets') }}
            <div class="cover-presets">
              <button
                v-for="(preset, index) in coverPresets"
                :key="index"
                type="button"
                class="cover-preset"
                :style="{ background: preset }"
                @click="form.cover = preset"
              ></button>
            </div>
          </label>
        </div>

        <div class="form-section">
          <label class="form-label">
            {{ t('article.content') }}
            <textarea
              v-model="form.content"
              rows="20"
              :placeholder="t('article.contentPlaceholder')"
              class="content-textarea"
            ></textarea>
          </label>
          <p class="form-hint">{{ t('article.contentHint') }}</p>
        </div>

        <div class="form-actions">
          <button type="button" class="cancel-btn" @click="handleCancel">
            {{ t('article.cancel') }}
          </button>
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? t('article.saving') : isEditMode ? t('article.update') : t('article.publish') }}
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<style scoped>
.edit-layout {
  background: var(--bg);
  color: var(--text-primary);
}

.edit-layout .hero {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

.edit-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
}

.article-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
  color: var(--text-primary);
}

.form-label input,
.form-label textarea,
.form-label select {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-primary);
  font-size: 16px;
  font-family: inherit;
  transition: border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.form-label input:focus,
.form-label textarea:focus,
.form-label select:focus {
  outline: none;
  border-color: var(--brand);
}

.form-label textarea {
  resize: vertical;
}

.content-textarea {
  font-family: ui-monospace, 'Courier New', monospace;
  line-height: 1.6;
}

.form-hint {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--text-subtle);
}

.cover-presets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 8px;
}

.cover-preset {
  width: 100%;
  height: 60px;
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cover-preset:hover {
  border-color: var(--brand);
  transform: scale(1.05);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.cancel-btn {
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  border-color: var(--text-muted);
  background: var(--surface-2);
}

.submit-btn {
  padding: 10px 24px;
  border-radius: 10px;
  border: none;
  background: var(--brand);
  color: var(--bg);
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* 大屏设备 (1400px 及以上) */
@media (min-width: 1400px) {
  .edit-layout .hero {
    max-width: 1400px;
    padding: 0 32px;
  }

  .edit-content {
    max-width: 1400px;
    padding: 0 32px;
  }
}

/* 平板设备 (1024px 及以下) */
@media (max-width: 1024px) {
  .edit-layout .hero {
    max-width: 100%;
    padding: 0 20px;
  }

  .edit-content {
    max-width: 100%;
    padding: 0 20px;
  }
}

/* 平板设备 (768px 及以下) */
@media (max-width: 768px) {
  .edit-layout .hero {
    padding: 0 16px;
  }

  .edit-content {
    padding: 0 16px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .cover-presets {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 小屏手机 (640px 及以下) */
@media (max-width: 640px) {
  .edit-layout .hero {
    padding: 0 12px;
  }

  .edit-content {
    padding: 0 12px;
  }

  .cover-presets {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
}

/* 超小屏手机 (480px 及以下) */
@media (max-width: 480px) {
  .edit-layout .hero {
    padding: 0 10px;
  }

  .edit-content {
    padding: 0 10px;
  }

  .cover-presets {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-btn,
  .submit-btn {
    width: 100%;
  }
}
</style>

