import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/store/main'
import { darkModeKey, styleKey } from '@/config.js'

import './css/main.css'

/* Init Pinia */
const pinia = createPinia()

/* Create Vue app */
createApp(App).use(router).use(pinia).mount('#app')

/* Init Pinia main store */
const mainStore = useMainStore(pinia)

/* Fetch sample data */
// mainStore.fetch('comic')
// mainStore.fetch('author')
// mainStore.fetch('genre')
// mainStore.fetch('tag')
// mainStore.fetch('comment')
// mainStore.fetch('history')
// mainStore.fetch('user')

/* App style */
mainStore.setStyle(localStorage[styleKey] ?? 'basic')

/* Dark mode */
if ((!localStorage[darkModeKey] && window.matchMedia('(prefers-color-scheme: dark)').matches) || localStorage[darkModeKey] === '1') {
  mainStore.setDarkMode(true)
}

/* Default title tag */
const defaultDocumentTitle = 'Webcomic Admin'

/* Collapse mobile aside menu on route change */
router.beforeEach(to => {
  mainStore.asideMobileToggle(false)
  mainStore.asideLgToggle(false)
})

router.afterEach(to => {
  /* Set document title from route meta */
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }

  /* Full screen mode */
  mainStore.fullScreenToggle(!!to.meta.fullScreen)
})
