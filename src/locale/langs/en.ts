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
      invite: 'invite',
      offWork: 'off work',
    },
    Titles: {
      cancel: 'cancel',
      delete: 'delete',
      total: 'total',
      attachment: 'attachment',
      comment: 'comment',
      information: 'information',
      overview: 'overview',
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
        lengthMin: '{length} is minimum',
        lengthMax: '{length} is maximum',
        integer: 'Type number more than 0',
        notMatched: '{field1} is not matched with {field2}',
        passwordRule1: 'Password must include special character',
        passwordRule2: 'Password must include at least one capital letter',
      },
      Questions: {
        delete: 'Would you like to delete?'
      }
    },
    Placeholders: {
      noData: 'No data',
    }
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
        name: 'name',
        smallLogo: 'small logo',
        logo: 'main logo',
        homepage: 'homepage',
        maxWorkHour: 'max work hour',
        description: 'description',
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
  },
  Pages: {
    Businesses: {
      Mys: {
        Homes: {
          Titles: {
            weeklyWorkHistory: 'week work history',
          }
        }
      }
    },
    Profiles: {
      Homes: {
        title: 'home'
      },
      Invites: {
        title: 'invite'
      },
      Analysis: {
        title: 'analysis'
      }
    }
  }
}
