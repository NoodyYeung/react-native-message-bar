// /**
//  * Name: Message Bar Manager
//  * Description: A manager to show/hide and handle a queue of alerts
//  * https://github.com/Talor-A/react-native-message-bar  */ 

export default class MessageBarManager {
  _currentMessageBarAlert = null;
  _messageAlerts = [];

  setCurrentMessageBarAlert(alert) {
    console.warn('This method is deprecated, please use registerMessageBar instead.')
    this.registerMessageBar(alert)
  }

  removeCurrentMessageBarAlert() {
    console.warn('This method is deprecated, please use registerMessageBar instead.')
    this.unregisterMessageBar()
  }

  registerMessageBar(messageBar) {
    this._currentMessageBarAlert = messageBar
  }

  unregisterMessageBar() {
    this._currentMessageBarAlert = null
  }

  showCurrentAlert(newState = null) {
    console.warn('This method is deprecated, please use showAlert instead.')
    this.showAlert(newState)
  }
  /**
   * The function will hide the alert if show, and resolve() when the alert is hide
   * @param {*} newState
   * @return Promise
   */
  showAlert(newState = null) {
    let self = this;
    return new Promise(function (resolve, reject) {
      // Hide the current alert
      self.hideAlert()

      // Get the current alert's duration to hide
      var durationToHide = self._currentMessageBarAlert.state.durationToHide

      setTimeout(() => {
        // Show the new alert if there is a new state, otherwise
        if (newState != null) {
          // Clear current state
          self
            ._currentMessageBarAlert
            .setNewState({})

          self
            ._currentMessageBarAlert
            .setNewState(newState)

          resolve();
          self._currentMessageBarAlert.notifyAlertHiddenCallback = null

          setTimeout(() => {
            self
              ._currentMessageBarAlert
              .showMessageBarAlert()
          }, 100)
        }
      }, durationToHide)
    });
    if (self._currentMessageBarAlert === null) {
      return;
    }

  }

  hideAlert() {
    if (this._currentMessageBarAlert != null && this._currentMessageBarAlert) {
      this
        ._currentMessageBarAlert
        .hideMessageBarAlert()
    }
  }
}
