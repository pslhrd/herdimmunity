import { store } from '~/store'

const deviceList = ['desktop', 'mobile'];
export class Device {
  constructor() {
    this.checkDevice()
  }

  checkDevice() {
		let device = null;
		if (
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent,
			)
		) {
			device = deviceList[1]; // Mobile
		} else {
			device = deviceList[0]; // Desktop
		}

		store.device = device
  }
}