<template>
  <q-card>
    <div
      class="image-container q-mt-md cursor-pointer"
      @click="onClickCardSection"
    >
      <q-avatar
        color="secondary"
        :class="{
          'tw-ring-4': user.status,
          'tw-ring-status-work': user.status === 'work',
          'tw-ring-status-rest': user.status === 'rest',
          'tw-ring-status-off': user.status === 'off',
        }"
        size="120px"
      >
        <q-img
          v-if="user.img"
          class="profile-image"
          fit="cover"
          :src="user.img"
        />
        <span
          v-else
        >
          {{ user.name[0] }}
        </span>
      </q-avatar>
      <busi-user-status-badge
        class="status-badge"
        :status="user.status"
      />
    </div>
    <q-card-section>
      <div
        class="text-center q-mb-sm"
        style="min-height: 32px;"
      >
        <work-timer
          v-if="user.startWorkAt"
          :start-time="user.startWorkAt"
        />
      </div>
      <div
        class="tw-flex"
      >
        <div>
          Name
        </div>
        <div
          class="tw-ml-auto"
        >
          {{ user.name }}
        </div>
      </div>
      <div
        class="tw-flex"
      >
        <div>
          Position
        </div>
        <div
          class="tw-ml-auto"
        >
          {{ user.auth }}
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions>
      <div>
        <q-btn
          v-if="user.status !== 'off'"
          color="negative"
          flat
          round
          icon="work_off"
          @click="onClickWorkOffBtn"
        >
          <q-tooltip>
            Get off the work by force
          </q-tooltip>
        </q-btn>
      </div>
      <div
        class="tw-ml-auto"
      >
        <q-btn
          flat
          round
          color="primary"
          icon="edit"
          @click="onClickEditBtn"
        >
          <q-tooltip>
            Edit
          </q-tooltip>
        </q-btn>
        <q-btn
          color="negative"
          flat
          round
          icon="person_off"
          @click="onClickDeleteBtn"
        >
          <q-tooltip>
            Kick the person
          </q-tooltip>
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserListUserCard',
}
</script>
<script setup lang="ts">
import { computed, onBeforeUnmount, PropType, ref } from 'vue'
import { BusiUserAdminListInfo } from '@/types/models/users/business'
import dayjs from 'dayjs'
import { useQuasar } from 'quasar'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import WorkTimer from '@/components/WorkTimer.vue'
import BusiUserStatusBadge from '@/components/commons/BusiUserStatusBadge.vue'

const router = useRouter()
const $q = useQuasar()
const i18n = useI18n()

const props = defineProps({
  user: {
    type: Object as PropType<BusiUserAdminListInfo>,
    required: true,
    default: () => {},
  }
})

const timerSeconds = ref(0)
const timer = ref<NodeJS.Timer | undefined>(undefined)

const hours = computed(() => parseInt((timerSeconds.value / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((timerSeconds.value / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((timerSeconds.value % 60).toString()).toString().padStart(2, '0'))

const initData = () => {
  if (props.user && props.user.startWorkAt) {
    timerSeconds.value = dayjs().diff(dayjs(props.user.startWorkAt), 'seconds')
    initTimer()
  }
}

const initTimer = () => {
  timer.value = setInterval(() => {
    timerSeconds.value += 1
  }, 1000)
}

const clearTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = undefined
  }
}

const onClickCardSection = () => {
  if (props.user) {
    router.push({
      name: 'BusiAdminUserDetail',
      params: { id: props.user.id }
    })
  }
}

const onClickWorkOffBtn = () => {
  $q.dialog({
    title: `Get off the work of ${props.user?.name}`,
    message: `Would you get off ${props.user?.name}`,
    cancel: true,
  }).onOk(() => {
    console.log('>>>> OK')
    showSnackbar({
      message: i18n.t('Commons.Messages.saved'),
      color: 'positive'
    })
  }).onCancel(() => {
    console.log('>>>> Cancel')
  })
}

const onClickEditBtn = () => {
  if (props.user) {
    router.push({
      name: 'BusiAdminUserUpdateForm',
      params: { id: props.user.id }
    })
  }
}

const onClickDeleteBtn = () => {
// @TODO: Add logic
}

initData()

onBeforeUnmount(() => {
  clearTimer()
})

</script>
<style
  lang="scss"
  scoped
>
.image-container {
  @apply tw-text-center tw-relative;

  .status-badge {
    @apply tw-absolute tw-bottom-0;
    left: 60%;
  }
}
</style>
