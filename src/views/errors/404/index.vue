<template>
  <div
    class="tw-h-screen tw-bg-q-primary"
  >
    <div
      class="tw-h-full tw-flex tw-items-center tw-justify-center"
    >
      <q-card
        class="tw-w-full tw-max-w-7xl"
        style="height: 80%;"
      >
        <q-card-section
          class="sm:tw-flex tw-h-full tw-items-center"
        >
          <div
            class="tw-w-full sm:tw-max-w-2xl sm:tw-h-full tw-h-72"
          >
            <q-img
              class="tw-w-full tw-h-full"
              fit="contain"
              src="@/assets/errors/404.png"
            />
          </div>
          <div
            class="tw-grow"
          >
            <div
              class="header-404 tw-text-q-primary tw-text-center"
            >
              404
            </div>
            <div
              class="tw-text-2xl"
            >
              We are sorry, but the page you were looking for doesn't exist
            </div>
            <div
              class="tw-mt-28 tw-grid tw-grid-cols-2 tw-gap-4"
            >
              <q-btn
                :to="{ name: 'HomeIndex' }"
                color="primary"
                label="go to home"
              />
              <q-btn
                color="negative"
                outline
                label="back"
                @click="onClickBackBtn"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ErrorNotFound404',
}
</script>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onClickBackBtn = () => {
  router.back()
}

</script>
<style
  scoped
  lang="scss"
>
.header-404 {
  font-size: 200px;
  line-height: 200px;
}
</style>
