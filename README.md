# Toggle Confirm Vueform Plugin

Plugin for Vueform to add a confirm dialog to `ToggleElement` upon toggling.

## Prerequisites

- [Vueform 1.5.0+](https://github.com/vueform/vueform)

## Installation

1. Install the plugin

```bash
npm install vueform-plugin-toggle-confirm
```

2. Add the plugin in `vueform.config.js`

```js
// vueform.config.js

import ToggleConfirmPlugin from 'vueform-plugin-toggle-confirm'

export default {
  // ...
  plugins: [
    ToggleConfirmPlugin,
  ]
}

```

## Usage

```vue
<template>
  <Vueform>
    <ToggleElement
      name="toggle"
      confirm-text-on="<h1><strong>Warning!</strong></h1></br>You are about to enable this option!"
      confirm-text-off="Are you sure you want to disable this option?"
    />
  </Vueform>
</template>
```

## Options

| Name               | {Type} Default       | Description                                                                                                                    |
|--------------------|----------------------|--------------------------------------------------------------------------------------------------------------------------------|
| **confirmTextOn**  | `{string} undefined` | The text in the modal when toggle is being set to true                                                                         |
| **confirmTextOff** | `{string} undefined` | The text in the modal when toggle is being set to false                                                                        |
| **confirmText**    | `{string} undefined` | The text in the modal when toggle is being set to true or false (mutually exclusive with `confirmTextOn` and `confirmTextOff`) |
| **confirmLabel**   | `{string} Confirm`   | Text of the confirm button in the modal                                                                                        |
| **cancelLabel**    | `{string} Cancel`    | Text of the cancel button in the modal                                                                                         |