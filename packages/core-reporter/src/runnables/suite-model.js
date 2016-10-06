import _ from 'lodash'
import { computed, observable } from 'mobx'
import Runnable from '../runnables/runnable-model'

export default class Suite extends Runnable {
  @observable children = []
  type = 'suite'

  @computed get state () {
    if (this._anyChildrenFailed) {
      return 'failed'
    } else if (this._allChildrenPending) {
      return 'pending'
    } else if (this._allChildrenPassedOrPending) {
      return 'passed'
    } else {
      return 'processing'
    }
  }

  @computed get _childStates () {
    return _.map(this.children, 'state')
  }

  @computed get _anyChildrenFailed () {
    return _.some(this._childStates, (state) => state === 'failed')
  }

  @computed get _allChildrenPassedOrPending () {
    return !this._childStates.length || _.every(this._childStates, (state) => {
      return state === 'passed' || state === 'pending'
    })
  }

  @computed get _allChildrenPending () {
    return !!this._childStates.length
            && _.every(this._childStates, (state) => state === 'pending')
  }
}
