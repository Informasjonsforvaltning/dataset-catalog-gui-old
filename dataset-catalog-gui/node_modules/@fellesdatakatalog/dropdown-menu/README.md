# @fellesdatakatalog/dropdown-menu

Dropdown-menu component.

## Installation

```bash
npm i @fellesdatakatalog/dropdown-menu
```

## Dependencies

- react
- styled-components
- @fellesdatakatalog/theme

## Usage

### Basic usage

In order to use the dropdown-menu component, wrap the application in global theme provider from `@fellesdatakatalog/theme`. Then, use the dropdown-menu as any regular component.

```tsx
import React, { FC, useState } from 'react';
import ThemeProvider from '@fellesdatakatalog/theme';
import Link from '@fellesdatakatalog/link';
import DropdownMenu, { Menu, Trigger } from '@fellesdatakatalog/dropdown-menu';

const App: FC = () => {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const openDropdownMenu = () => setIsDropdownMenuOpen(true);
  const closeDropdownMenu = () => setIsDropdownMenuOpen(false);

  return (
    <ThemeProvider>
      <DropdownMenu
        isOpen={true}
      >
        <Trigger>
          <button onClick={openDropdownMenu}>
            Meny
          </button>
        </Trigger>
        <Menu>
          <Link href="https://data.norge">Søk i Felles datakatalog</Link>
        </Menu>
      </DropdownMenu>
    </ThemeProvider>
  );
}

export default App;
```
