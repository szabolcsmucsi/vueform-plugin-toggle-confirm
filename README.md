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
      confirm-text="Do you really want to toggle?"
    />
  </Vueform>
</template>
```

## Options

| Name | {Type} Default | Description |
| --- | --- | --- |
| **confirmText** | `{string} undefined` | The text ... |