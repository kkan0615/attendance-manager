import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { UserUpdateForm, UserUploadImageForm } from '@/types/models/users'
import { UserDummy } from '@/dummies/users/user'

export interface UserState {
  userListFilter: any
  userList: any[]
  userListCount: number
  user: any
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      userListFilter: {},
      userList: [],
      userListCount: 0,
      user: {},
    }
  },
  getters: {
    /**
     * user List filter
     * @param state
     */
    UserListFilter (state) {
      return state.userListFilter
    },
    /**
     * List of user
     * @param state
     * @constructor
     */
    UserList (state) {
      return state.userList
    },
    /**
     * Count of user list
     * @param state
     * @constructor
     */
    UserListCount (state) {
      return state.userListCount
    },
    /**
     * user
     * @param state
     */
    User (state) {
      return state.user
    },
  },
  actions: {
    /**
     * set User list filter
     * @param payload - List Filter to set
     */
    setUserListFilter (payload: any) {
      this.userListFilter = payload
    },
    /**
     * Reset user list filter
     */
    resetUserListFilter () {
      this.userListFilter = {}
    },
    /**
     * Load list of user
     * @param payload - List Filter
     */
    loadUserList (payload: any) {
      this.userList = []
      this.userListCount = 0
    },
    /**
     * Reset user list
     */
    resetUserList () {
      this.userList = []
      this.userListCount = 0
    },
    /**
     * Load user
     * @param payload - id
     */
    loadUser (payload: any) {
      this.user = {}
    },
    /**
     * Reset user
     */
    resetUser () {
      this.user = {}
    },
    /**
     * Upload user image by id
     * @param payload - update form
     */
    async uploadUser (payload: UserUploadImageForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const newId = 1
          const foundDummy = UserDummy.find(dummy => dummy.id === payload.id)
          if (foundDummy) {
            foundDummy.img = URL.createObjectURL(payload.file)
          }

          return newId
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Create user
     * @param payload - create form
     */
    createUser (payload: any) {
      return 0
    },
    /**
     * Update user by id
     * @param payload - update form
     */
    async updateUser (payload: UserUpdateForm) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundIndexDummy = UserDummy.findIndex(dummy => dummy.id === payload.id)
          if (foundIndexDummy < 0) {
            throw new Error('No found data')
          }
          UserDummy[foundIndexDummy].name = payload.name
          UserDummy[foundIndexDummy].nickname = payload.nickname
          UserDummy[foundIndexDummy].description = payload.description
          UserDummy[foundIndexDummy].updatedAt = dayjs().toISOString()
          return 1
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
    /**
     * Delete user by id
     * @param payload - target id
     */
    deleteUser (payload: number) {
      try {
        if (import.meta.env.VITE_IS_USE_DUMMY) {
          const foundIndexDummy = UserDummy.findIndex(dummy => dummy.id === payload)
          if (foundIndexDummy < 0) {
            throw new Error('No found data')
          }
          UserDummy[foundIndexDummy].updatedAt = dayjs().toISOString()
          UserDummy[foundIndexDummy].deletedAt = dayjs().toISOString()
          return 1
        } else {
          return 1
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    }
  }
})
