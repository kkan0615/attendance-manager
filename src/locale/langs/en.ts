export const enDictionary = {
  Commons: {
    Tooltips: {
      edit: 'Edit',
      delete: 'delete',
      ok: 'ok',
      reject: 'reject'
    },
    Buttons: {
      create: 'create',
      save: 'save',
      cancel: 'cancel',
      edit: 'edit',
      delete: 'delete',
      search: 'search',
      send: 'send',
      copyURL: 'copy URL',
      offWork: 'off work'
    },
    Titles: {
      cancel: 'cancel',
      delete: 'delete',
      total: 'total',
      attachment: 'attachment',
      comment: 'comment',
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
      },
      Questions: {
        delete: 'Would you like to delete?'
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
      BusiPost: {
        title: 'title',
        content: 'content',
        isNotification: 'notification post',
        updatedAt: 'updated at',
        Extends: {
          user: 'author'
        },
        Labels: {
          isNotification: 'Notification post',
          isDisplayHome: 'Display on Home',
          howLongDisplay: 'How long to display',
          isForever: 'forever',
        },
        Badges: {
          isNotification: 'notice',
        }
      }
    }
  }
}
