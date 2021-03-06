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
        style="min-height: 52px;"
      >
        <work-timer
          v-if="user.lastWorkHistory && user.lastWorkHistory.startedAt"
          :start-time="user.lastWorkHistory.startedAt"
        />
      </div>
      <!-- Name -->
      <div
        class="c-display-row-end"
      >
        <div
          class="c-display-row-end--label c-text-first-uppercase"
        >
          {{ $t('Types.Models.BusiUsers.name') }}
        </div>
        <div
          class="c-display-row-end--content c-text-first-uppercase"
        >
          {{ user.name }}
        </div>
      </div>
      <!-- Email -->
      <div
        class="c-display-row-end"
      >
        <div
          class="c-display-row-end--label c-text-first-uppercase"
        >
          {{ $t('Types.Models.BusiUsers.email') }}
        </div>
        <div
          class="c-display-row-end--content c-text-first-uppercase"
        >
          {{ user.email }}
        </div>
      </div>
      <!-- Auth -->
      <div
        class="c-display-row-end"
      >
        <div
          class="c-display-row-end--label c-text-first-uppercase"
        >
          {{ $t('Types.Models.BusiUsers.auth') }}
        </div>
        <div
          class="c-display-row-end--content c-text-first-uppercase"
        >
          {{ $t(`Types.Models.BusiUsers.UserAuths.${user.auth}`) }}
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
import { PropType } from 'vue'
import { BusiUserAdminListInfo } from '@/types/models/users/business'
import { useQuasar } from 'quasar'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useBusiUserStore } from '@/store/busiUser'
import { useCurrentStore } from '@/store/current'
import WorkTimer from '@/components/WorkTimer.vue'
import BusiUserStatusBadge from '@/components/BusiUserStatusBadge.vue'
import { toCapitalize } from '@/utils/commons/stringUtil'

const router = useRouter()
const $q = useQuasar()
const i18n = useI18n()
const currentStore = useCurrentStore()
const busiUserStore = useBusiUserStore()

const props = defineProps({
  user: {
    type: Object as PropType<BusiUserAdminListInfo>,
    required: true,
    default: () => {},
  }
})

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
  }).onOk(async () => {
    try {
      if (!props.user) {
        throw new Error('no user')
      }
      await busiUserStore.updateBusiUser({
        ...props.user,
        startWorkAt: null,
        status: 'off'
      })
      await busiUserStore.loadBusiUserAdminList({
        busiId: currentStore.CurrentBusiness.id,
      })
      showSnackbar({
        message: i18n.t('Commons.Messages.saved'),
        color: 'positive'
      })
    } catch (e) {
      console.error(e)
      showSnackbar({
        message: i18n.t('Commons.Messages.saveFailed'),
        color: 'negative'
      })
    }
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

const onClickDeleteBtn = async () => {
  if (props.user) {
    $q.dialog({
      title: `${toCapitalize(i18n.t('Commons.Titles.delete'))}`,
      message: `${i18n.t('Commons.Messages.Questions.delete')}`,
      cancel: true,
    }).onOk(async () => {
      if (props.user) {
        try {
          /* delete busi user by id */
          await busiUserStore.deleteBusiUser(props.user.id)
          /* Reload */
          await busiUserStore.loadBusiUserAdminList({
            busiId: currentStore.CurrentBusiness.id,
          })
          showSnackbar({
            message: i18n.t('Commons.Messages.saved'),
            color: 'positive'
          })
        } catch (e) {
          console.error(e)
          showSnackbar({
            message: i18n.t('Commons.Messages.saveFailed'),
            color: 'negative'
          })
        }
      }
    })
  }
}

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
