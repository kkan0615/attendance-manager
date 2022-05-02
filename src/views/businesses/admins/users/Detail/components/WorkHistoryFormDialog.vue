<template>
  <q-btn
    size="sm"
    flat
    dense
    round
    padding="0"
    color="primary"
    icon="edit"
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
      <q-form>
        <q-card-section>
          <!-- Work option select -->
          <q-select
            v-model="workOption"
            class="tw-mb-2"
            dense
            outlined
            label="work option"
            :options="options"
            emit-value
            map-options
            :option-disable="workOptionDisable"
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

const i18n = useI18n()
const currentStore = useCurrentStore()

const props = defineProps({
  workHistory: {
    type: Object as PropType<TempBusiUserWorkHistoryListInfo>,
    required: true,
    default: () => {},
  }
})

const { currentBusiness } = storeToRefs(currentStore)
const isOpen = ref(false)
const rangeDate = ref<Date[]>([])
const workOption = ref<BusiUserWorkOption | undefined>('simple')
const options = ref(busiUserWorkOptionSelectOption)

const onClickOpenBtn = () => {
  if (props.workHistory) {
    rangeDate.value = [dayjs(props.workHistory.startedAt).toDate(), dayjs(props.workHistory.endedAt).toDate()]
    workOption.value = props.workHistory.workOption
  } else {
    rangeDate.value = [dayjs().startOf('day').toDate(), dayjs().toDate()]
    if (currentBusiness.value.busiConfig.isEnableSimple) {
      workOption.value = 'simple'
    } else if (currentBusiness.value.busiConfig.isEnableQrcode) {
      workOption.value = 'qrCode'
    } else if (currentBusiness.value.busiConfig.isEnableLocation) {
      workOption.value = 'location'
    } else {
      workOption.value = undefined
    }
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
  //
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
