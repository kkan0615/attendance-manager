<template>
  <q-page
    padding
  >
    <c-layout-menubar
      title="Post"
      :breadcrumbs="breadcrumbs"
    />
    <div
      class="tw-max-w-4xl tw-mx-auto tw-space-y-4"
    >
      <q-form
        class="tw-space-y-4"
        @submit="onSubmitForm"
      >
        <!-- Title -->
        <q-input
          v-model="title"
          dense
          label="Name"
          outlined
          :rules="rules.title"
          hide-bottom-space
        >
          <template
            #label
          >
            <div
              class="c-required-label c-text-first-uppercase"
            >
              {{ $t('Types.Models.BusiPost.title') }}
            </div>
          </template>
        </q-input>
        <!-- Is it notification post -->
        <q-checkbox
          v-model="isNotification"
          :label="$t('Types.Models.BusiPost.Labels.isNotification')"
          dense
        />
        <!-- Content -->
        <div>
          {{ $t('Types.Models.BusiPost.content') }}
        </div>
        <q-editor
          v-model="content"
          min-height="15rem"
          content-class="c-form-editor-content"
          :toolbar="[
            ['left','center','right','justify'],
            ['bold', 'italic', 'underline'],
            [{
              label: $q.lang.editor.formatting,
              icon: $q.iconSet.editor.formatting,
              list: 'no-icons',
              options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
            }]
          ]"
        />
        <!-- Attachments -->
        <q-file
          v-model="attachments"
          outlined
          dense
          multiple
          label="Attachments"
          use-chips
        />
        <div
          class="tw-grid tw-grid-cols-5 tw-gap-4 q-pb-lg"
        >
          <c-file-preview
            v-for="(attachment, i) in attachments"
            :key="`attachment-${i}`"
            enable-download
            :file="attachment"
          />
        </div>
        <!-- Is it notification post -->
        <q-checkbox
          v-model="isDisplayHome"
          :label="$t('Types.Models.BusiPost.Labels.isDisplayHome')"
          dense
        />
        <div
          v-if="isDisplayHome"
          class="tw-flex"
        >
          <q-checkbox
            v-model="isForever"
            class="tw-grow tw-mr-4"
            :label="$t('Types.Models.BusiPost.Labels.isForever')"
            dense
          />
          <!-- Notification date-->
          <q-field
            v-if="!isForever"
            v-model="notificationDate"
            class="tw-grow tw-w-full"
            :label="$t('Types.Models.BusiPost.Labels.howLongDisplay')"
            dense
            outlined
          >
            <date-picker
              v-model="notificationDate"
              class="tw-w-full tw-my-0.5"
              text-input
              input-class-name="dp__input--with-label"
              :enable-time-picker="false"
              auto-apply
              :clearable="false"
            />
          </q-field>
        </div>
        <div
          class="text-right tw-space-x-2"
        >
          <q-btn
            color="primary"
            type="submit"
            :label="$t('Commons.Buttons.save')"
          />
          <q-btn
            color="primary"
            outline
            :label="$t('Commons.Buttons.cancel')"
            @click="onClickCancelBtn"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAppNotificationMain',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { QBreadcrumbsElProps, useQuasar } from 'quasar'
import { useBusiPostStore } from '@/store/busiPost'
import { useRoute, useRouter } from 'vue-router'
import CLayoutMenubar from '@/components/commons/layouts/Menubar/index.vue'
import { useCurrentStore } from '@/store/current'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import CFilePreview from '@/components/commons/FilePreview/index.vue'

const router = useRouter()
const route = useRoute()
const i18n = useI18n()
const $q = useQuasar()
const currentStore = useCurrentStore()
const busiPostStore = useBusiPostStore()

const breadcrumbs = ref<QBreadcrumbsElProps[]>([
  {
    label: 'App',
  },
  {
    label: 'Post',
  },
  {
    label: 'Form'
  }
])
const title = ref('')
const content = ref('')
const isNotification = ref(false)
const isDisplayHome = ref(false)
const isForever = ref(true)
const notificationDate = ref<Date>(dayjs().toDate()) // Only use when isDisplayHome variable is true
const attachments = ref<Array<File>>([])
const rules = ref({
  title: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'Title' }),
    (val: string) => val.length <= 50 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 50 })
  ],
})

const isEditMode = computed(() => route.name === 'BusiAppPostUpdateForm')

const initData = async () => {
  try {
    // Edit mode
    if (isEditMode.value) {
      const { id } = route.params
      await busiPostStore.loadBusiPost(Number(id))
      if (
        busiPostStore.BusiPost.busiUserId !== currentStore.CurrentBusiUser.id
          && currentStore.CurrentBusiUser.auth !== 'superAdmin'
          && currentStore.CurrentBusiUser.auth !== 'admin'
      ) {
        showSnackbar({
          message: i18n.t('Commons.Messages.unAuthUser'),
          color: 'negative'
        })
        throw new Error('No autherizaition')
      }

      title.value = busiPostStore.BusiPost.title
      content.value = busiPostStore.BusiPost.content
      isNotification.value = busiPostStore.BusiPost.isNotification
      isDisplayHome.value = busiPostStore.BusiPost.isDisplayHome
      /* If there is notification date data */
      if (busiPostStore.BusiPost.notificationDate) {
        isForever.value = false
        notificationDate.value = dayjs(busiPostStore.BusiPost.notificationDate).toDate()
      } else {
        isForever.value = true
        notificationDate.value = dayjs().toDate()
      }
      attachments.value = busiPostStore.BusiPost.attachments.map(attachment => attachment.file)
    }
  } catch (e) {
    console.error(e)
  }
}

const onSubmitForm = async () => {
  try {
    let id = busiPostStore.BusiPost.id
    if (isEditMode.value) {
      await busiPostStore.updateBusiPost({
        id: busiPostStore.BusiPost.id,
        busiId: currentStore.CurrentBusiness.id,
        busiUserId: currentStore.CurrentBusiUser.id,
        title: title.value,
        content: content.value,
        isNotification: isNotification.value,
        isDisplayHome: isDisplayHome.value,
        notificationDate: isDisplayHome.value && !isForever.value ? dayjs(notificationDate.value).toISOString() : undefined,
      })
    } else {
      id = await busiPostStore.createBusiPost({
        busiId: currentStore.CurrentBusiness.id,
        busiUserId: currentStore.CurrentBusiUser.id,
        title: title.value,
        content: content.value,
        isNotification: isNotification.value,
        isDisplayHome: isDisplayHome.value,
        notificationDate: isDisplayHome.value && !isForever.value ? dayjs(notificationDate.value).toISOString() : undefined,
      })
    }
    /* Remove attachments first */
    if (isEditMode.value && busiPostStore.BusiPost.attachments && busiPostStore.BusiPost.attachments.length) {
      for (let i = 0; i < busiPostStore.BusiPost.attachments.length; i++) {
        await busiPostStore.deleteUploadedBusiPostAttachment(busiPostStore.BusiPost.attachments[i].id)
      }
    }

    /* Save attachment */
    if (attachments.value && attachments.value.length) {
      for (let i = 0; i < attachments.value.length; i++) {
        await busiPostStore.uploadBusiPostAttachment({
          busiPostId: id,
          file: attachments.value[i],
        })
      }
    }

    showSnackbar({
      message: i18n.t('Commons.Messages.saved'),
      color: 'positive'
    })

    await router.push({ name: 'BusiAppPostDetail', params: { id, } })
  } catch (e) {
    console.error(e)
    showSnackbar({
      message: i18n.t('Commons.Messages.saveFailed'),
      color: 'negative'
    })
  }
}

const onClickCancelBtn = () => {
  $q.dialog({
    title: i18n.t('Commons.Titles.cancel'),
    message: i18n.t('Commons.Messages.cancelSave'),
    cancel: true,
  }).onOk(() => {
    router.back()
  })
}

initData()

onBeforeUnmount(() => {
  busiPostStore.resetBusiPost()
})
</script>
