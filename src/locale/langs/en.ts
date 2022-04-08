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
    Titles: {
      cancel: 'cancel',
      total: 'total',
    },
    Messages: {
      cancelSave: 'Would you like to cancel save?',
      saved: 'Success to saved',
      saveFailed: 'Fail to save',
      unAuthUser: 'unauthorized user',
      error: 'Face to error',
      startWorkFailed: 'Fail to start to work',
      offWorkFailed: 'Fail to get off the work',
      noImg: 'No Image',
      notMatched: 'It is not matched',
      Validations: {
        required: '{field} field is required',
        lengthMax: '{length} is maximum',
        integer: 'Type number more than 0',
      }
    },
  },
  Types: {
    Models: {
      Users: {
        name: 'name',
        nickname: 'nickname',
        email: 'email',
        description: 'description',
        createdAt: 'join date'
      },
      Businesses: {
        maxWorkHour: 'max work hour',
        Titles: {
          information: 'information',
          overview: 'Overview'
        },
        Labels: {
          isAllowNickname: 'Allow to use nickname'
        }
      },
      BusiUsers: {
        name: 'name',
        auth: 'role',
        email: 'email',
        nickname: 'nickname',
        description: 'description',
        createdAt: 'join date',
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
        },
      },
    }
  }
}
