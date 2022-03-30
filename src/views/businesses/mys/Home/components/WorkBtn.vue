<template>
  <div
    class="tw-w-full"
  >
    <!-- timer -->
    <div
      v-if="currentStore.CurrentBusiUser.startWorkAt"
      class="tw-text-center tw-mb-2"
    >
      <work-timer
        :start-time="currentStore.CurrentBusiUser.startWorkAt"
      />
    </div>
    <q-select
      v-if="!currentStore.CurrentBusiUser.startWorkAt"
      v-model="workOption"
      class="tw-mb-2"
      dense
      outlined
      rounded
      :options="options"
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
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { useCurrentStore } from '@/store/current'
import dayjs from 'dayjs'
import QRCodeStyling from 'qr-code-styling'
import { calculateTwoCoord } from '@/utils/commons/coordinate'
import WorkTimer from '@/components/WorkTimer.vue'

const DEFAULT_QRCODE_TIMER_MAX_SECONDS = 15

const currentStore = useCurrentStore()

const workOption = ref('Simple')
const options = ref(['Simple', 'Qrcode', 'Location'])
const timerSeconds = ref(0)
const timer = ref<NodeJS.Timer | undefined>(undefined)
const isQrCodeDialogOpen = ref(false)
const qrCodeTimerSeconds = ref(0)
const qrCodeTimer = ref<NodeJS.Timer | undefined>(undefined)

const hours = computed(() => parseInt((timerSeconds.value / (60 * 60)).toString()).toString().padStart(2, '0'))
const minutes = computed(() => parseInt(((timerSeconds.value / 60) % 60).toString()).toString().padStart(2, '0'))
const seconds = computed(() => parseInt((timerSeconds.value % 60).toString()).toString().padStart(2, '0'))

const initData = () => {
  if (currentStore.CurrentBusiUser && currentStore.CurrentBusiUser.id) {
    if (currentStore.CurrentBusiUser.startWorkAt) {
      timerSeconds.value = dayjs().diff(dayjs(currentStore.CurrentBusiUser.startWorkAt), 'seconds')
      initTimer()
    }
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
  if (workOption.value === 'Qrcode') {
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
        // @TODO add notify here
      }
    })
  } else if (workOption.value === 'Simple') {
    // Simple
    try {
      await currentStore.startWork({
        ...currentStore.CurrentBusiUser,
      })

      timerSeconds.value = 0
      initTimer()
    } catch (e) {
      console.error(e)
      // @TODO add notify here
    }
  } else if (workOption.value === 'Location') {
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
            await currentStore.startWork({
              ...currentStore.CurrentBusiUser,
            })

            timerSeconds.value = 0
            initTimer()
          } catch (e) {
            console.error(e)
            // @TODO add notify here
          }
        } else {
          console.error('Location is wrong')
          // @TODO add notify here
        }
      }, (error) => {
        console.error(error)
      }, { enableHighAccuracy:true })
    } else {
      console.error('Geolocation is not supported')
      // @TODO add notify here
    }
  }
}

/**
 * On Click get off the work button
 */
const onCLickGetOffBtn = async () => {
  try {
    await currentStore.getOffWork({
      ...currentStore.CurrentBusiUser,
    })

    timerSeconds.value = 0
    clearTimer()
  } catch (e) {
    console.error(e)
  }
}

const onBeforeHideQRCodeDialog = () => {
  qrCodeTimerSeconds.value = 0
  clearQRCodeTimer()
}

initData()

onBeforeUnmount(() => {
  clearTimer()
})
</script>
