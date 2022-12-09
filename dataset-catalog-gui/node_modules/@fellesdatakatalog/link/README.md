# @fellesdatakatalog/link

Link component allows for easy customisation of anchor elements.

## Installation

```bash
npm i @fellesdatakatalog/link
```

## Dependencies

- react
- styled-components
- @fellesdatakatalog/theme

## Usage

### Basic usage

In order to use the link component, wrap the application in global theme provider from `@fellesdatakatalog/theme`. Then, use the link as any regular component. Link component is an extension of HTML anchor element. It supports all the props of its HTML counterpart.

```tsx
import React, { FC } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';

const App: FC = () => (
  <ThemeProvider>
    <Link href='https://world/go/places'>
      Take me places!
    </Link>
  </ThemeProvider>
);

export default App;
```

### External link

Links can point to external resources that will open in a new tab or window. Pass an `external` prop in order to indicate that a link points to an external resource.

```tsx
import React, { FC } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';

const App: FC = () => (
  <ThemeProvider>
    <Link href='https://world/go/places' external>
      Take me places!
    </Link>
  </ThemeProvider>
);

export default App;
```

### Link children and icons

It is possible to pass children to a link. The mest common type would be text. It might be necessary to add an icon for improved user experience. An icon can be passed using `icon` prop.

```tsx
import React, { FC } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';
import FavouriteIcon from '@material-ui/icons/Favorite'

const App: FC = () => (
  <ThemeProvider>
    <Link href='https://world/go/places' icon={<FavouriteIcon />}>
      Take me places!
    </Link>
  </ThemeProvider>
);

export default App;
```

### Colour inheritance

All parts of a link component will attempt to inherit the colour from its parent element.

### Polymorphism

The base element in a link component is polymorphic, meaning that it is possible to render any other HTML element as a base element in a link component. This is useful when rendering link elements from third-party routing libraries. Given this freedom, it is important not to break semantics.


```tsx
import React, { FC } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import ThemeProvider from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';

const App: FC = () => (
  <ThemeProvider>
    <Link href='https://world/go/places' as={RouteLink}>
      Take me places!
    </Link>
  </ThemeProvider>
);

export default App;
```
