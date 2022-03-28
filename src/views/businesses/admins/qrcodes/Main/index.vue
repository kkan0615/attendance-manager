<!--
QRCode ref
  1. https://github.com/nimiq/qr-scanner
-->
<template>
  <q-page
    padding
  >
    <q-card
      flat
      bordered
      class="tw-mx-auto tw-max-w-xl"
    >
      <q-card-section>
        <div
          class="text-h6 text-center"
        >
          QR Code Scanner
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        style="height: 400px;"
      >
        <div
          v-show="hasCamera"
          class="tw-h-full tw-w-full"
        >
          <video
            v-show="!readLoading"
            id="scanner-video"
            class="tw-h-full tw-w-full"
            autoplay
          />
          <q-inner-loading :showing="readLoading">
            <q-spinner-gears
              size="50px"
              color="primary"
            />
          </q-inner-loading>
        </div>
        <div
          v-show="!hasCamera"
          class="tw-flex justify-center items-center tw-h-full text-h5"
        >
          Camera is not supported
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section
        v-if="hasCamera"
      >
        <div
          class="tw-text-center text-subtitle1"
        >
          Put the QR code in front of the camera
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script lang="ts">
export default {
  name: 'BusiAdminQRCodeMain',
}
</script>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import QrScanner from 'qr-scanner'
import { useCurrentStore } from '@/store/current'

const currentStore = useCurrentStore()

const qrScanner = ref<QrScanner | null>(null)
const readLoading = ref(false)
const hasCamera = ref(false)
const test = ref<any>('')

const initScanner = async () => {
  try {
    hasCamera.value = await QrScanner.hasCamera()
    const scannerVideoEl = document.getElementById('scanner-video') as HTMLVideoElement | null
    if (scannerVideoEl) {
      qrScanner.value = new QrScanner(scannerVideoEl, onSuccessScan, onErrorScan)
      qrScanner.value.start()
    }
  } catch (e) {
    console.error(e)
    // @TODO add notify here
    reRunScanner()
  }
}

const destroyScanner = () => {
  if (qrScanner.value) {
    qrScanner.value.stop()
    qrScanner.value.destroy()
    qrScanner.value = null
  }
}

const onSuccessScan = async (result: string) => {
  try {
    const json = JSON.parse(result)
    if (!json || !json.readerTime || !json.userId || !json.busiId) {
      // @TODO add notify here
    } else {
      // Try to read
      test.value = json
      readLoading.value = true
      if (qrScanner.value) {
        await qrScanner.value.pause()
        const res = await currentStore.startWorkByQRCode({
          ...currentStore.CurrentBusiUser,
          userId: json.userId,
          busiId: json.busiId,
          readerTime: json.readerTime
        })
        /* Success to start again */
        if (res) {
          reRunScanner()
        }
      }
    }
  } catch (e) {
    console.error(e)
    reRunScanner()
  }
}

const onErrorScan = (error: string | Error) => {
  // console.error(error)
  if (error !== 'No QR code found') {
    console.log('hi?')
    if (qrScanner.value) {
      // @TODO add notify here
      reRunScanner()

    }
  }
  // @TODO add notify here
}

const reRunScanner = () => {
  setTimeout(() => {
    if (qrScanner.value) {
      readLoading.value = false
      qrScanner.value.start()
      test.value = ''
    }
  }, 1500)
}

onMounted(() => {
  initScanner()
})

onBeforeUnmount(() => {
  destroyScanner()
})
</script>
