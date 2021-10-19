export class SmokingPermissionNotification {
  private _data = {
    data: {
      content: JSON.stringify({
        id: 100,
        channelKey: 'smoking_permissions',
        title: 'Smoking permission!',
        body: 'You can smoke now',
        showWhen: true,
        autoCancel: true,
        privacy: 'Private',
      }),
      actionButtons: JSON.stringify([
        {
          key: 'SMOKE',
          label: 'Smoke',
          autoCancel: true,
        },
        {
          key: 'SKIP',
          label: 'Skip',
          autoCancel: true,
        },
      ]),
    },
  }

  public getData() {
    return this._data
  }
}
