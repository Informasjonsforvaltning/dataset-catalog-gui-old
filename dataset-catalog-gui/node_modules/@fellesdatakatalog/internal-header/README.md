# @fellesdatakatalog/internal-header

FDK header component intended for internal use.

## Installation

```bash
npm i @fellesdatakatalog/internal-header
```

## Dependencies

- react
- styled-components
- @fellesdatakatalog/link
- @fellesdatakatalog/theme
- @fellesdatakatalog/dropdown-menu
- @skatteetaten/frontend-components

## Usage

### Basic usage

In order to use the header component, wrap the application in global theme provider from `@fellesdatakatalog/theme`. Then, use the header as any regular component.

```tsx
import React, { FC } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import Footer from '@fellesdatakatalog/internal-header';

const App: FC = () => (
  <ThemeProvider>
    <Header username="Michelle" />
  </ThemeProvider>
)

export default App;
```

### Basic usage with logout event handler and homeUrl

Pass an event handler as a prop to the header component. Then wrap the application in global theme provider from `@fellesdatakatalog/theme` and use the header as any regular component.

```tsx
import React, { FC } from 'react';
import ThemeProvider, { ThemeProfile } from '@fellesdatakatalog/theme';
import Footer from '@fellesdatakatalog/internal-header';

const App: FC = () => (
  <ThemeProvider>
    <Header homeUrl="https://data.norge.no" username="Michelle" onLogout={() => {}} />
  </ThemeProvider>
)

export default App;
```

### Basic usage with navigation links, logout event handler and homeUrl

Pass an event handler as a prop to the header component. Then wrap the application in global theme provider from `@fellesdatakatalog/theme` and use the header as any regular component.

```tsx
import React, { FC } from 'react';
import ThemeProvider, { ThemeProfile } from '@fellesdatakatalog/theme';
import Footer from '@fellesdatakatalog/internal-header';

const App: FC = () => (
  <ThemeProvider>
    <Header homeUrl="https://data.norge.no" username="Michelle" onLogout={() => {}}>
      <Link href="https://data.norge.no/guidance">Registrere data</Link>
      <Link href="https://admin.staging.fellesdatakatalog.digdir.no">Høste data</Link>
      <Link href="https://data.norge.no" external={true}>Søk i Felles datakatalog</Link>
    </Header>
  </ThemeProvider>
)

export default App;
```

### Skatteetaten usage

In order to use the header component, wrap the application in global theme provider from `@fellesdatakatalog/theme`. Then, use the header as any regular component.

```tsx
import React, { FC } from 'react';
import ThemeProvider, { ThemeProfile } from '@fellesdatakatalog/theme';
import Footer from '@fellesdatakatalog/internal-header';

const App: FC = () => (
  <ThemeProvider>
    <Header themeProfile={ThemeProfile.SKE} username="Michelle" />
  </ThemeProvider>
)

export default App;
```

### Skatteetaten usage with system name

In order to use the header component, wrap the application in global theme provider from `@fellesdatakatalog/theme`. Then, use the header as any regular component.

```tsx
import React, { FC } from 'react';
import ThemeProvider, { ThemeProfile } from '@fellesdatakatalog/theme';
import Footer from '@fellesdatakatalog/internal-header';

const App: FC = () => (
  <ThemeProvider>
    <Header themeProfile={ThemeProfile.SKE} skeHomeText="Datakataloger" username="Michelle" />
  </ThemeProvider>
)

export default App;
```
