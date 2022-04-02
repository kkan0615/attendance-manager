export const enDictionary = {
  Commons: {
    Tooltips: {
      edit: 'Edit'
    },
    Buttons: {
      save: 'save',
      cancel: 'cancel',
      edit: 'edit',
      delete: 'delete',
      offWork: 'off work'
    },
    Tittles: {
      cancel: 'cancel'
    },
    Messages: {
      cancelSave: 'Would you like to cancel save?',
      saved: 'Success to saved',
      saveFailed: 'Fail to save',
      unAuthUser: 'unauthorized user',
      error: 'Face to error',
      startWorkFailed: 'Fail to start to work',
      offWorkFailed: 'Fail to get off the work',
    },
  },
  Types: {
    Models: {
      Users: {},
      Businesses: {},
      BusiUsers: {
        name: 'name',
        auth: 'role',
        email: 'email',
        UserAuths: {
          user: 'user',
          staff: 'staff',
          admin: 'admin',
          system: 'system',
          superAdmin: 'super admin'
        },
        WorkOptions: {
          simple: 'simple',
          qrCode: 'qr code',
          location: 'location',
        }
      },
    }
  }
}
