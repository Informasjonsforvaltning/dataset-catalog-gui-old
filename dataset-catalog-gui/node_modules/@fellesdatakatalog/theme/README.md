# @fellesdatakatalog/theme

Common theme module that provides global styles and design tokens.

## Installation

```bash
npm i @fellesdatakatalog/theme
```

## Dependencies

- react
- styled-components

## Usage

### Basic usage

In order to add global styles and expose design tokens to the application, wrap the application in a theme provider component exposed by the library.

```tsx
import React, { FC } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';

const App: FC = () => (
  <ThemeProvider>
    <div>App</div>
  </ThemeProvider>
)

export default App;
```

### Custom target for global styles

By default, theme provider will add global styles to document head. However, this behaviour can be overridden by providing another HTML element as `target` prop to theme provider.

```tsx
import React, { FC } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';

const App: FC = () => (
  <ThemeProvider target={document.head}>
    <div>App</div>
  </ThemeProvider>
)

export default App;
```

### Disabling global styles

Global styles can be disabled by `useGlobalStyles` prop to theme provider.

```tsx
import React, { FC } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';

const App: FC = () => (
  <ThemeProvider useGlobalStyles={false}>
    <div>App</div>
  </ThemeProvider>
)

export default App;
```


### Design token selectors

Design tokens can be accessed through various selectors exposed by the library.

```ts
import styled from 'styled-components';
import { theme, Colour } from '@fellesdatakatalog/theme';

const Box = styled.div`
  font-family: ${theme.fontFamily()};
  font-size: ${theme.fontSize('FS16')};
  font-weight: ${theme.fontWeight('FW500')};
  color: ${theme.colour(Colour.NEUTRAL, 'N60')};
`;

export default { Box }
```

### Extending default theme

In a rare case when default theme needs to be extended, it is possible to provide a `theme` prop to theme provider. Provided theme will be merged with the default theme, therefore, make sure not to overwrite any existing values.

```tsx
import React, { FC } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';

const theme = {
  additionalColour: 'red'
};

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <div>App</div>
  </ThemeProvider>
)

export default App;
```