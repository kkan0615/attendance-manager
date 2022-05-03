<template>
  <q-btn
    size="sm"
    flat
    dense
    round
    padding="0"
    color="primary"
    :icon="isUpdate ? 'edit' : 'add'"
    @click="onClickOpenBtn"
  />
  <q-dialog
    v-model="isOpen"
  >
    <q-card
      style="width: 500px;"
    >
      <q-card-section class="row items-center q-py-sm">
        <div class="text-h6">
          Tittle
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>
      <q-separator />
      <q-form
        @submit="onSubmitForm"
      >
        <q-card-section
          class="tw-space-y-4"
        >
          <!-- Work option select -->
          <q-select
            v-model="workOption"
            hide-bottom-space
            class="tw-mb-2"
            dense
            outlined
            label="work option"
            :options="options"
            emit-value
            map-options
            :option-disable="workOptionDisable"
            :rules="rules.workOption"
          >
            <template
              #label
            >
              <div
                class="c-required-label c-text-first-uppercase"
              >
                work option
              </div>
            </template>
          </q-select>
          <q-field
            v-model="rangeDate"
            label="Range"
            dense
            outlined
            hide-bottom-space
            :rules="rules.rangeDate"
          >
            <date-picker
              v-model="rangeDate"
              range
              class="tw-w-full tw-my-1"
              text-input
              input-class-name="dp__input--with-label"
              week-start="0"
              :clearable="false"
            />
            <template
              #label
            >
              <div
                class="c-required-label c-text-first-uppercase"
              >
                range
              </div>
            </template>
          </q-field>
          <!-- Description -->
          <q-input
            v-model="description"
            label="Description"
            type="textarea"
            dense
            outlined
            :rules="rules.description"
            hide-bottom-space
          />
        </q-card-section>
        <q-separator />
        <q-card-section
          class="text-right"
        >
          <q-btn
            color="primary"
            type="submit"
            :label="$t('Commons.Buttons.save')"
          />
        </q-card-section>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminUserDetailWorkHistoryFormDialog',
}
</script>
<script setup lang="ts">
import { nextTick, PropType, ref } from 'vue'
import { TempBusiUserWorkHistoryListInfo } from '@/types/models/users/busiWorkHistory'
import dayjs from 'dayjs'
import { BusiUserWorkOption, busiUserWorkOptionSelectOption } from '@/types/models/users/business'
import { storeToRefs } from 'pinia'
import { useCurrentStore } from '@/store/current'
import { useI18n } from 'vue-i18n'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useBusiUserWorkHistoryStore } from '@/store/busiUserWorkHistory'
import { useBusiUserStore } from '@/store/busiUser'

const i18n = useI18n()
const currentStore = useCurrentStore()
const busiUserStore = useBusiUserStore()
const busiUserWorkHistoryStore = useBusiUserWorkHistoryStore()

const props = defineProps({
  workHistory: {
    type: Object as PropType<TempBusiUserWorkHistoryListInfo>,
    required: false,
    default: () => {},
  },
  isUpdate: {
    type: Boolean,
    required: false,
    default: false,
  }
})

const { currentUser, currentBusiness, currentBusiUser } = storeToRefs(currentStore)
const { busiUserAdmin } = storeToRefs(busiUserStore)
const { busiUserWorkHistoryListFilter } = storeToRefs(busiUserWorkHistoryStore)
const isOpen = ref(false)
const rangeDate = ref<Date[]>([])
const workOption = ref<BusiUserWorkOption | undefined>(undefined)
const options = ref(busiUserWorkOptionSelectOption)
const description = ref('')
const rules = ref({
  rangeDate: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'work option' }),
    (val: Date[]) => {
      console.log(val)
      if (val.length !== 2 || !val[0] || !val[1]) {
        return i18n.t('Commons.Messages.Validations.required', { field:'work option' })
      } else {
        return true
      }
    }
  ],
  workOption: [
    (val: string) => !!val || i18n.t('Commons.Messages.Validations.required', { field:'work option' }),
  ],
  description: [
    (val: string) => val.length <= 200 || i18n.t('Commons.Messages.Validations.lengthMax', { length: 200 })
  ],
})

const onClickOpenBtn = () => {
  if (props.workHistory && props.isUpdate) {
    rangeDate.value = [dayjs(props.workHistory.startedAt).toDate(), dayjs(props.workHistory.endedAt).toDate()]
    workOption.value = props.workHistory.workOption
  } else {
    rangeDate.value = [dayjs().startOf('day').toDate(), dayjs().toDate()]
    // if (currentBusiness.value.busiConfig.isEnableSimple) {
    //   workOption.value = 'simple'
    // } else if (currentBusiness.value.busiConfig.isEnableQrcode) {
    //   workOption.value = 'qrCode'
    // } else if (currentBusiness.value.busiConfig.isEnableLocation) {
    //   workOption.value = 'location'
    // } else {
    //   workOption.value = undefined
    // }
    workOption.value = undefined
  }

  nextTick(() => {
    isOpen.value = true
  })
}

/**
 * Make work select option disable or able
 * @param opt - work option
 */
const workOptionDisable = (opt: { label: string; value: BusiUserWorkOption }) => {
  if (currentBusiness.value.busiConfig.isEnableSimple && opt.value === 'simple') {
    return false
  } else if (currentBusiness.value.busiConfig.isEnableQrcode && opt.value === 'qrCode') {
    return false
  } else if (currentBusiness.value.busiConfig.isEnableLocation && opt.value === 'location') {
    return false
  } else {
    return true
  }
}

const onSubmitForm = async () => {
  try {
    if (props.isUpdate && !props.workHistory) {
      throw new Error('no props')
    }

    if (props.isUpdate) {
      await busiUserWorkHistoryStore.updateBusiUserWorkHistory({
        id: props.workHistory.id,
        busiId: currentBusiness.value.id,
        userId: currentUser.value.id,
        busiUserId: currentBusiUser.value.id,
        startedAt: dayjs(rangeDate.value[0]).toISOString(),
        endedAt: dayjs(rangeDate.value[1]).toISOString(),
        workOption: workOption.value || 'simple',
      //
      })
    } else {
      await busiUserWorkHistoryStore.createBusiUserWorkHistory({
        busiId: currentBusiness.value.id,
        userId: currentUser.value.id,
        busiUserId: currentBusiUser.value.id,
        startedAt: dayjs(rangeDate.value[0]).toISOString(),
        endedAt: dayjs(rangeDate.value[1]).toISOString(),
        workOption: workOption.value || 'simple',
      })
    }
    /* Reload work history */
    await busiUserWorkHistoryStore.loadBusiUserWorkHistoryList({
      busiUserId: busiUserAdmin.value.id,
      rangeStartAt: busiUserWorkHistoryListFilter.value.rangeStartAt,
      rangeEndAt: busiUserWorkHistoryListFilter.value.rangeEndAt,
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
</script>
