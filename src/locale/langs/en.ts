export const enDictionary = {
  Commons: {
    Tooltips: {
      search: 'search',
      edit: 'edit',
      delete: 'delete',
      ok: 'ok',
      reject: 'reject',
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
      contentNavigator: 'on this page',
      getOffWork: 'get off the work of {name}'
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
      noData: 'no data',
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
        delete: 'Would you like to delete?',
        getOffWork: 'would you like to get off {name}'
      }
    },
    Placeholders: {
      noData: 'No data',
    },
    Labels: {
      action: 'action',
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
        Columns: {
          Labels: {
            user: 'user'
          }
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
      },
      BusiUserWorkHistory: {
        busiId: 'business',
        userId: 'user',
        busiUserId: 'business user',
        startedAt: 'started at',
        endedAt: 'ended at',
        workOption: 'work option',
        startLatitude: 'start latitude',
        startLongitude: 'start longitude',
        endLatitude: 'end latitude',
        endLongitude: 'end longitude',
        description: 'description',
        Columns: {
          Labels: {
            workOption: 'option',
            time: 'time',
            startCoordination: 'start (lat, long)',
            endCoordination: 'end (lat, long)',
          }
        }
      }
    }
  },
  Pages: {
    Home: {
      title: 'home',
    },
    Businesses: {
      title: 'business',
      Admins: {
        title: 'admin business',
      },
      Apps: {
        title: 'app business',
      },
      Mys: {
        title: 'my business',
        Homes: {
          title: 'my home',
          Titles: {
            weeklyWorkHistory: 'week work history',
          }
        },
        Histories: {
          title: 'history',
          Main: {
            title: 'main',
            Titles: {
              workHistory: 'work history'
            }
          }
        }
      },
    },
    Profiles: {
      title: 'profile',
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
