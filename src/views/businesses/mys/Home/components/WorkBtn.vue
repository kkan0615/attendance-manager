<template>
  <div
    class="tw-w-full"
  >
    <!-- timer -->
    <div
      v-if="currentBusiUser.lastWorkHistory"
      class="tw-text-center tw-mb-2"
    >
      <work-timer
        :start-time="currentBusiUser.lastWorkHistory.startedAt"
      />
    </div>
    <!-- Work option select -->
    <q-select
      v-if="!currentStore.CurrentBusiUser.startWorkAt"
      v-model="workOption"
      class="tw-mb-2"
      dense
      outlined
      rounded
      :options="options"
      emit-value
      map-options
    />
    <!-- On the job button -->
    <q-btn
      v-if="!currentStore.CurrentBusiUser.startWorkAt"
      color="primary"
      rounded
      icon="login"
      label="Go to Work"
      class="tw-w-full"
      @click="onCLickWorkBtn"
    />
    <q-btn
      v-else
      color="negative"
      rounded
      icon="logout"
      label="Get off the work"
      class="tw-w-full"
      @click="onCLickGetOffBtn"
    />
    <!--  QR code dialog  -->
    <q-dialog
      v-model="isQrCodeDialogOpen"
      @before-hide="onBeforeHideQRCodeDialog"
    >
      <q-card>
        <q-card-section class="row items-center q-py-sm">
          <div class="text-h6">
            Qrcode
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
        <q-card-section>
          <div
            class="tw-w-full tw-flex tw-justify-center"
          >
            <div
              id="qrcode-canvas"
            />
            <!-- @TODO: Add over 15 seconds announce -->
          </div>
          <div
            class="text-subtitle2 text-center"
          >
            Scan the QRCode in 15 seconds
          </div>
          <!-- Progress timer -->
          <q-linear-progress
            class="tw-mt-2"
            stripe
            size="20px"
            :max="15"
            :value="(qrCodeTimerSeconds) * 0.075"
          >
            <div class="absolute-full flex flex-center">
              <div
                class="text-white tw-text-sm"
              >
                {{ qrCodeTimerSeconds }}
              </div>
            </div>
          </q-linear-progress>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
export default {
  name: 'BusinessHomeWorkBtn',
}
</script>
<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'
import QRCodeStyling from 'qr-code-styling'
import { calculateTwoCoord } from '@/utils/commons/coordinate'
import { showSnackbar } from '@/utils/libs/quasar/notify'
import { useI18n } from 'vue-i18n'
import { useBusiUserStore } from '@/store/busiUser'
import { BusiUserWorkOption, busiUserWorkOptionSelectOption } from '@/types/models/users/business'
import WorkTimer from '@/components/WorkTimer.vue'
import { storeToRefs } from 'pinia'

const DEFAULT_QRCODE_TIMER_MAX_SECONDS = 15

const i18n = useI18n()
const currentStore = useCurrentStore()
const busiUserStore = useBusiUserStore()

const { currentBusiUser } = storeToRefs(currentStore)
const workOption = ref<BusiUserWorkOption>('simple')
const options = ref(busiUserWorkOptionSelectOption)
const isQrCodeDialogOpen = ref(false)
const qrCodeTimerSeconds = ref(0)
const qrCodeTimer = ref<NodeJS.Timer | undefined>(undefined)

const initQRCodeTimer = () => {
  qrCodeTimer.value = setInterval(() => {
    qrCodeTimerSeconds.value -= 1
    if (qrCodeTimerSeconds.value <= 0) {
      clearQRCodeTimer()
    }
  }, 1000)
}

const clearQRCodeTimer = () => {
  if (qrCodeTimer.value) {
    clearInterval(qrCodeTimer.value)
    qrCodeTimer.value = undefined
  }
}
/**
 * On Click go to work button
 */
const onCLickWorkBtn = async () => {
  if (workOption.value === 'qrCode') {
    // QR code
    isQrCodeDialogOpen.value = true
    await nextTick(() => {
      const qrcodeCanvas = document.getElementById('qrcode-canvas')
      if (qrcodeCanvas) {
        const qrCode = new QRCodeStyling({
          width: 250,
          height: 250,
          type: 'svg',
          data: JSON.stringify({
            userId: currentStore.CurrentBusiUser.userId,
            busiId: currentStore.CurrentBusiUser.busiId,
            readerTime: dayjs().toISOString(),
          }),
          // image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
          dotsOptions: {
            type: 'rounded'
          },
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: 20
          }
        })
        qrCode.append(qrcodeCanvas)
        qrCodeTimerSeconds.value = DEFAULT_QRCODE_TIMER_MAX_SECONDS
        initQRCodeTimer()
      } else {
        isQrCodeDialogOpen.value = false
        showSnackbar({
          message: i18n.t('Commons.Messages.error'),
          color: 'negative'
        })
      }
    })
  } else if (workOption.value === 'simple') {
    // Simple
    try {
      const { latitude, longitude } = await getCurrentPosition()

      await busiUserStore.startWork({
        ...currentStore.CurrentBusiUser,
        latitude: latitude,
        longitude: longitude,
      })
      /* Reload current busi user */
      await currentStore.loadCurrentBusiUser({
        userId: currentStore.CurrentBusiUser.userId,
        busiId: currentStore.CurrentBusiUser.busiId
      })
      /* Reload work history */
      await currentStore.loadCurrentBusiUserWorkHistoryList()
      /* Load total work seconds */
      await currentStore.loadCurrentBusiUserTotalWorkSeconds()
    } catch (e) {
      console.error(e)
      showSnackbar({
        message: i18n.t('Commons.Messages.startWorkFailed'),
        color: 'negative'
      })
    }
  } else if (workOption.value === 'location') {
    // Location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        /* Check that location is in the allowed location */
        // @TODO: test : lang and long is, 0.01 is 10 meter
        // 37.6015565, 126.7280587
        if (currentStore.CurrentBusiness.allowedLocations
          .some(allowedLocation => calculateTwoCoord(allowedLocation.lat, allowedLocation.lon, position.coords.latitude, position.coords.longitude)
              <= allowedLocation.meter * 0.001)) {
          try {
            await busiUserStore.startWorkByLocation({
              ...currentStore.CurrentBusiUser,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
            /* Reload current busi user */
            await currentStore.loadCurrentBusiUser({
              userId: currentStore.CurrentBusiUser.userId,
              busiId: currentStore.CurrentBusiUser.busiId
            })
            /* Reload work history */
            await currentStore.loadCurrentBusiUserWorkHistoryList()
            /* Load total work seconds */
            await currentStore.loadCurrentBusiUserTotalWorkSeconds()
          } catch (e) {
            console.error(e)
            showSnackbar({
              message: i18n.t('Commons.Messages.startWorkFailed'),
              color: 'negative'
            })
          }
        } else {
          console.error('Location is wrong')
          showSnackbar({
            message: i18n.t('Commons.Messages.error'),
            color: 'negative'
          })
        }
      }, (error) => {
        console.error(error)
        showSnackbar({
          message: i18n.t('Commons.Messages.error'),
          color: 'negative'
        })
      }, { enableHighAccuracy:true })
    } else {
      console.error('Geolocation is not supported')
      showSnackbar({
        message: i18n.t('Commons.Messages.error'),
        color: 'negative'
      })
    }
  }
}

/**
 * On Click get off the work button
 */
const onCLickGetOffBtn = async () => {
  try {
    await busiUserStore.getOffWork({
      ...currentStore.CurrentBusiUser,
    })
    /* Reload current busi user */
    await currentStore.loadCurrentBusiUser({
      userId: currentStore.CurrentBusiUser.userId,
      busiId: currentStore.CurrentBusiUser.busiId
    })
    /* Reload work history */
    await currentStore.loadCurrentBusiUserWorkHistoryList()
    /* Load total work seconds */
    await currentStore.loadCurrentBusiUserTotalWorkSeconds()
  } catch (e) {
    console.error(e)
    showSnackbar({
      message: i18n.t('Commons.Messages.offWorkFailed'),
      color: 'negative'
    })
  }
}

const onBeforeHideQRCodeDialog = () => {
  qrCodeTimerSeconds.value = 0
  clearQRCodeTimer()
}

/**
 * Used for simple work option, <br>
 * Get current position with async await
 */
const getCurrentPosition = (): Promise<{latitude?: number; longitude?: number}> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    }, () => resolve({
      latitude: undefined,
      longitude: undefined,
    }))
  })
}
</script>
